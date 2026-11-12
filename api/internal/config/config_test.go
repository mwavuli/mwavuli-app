package config_test

import (
	"strings"
	"testing"
	"time"

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
	if cfg.HTTPAddr != ":8080" || cfg.ShutdownDelay != 0 {
		t.Errorf("Load = %+v, want :8080 and no shutdown delay", cfg)
	}
}

func TestLoadReadsTheEnvironment(t *testing.T) {
	cfg, err := config.Load(env(map[string]string{
		"MWAVULI_HTTP_ADDR":      "127.0.0.1:9090",
		"MWAVULI_SHUTDOWN_DELAY": "10s",
	}))
	if err != nil {
		t.Fatal(err)
	}
	if cfg.HTTPAddr != "127.0.0.1:9090" || cfg.ShutdownDelay != 10*time.Second {
		t.Errorf("Load = %+v, want 127.0.0.1:9090 and 10s", cfg)
	}
}

func TestLoadNamesTheVariableItRejects(t *testing.T) {
	for name, vars := range map[string]map[string]string{
		"MWAVULI_HTTP_ADDR":      {"MWAVULI_HTTP_ADDR": "not-an-address"},
		"MWAVULI_SHUTDOWN_DELAY": {"MWAVULI_SHUTDOWN_DELAY": "soon"},
	} {
		if _, err := config.Load(env(vars)); err == nil || !strings.Contains(err.Error(), name) {
			t.Errorf("Load(%v) = %v, want an error naming %s", vars, err, name)
		}
	}
	if _, err := config.Load(env(map[string]string{"MWAVULI_SHUTDOWN_DELAY": "-1s"})); err == nil {
		t.Error("a negative shutdown delay was accepted")
	}
}
