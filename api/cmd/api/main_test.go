package main

import (
	"context"
	"io"
	"log/slog"
	"net"
	"net/http"
	"strings"
	"testing"
	"time"

	"github.com/nyange-app/mwavuli-site/api/internal/httpapi"
)

func TestServeAnswersUntilCancelledThenStopsCleanly(t *testing.T) {
	logger := slog.New(slog.NewTextHandler(io.Discard, nil))
	ln, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatal(err)
	}
	base := "http://" + ln.Addr().String()

	// One connection per request, closed after it. A pooled client can dial a spare connection that
	// never carries a request, and Shutdown treats such a fresh connection as busy for five seconds.
	client := &http.Client{Timeout: 2 * time.Second, Transport: &http.Transport{DisableKeepAlives: true}}

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	done := make(chan error, 1)
	go func() { done <- serve(ctx, ln, httpapi.New(logger, "test"), logger) }()

	status := func(path string) (int, error) {
		resp, err := client.Get(base + path)
		if err != nil {
			return 0, err
		}
		defer resp.Body.Close()
		return resp.StatusCode, nil
	}

	deadline := time.Now().Add(5 * time.Second)
	for {
		if code, err := status("/readyz"); err == nil && code == http.StatusOK {
			break
		}
		if time.Now().After(deadline) {
			t.Fatal("the server never became ready")
		}
		time.Sleep(10 * time.Millisecond)
	}
	if code, err := status("/healthz"); err != nil || code != http.StatusOK {
		t.Errorf("GET /healthz = %d, %v, want 200", code, err)
	}

	cancel()
	select {
	case err := <-done:
		if err != nil {
			t.Fatalf("serve returned %v after cancel, want nil", err)
		}
	case <-time.After(5 * time.Second):
		t.Fatal("serve did not return after cancel")
	}
	if _, err := status("/healthz"); err == nil {
		t.Error("the server still accepts connections after it stopped")
	}
}

func TestRunRejectsAnAddressItCannotUse(t *testing.T) {
	getenv := func(name string) string {
		if name == "MWAVULI_HTTP_ADDR" {
			return "not-an-address"
		}
		return ""
	}
	err := run(context.Background(), getenv, io.Discard)
	if err == nil || !strings.Contains(err.Error(), "MWAVULI_HTTP_ADDR") {
		t.Fatalf("run = %v, want an error naming MWAVULI_HTTP_ADDR", err)
	}
}
