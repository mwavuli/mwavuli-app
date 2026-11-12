package main

import (
	"context"
	"io"
	"log/slog"
	"net"
	"net/http"
	"strings"
	"sync/atomic"
	"testing"
	"time"

	"github.com/nyange-app/mwavuli-site/api/internal/httpapi"
)

func quiet() *slog.Logger { return slog.New(slog.NewTextHandler(io.Discard, nil)) }

// fakeApp is an API whose handler the test supplies.
type fakeApp struct {
	handler http.Handler
	ready   atomic.Bool
}

func (f *fakeApp) Handler() http.Handler { return f.handler }
func (f *fakeApp) SetReady(ready bool)   { f.ready.Store(ready) }

// start serves api on a free port until the returned cancel is called, and reports serve's result on done.
func start(t *testing.T, api app, delay time.Duration) (base string, cancel context.CancelFunc, done <-chan error) {
	t.Helper()
	ln, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatal(err)
	}
	ctx, cancel := context.WithCancel(context.Background())
	t.Cleanup(cancel)
	result := make(chan error, 1)
	go func() { result <- serve(ctx, ln, api, quiet(), delay) }()
	return "http://" + ln.Addr().String(), cancel, result
}

// status fetches base+path on a connection of its own, closed after the response. A pooled client can dial
// a spare connection that never carries a request, and Shutdown treats such a fresh connection as busy for
// five seconds.
func status(base, path string) (int, error) {
	c := &http.Client{Timeout: 10 * time.Second, Transport: &http.Transport{DisableKeepAlives: true}}
	resp, err := c.Get(base + path)
	if err != nil {
		return 0, err
	}
	defer resp.Body.Close()
	return resp.StatusCode, nil
}

func waitReady(t *testing.T, base string) {
	t.Helper()
	deadline := time.Now().Add(5 * time.Second)
	for {
		if code, err := status(base, "/readyz"); err == nil && code == http.StatusOK {
			return
		}
		if time.Now().After(deadline) {
			t.Fatal("the server never became ready")
		}
		time.Sleep(10 * time.Millisecond)
	}
}

func finishes(t *testing.T, done <-chan error) {
	t.Helper()
	select {
	case err := <-done:
		if err != nil {
			t.Fatalf("serve returned %v, want nil", err)
		}
	case <-time.After(5 * time.Second):
		t.Fatal("serve did not return")
	}
}

func TestServeAnswersUntilCancelledThenStopsCleanly(t *testing.T) {
	base, cancel, done := start(t, httpapi.New(quiet(), "test"), 0)
	waitReady(t, base)
	if code, err := status(base, "/healthz"); err != nil || code != http.StatusOK {
		t.Errorf("GET /healthz = %d, %v, want 200", code, err)
	}

	cancel()
	finishes(t, done)
	if _, err := status(base, "/healthz"); err == nil {
		t.Error("the server still accepts connections after it stopped")
	}
}

func TestServeReportsNotReadyWhileItKeepsAnswering(t *testing.T) {
	base, cancel, done := start(t, httpapi.New(quiet(), "test"), time.Second)
	waitReady(t, base)

	cancel()
	// The delay is when a balancer notices: the listener is still open, /readyz says not ready, and the
	// server still serves.
	deadline := time.Now().Add(800 * time.Millisecond)
	for {
		code, err := status(base, "/readyz")
		if err == nil && code == http.StatusServiceUnavailable {
			break
		}
		if time.Now().After(deadline) {
			t.Fatalf("GET /readyz after cancel = %d, %v, want 503 while the delay runs", code, err)
		}
		time.Sleep(5 * time.Millisecond)
	}
	if code, err := status(base, "/healthz"); err != nil || code != http.StatusOK {
		t.Errorf("GET /healthz during the delay = %d, %v, want 200", code, err)
	}
	finishes(t, done)
}

func TestServeDrainsRequestsInFlight(t *testing.T) {
	entered := make(chan struct{})
	release := make(chan struct{})
	var once atomic.Bool
	api := &fakeApp{handler: http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
		if once.CompareAndSwap(false, true) {
			close(entered)
		}
		<-release
		w.WriteHeader(http.StatusOK)
	})}
	base, cancel, done := start(t, api, 0)

	got := make(chan int, 1)
	go func() {
		code, err := status(base, "/slow")
		if err != nil {
			code = -1
		}
		got <- code
	}()
	<-entered

	cancel()
	select {
	case err := <-done:
		t.Fatalf("serve returned %v while a request was still running", err)
	case <-time.After(300 * time.Millisecond):
	}

	close(release)
	if code := <-got; code != http.StatusOK {
		t.Errorf("the request in flight finished with %d, want 200", code)
	}
	finishes(t, done)
	if api.ready.Load() {
		t.Error("the API still reported ready after it stopped")
	}
}

func TestRunRejectsASettingItCannotUse(t *testing.T) {
	for name, value := range map[string]string{
		"MWAVULI_HTTP_ADDR":      "not-an-address",
		"MWAVULI_SHUTDOWN_DELAY": "soon",
	} {
		getenv := func(key string) string {
			if key == name {
				return value
			}
			return ""
		}
		if err := run(context.Background(), getenv, io.Discard); err == nil || !strings.Contains(err.Error(), name) {
			t.Errorf("run with %s=%q = %v, want an error naming %s", name, value, err, name)
		}
	}
}

func TestRunNamesTheVariableWhenItCannotListen(t *testing.T) {
	getenv := func(key string) string {
		if key == "MWAVULI_HTTP_ADDR" {
			return "127.0.0.1:99999"
		}
		return ""
	}
	if err := run(context.Background(), getenv, io.Discard); err == nil || !strings.Contains(err.Error(), "MWAVULI_HTTP_ADDR") {
		t.Fatalf("run = %v, want an error naming MWAVULI_HTTP_ADDR", err)
	}
}
