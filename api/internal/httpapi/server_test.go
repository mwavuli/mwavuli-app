package httpapi_test

import (
	"encoding/json"
	"io"
	"log/slog"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/nyange-app/mwavuli-site/api/internal/httpapi"
)

func get(t *testing.T, s *httpapi.Server, path string) (int, map[string]string) {
	t.Helper()
	rec := httptest.NewRecorder()
	s.Handler().ServeHTTP(rec, httptest.NewRequest(http.MethodGet, path, nil))
	var body map[string]string
	if err := json.Unmarshal(rec.Body.Bytes(), &body); err != nil {
		t.Fatalf("GET %s: body %q is not a JSON object: %v", path, rec.Body.String(), err)
	}
	return rec.Code, body
}

func newServer() *httpapi.Server {
	return httpapi.New(slog.New(slog.NewTextHandler(io.Discard, nil)), "test-version")
}

func TestHealthzAnswersWhileTheProcessRuns(t *testing.T) {
	code, body := get(t, newServer(), "/healthz")
	if code != http.StatusOK || body["status"] != "ok" || body["version"] != "test-version" {
		t.Fatalf("GET /healthz = %d %v, want 200 ok test-version", code, body)
	}
}

func TestReadyzFollowsReadiness(t *testing.T) {
	s := newServer()

	if code, _ := get(t, s, "/readyz"); code != http.StatusServiceUnavailable {
		t.Errorf("before SetReady(true): GET /readyz = %d, want 503", code)
	}
	s.SetReady(true)
	if code, body := get(t, s, "/readyz"); code != http.StatusOK || body["status"] != "ready" {
		t.Errorf("after SetReady(true): GET /readyz = %d %v, want 200 ready", code, body)
	}
	s.SetReady(false)
	if code, _ := get(t, s, "/readyz"); code != http.StatusServiceUnavailable {
		t.Errorf("after SetReady(false): GET /readyz = %d, want 503", code)
	}
}

func TestUnknownRouteIsAJSON404(t *testing.T) {
	code, body := get(t, newServer(), "/v1/nothing-here")
	if code != http.StatusNotFound || body["message"] == "" {
		t.Fatalf("GET /v1/nothing-here = %d %v, want 404 with a message", code, body)
	}
}
