// Package config reads the API's settings from the environment.
package config

import (
	"fmt"
	"net"
)

const (
	envHTTPAddr     = "MWAVULI_HTTP_ADDR"
	defaultHTTPAddr = ":8080"
)

// Config is everything the API is told when it starts.
type Config struct {
	// HTTPAddr is the host:port the server listens on.
	HTTPAddr string
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
	return Config{HTTPAddr: addr}, nil
}
