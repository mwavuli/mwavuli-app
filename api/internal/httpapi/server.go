// Package httpapi is the API's HTTP surface: the Echo router, its middleware and its routes.
package httpapi

import (
	"log/slog"
	"net/http"
	"sync/atomic"

	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
)

// Server is the API's router and its readiness state.
type Server struct {
	echo  *echo.Echo
	ready atomic.Bool
}

// New returns a server that logs requests to logger and reports version on /healthz. It starts not
// ready: whoever serves it calls SetReady(true) once it is listening.
func New(logger *slog.Logger, version string) *Server {
	s := &Server{echo: echo.NewWithConfig(echo.Config{Logger: logger})}

	s.echo.Use(
		middleware.RequestID(),
		middleware.RequestLoggerWithConfig(middleware.RequestLoggerConfig{
			// A balancer polls the probes every few seconds: leave them out of the log.
			Skipper:      func(c *echo.Context) bool { return c.Path() == "/healthz" || c.Path() == "/readyz" },
			LogMethod:    true,
			LogURIPath:   true,
			LogStatus:    true,
			LogLatency:   true,
			LogRequestID: true,
			HandleError:  true,
			LogValuesFunc: func(c *echo.Context, v middleware.RequestLoggerValues) error {
				logger.LogAttrs(c.Request().Context(), slog.LevelInfo, "request",
					slog.String("method", v.Method),
					slog.String("path", v.URIPath),
					slog.Int("status", v.Status),
					slog.Duration("latency", v.Latency),
					slog.String("request_id", v.RequestID),
				)
				return nil
			},
		}),
		middleware.Recover(),
	)

	// Liveness: the process is up and answering.
	s.echo.GET("/healthz", func(c *echo.Context) error {
		return c.JSON(http.StatusOK, map[string]string{"status": "ok", "version": version})
	})
	// Readiness: it is serving and has not begun to shut down. A balancer stops sending traffic when
	// this fails, which is why shutdown clears it before it stops accepting connections.
	s.echo.GET("/readyz", func(c *echo.Context) error {
		if !s.ready.Load() {
			return c.JSON(http.StatusServiceUnavailable, map[string]string{"status": "unavailable"})
		}
		return c.JSON(http.StatusOK, map[string]string{"status": "ready"})
	})

	return s
}

// Handler is the router, for http.Server.
func (s *Server) Handler() http.Handler { return s.echo }

// SetReady sets what /readyz reports.
func (s *Server) SetReady(ready bool) { s.ready.Store(ready) }
