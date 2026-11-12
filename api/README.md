# api

The Mwavuli HTTP API: Go 1.27 and [Echo](https://echo.labstack.com) v5. The Nx project is `api`; it needs no Nx plugin,
because `project.json` runs the Go toolchain directly.

It serves `GET /healthz` (liveness, with the build's version) and `GET /readyz` (readiness), and nothing else yet.
Configuration is from the environment:

| Variable            | Default | Meaning                           |
| ------------------- | ------- | --------------------------------- |
| `MWAVULI_HTTP_ADDR` | `:8080` | The host:port the server listens on |

## Commands

From the repository root:

```bash
pnpm nx serve api                       # go run ./cmd/api
pnpm nx run-many -t lint test build --projects=api
API_VERSION=1.2.3 pnpm nx build api     # api/dist/api, stamped with main.version
```

Lint is `gofmt`, `go vet` and `go mod tidy -diff`. Tests run with the race detector. Nx keys these targets on the Go
version as well as the files, so a toolchain upgrade is a cache miss.

## Layout

```
cmd/api/             the entry point: configuration, signals, graceful shutdown
internal/config/     settings from the environment
internal/httpapi/    the Echo router, its middleware and the probes
```

On SIGINT or SIGTERM the server reports not ready on `/readyz` first, then drains in-flight requests (15 s at most), so a
load balancer stops sending traffic before connections close.

The module path is `github.com/nyange-app/mwavuli-site/api`. If the repository is renamed, change it with
`go mod edit -module` and the imports.
