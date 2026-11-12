// Package config reads the API's settings from the environment.
package config

import (
	"fmt"
	"net"
	"time"
)

const (
	envHTTPAddr      = "MWAVULI_HTTP_ADDR"
	envShutdownDelay = "MWAVULI_SHUTDOWN_DELAY"
	defaultHTTPAddr  = ":8080"
)

// Config is everything the API is told when it starts.
type Config struct {
	// HTTPAddr is the host:port the server listens on.
	HTTPAddr string
	// ShutdownDelay is how long the server keeps answering, and reports not ready on /readyz, after it is
	// told to stop and before it stops listening. Behind a load balancer set it to at least the balancer's
	// health-check interval, so the balancer notices before connections close. Zero stops at once.
	ShutdownDelay time.Duration
}

// Load reads the configuration from getenv (os.Getenv in production). An unset value takes its
// default; a value that cannot be used is an error that names the variable.
func Load(getenv func(string) string) (Config, error) {
	addr := getenv(envHTTPAddr)
	if addr == "" {
		addr = defaultHTTPAddr
	}
	if _, _, err := net.SplitHostPort(addr); err != nil {
		return Config{}, fmt.Errorf("%s: %w", envHTTPAddr, err)
	}

	var delay time.Duration
	if v := getenv(envShutdownDelay); v != "" {
		d, err := time.ParseDuration(v)
		if err != nil {
			return Config{}, fmt.Errorf("%s: %w", envShutdownDelay, err)
		}
		if d < 0 {
			return Config{}, fmt.Errorf("%s: must not be negative, got %s", envShutdownDelay, v)
		}
		delay = d
	}

	return Config{HTTPAddr: addr, ShutdownDelay: delay}, nil
}
