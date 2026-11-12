// Command api serves the Mwavuli HTTP API.
//
// It listens on MWAVULI_HTTP_ADDR (default :8080) until SIGINT or SIGTERM, then stops reporting ready
// on /readyz and drains in-flight requests before it exits. /healthz answers while the process runs.
package main

import (
	"context"
	"errors"
	"fmt"
	"io"
	"log/slog"
	"net"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/nyange-app/mwavuli-site/api/internal/config"
	"github.com/nyange-app/mwavuli-site/api/internal/httpapi"
)

// version is the build's version, stamped with -ldflags "-X main.version=...".
var version = "dev"

const shutdownTimeout = 15 * time.Second

func main() {
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	if err := run(ctx, os.Getenv, os.Stdout); err != nil {
		fmt.Fprintln(os.Stderr, "api:", err)
		os.Exit(1)
	}
}

func run(ctx context.Context, getenv func(string) string, stdout io.Writer) error {
	cfg, err := config.Load(getenv)
	if err != nil {
		return err
	}
	logger := slog.New(slog.NewJSONHandler(stdout, nil))

	ln, err := net.Listen("tcp", cfg.HTTPAddr)
	if err != nil {
		return err
	}
	return serve(ctx, ln, httpapi.New(logger, version), logger)
}

// serve answers on ln until ctx ends, then shuts down gracefully. It returns nil after a clean stop.
func serve(ctx context.Context, ln net.Listener, api *httpapi.Server, logger *slog.Logger) error {
	srv := &http.Server{
		Handler:           api.Handler(),
		ReadHeaderTimeout: 5 * time.Second,
		IdleTimeout:       2 * time.Minute,
	}

	failed := make(chan error, 1)
	go func() { failed <- srv.Serve(ln) }()

	api.SetReady(true)
	logger.Info("listening", "addr", ln.Addr().String(), "version", version)

	select {
	case err := <-failed:
		return err
	case <-ctx.Done():
	}

	// Not ready first, so a balancer stops sending traffic while in-flight requests finish.
	api.SetReady(false)
	logger.Info("shutting down")
	drain, cancel := context.WithTimeout(context.Background(), shutdownTimeout)
	defer cancel()
	if err := srv.Shutdown(drain); err != nil {
		return fmt.Errorf("shutdown: %w", err)
	}
	if err := <-failed; !errors.Is(err, http.ErrServerClosed) {
		return err
	}
	return nil
}
