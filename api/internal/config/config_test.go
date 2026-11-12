package config_test

import (
	"strings"
	"testing"

	"github.com/nyange-app/mwavuli-site/api/internal/config"
)

func env(vars map[string]string) func(string) string {
	return func(name string) string { return vars[name] }
}

func TestLoadDefaults(t *testing.T) {
	cfg, err := config.Load(env(nil))
	if err != nil {
		t.Fatal(err)
	}
	if cfg.HTTPAddr != ":8080" {
		t.Errorf("HTTPAddr = %q, want :8080", cfg.HTTPAddr)
	}
}

func TestLoadReadsTheEnvironment(t *testing.T) {
	cfg, err := config.Load(env(map[string]string{"MWAVULI_HTTP_ADDR": "127.0.0.1:9090"}))
	if err != nil {
		t.Fatal(err)
	}
	if cfg.HTTPAddr != "127.0.0.1:9090" {
		t.Errorf("HTTPAddr = %q, want 127.0.0.1:9090", cfg.HTTPAddr)
	}
}

func TestLoadNamesTheVariableItRejects(t *testing.T) {
	_, err := config.Load(env(map[string]string{"MWAVULI_HTTP_ADDR": "not-an-address"}))
	if err == nil || !strings.Contains(err.Error(), "MWAVULI_HTTP_ADDR") {
		t.Fatalf("err = %v, want one naming MWAVULI_HTTP_ADDR", err)
	}
}
