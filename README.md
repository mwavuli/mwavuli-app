# mwavuli

**Mwavuli Property Management** in one Nx and pnpm workspace: the Go API, the marketing site, the web and mobile
apps, and the infrastructure. The repository also holds the brand and design language ([`brand/`](brand/README.md))
and the business documents (`business/`).

## Layout

| Path                            | What                                                                                  | Stack                                       | Nx project                                    |
| ------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------- | --------------------------------------------- |
| [`api/`](api)                   | The HTTP API                                                                          | Go 1.27, Echo v5                            | `api`                                         |
| [`site/`](site)                 | The marketing site, a static build                                                    | Astro 5, Tailwind 4                         | `site`                                        |
| [`web/shell/`](web)             | The web app's shell: picks a persona and loads that portal                            | Vite 8, React 19, React Router, Tailwind 4  | `web-shell`                                   |
| `web/{tenant,landlord,ops}/`    | The three web portals, one package each                                               | React                                       | `web-tenant`, `web-landlord`, `web-ops`       |
| [`mobile/shell/`](mobile)       | The mobile app's shell: picks a persona and mounts that portal                        | Expo SDK 58, React Native 0.88, NativeWind  | `mobile-shell`                                |
| `mobile/{tenant,landlord,ops}/` | The three mobile portals, one package each                                            | React Native                                | `mobile-tenant`, `mobile-landlord`, `mobile-ops` |
| [`infra/`](infra)               | The AWS infrastructure, applied by a person                                           | OpenTofu through Terragrunt                 | `infra`                                       |
| `packages/personas/`            | The three personas (tenant, landlord, operations), named once for web and mobile      | TypeScript                                  | `personas`                                    |
| `packages/theme/`               | The brand tokens as a Tailwind theme: CSS for Tailwind 4, a preset for Tailwind 3     | CSS, CommonJS                               | `theme`                                       |
| [`brand/`](brand/README.md)     | The brand and design language: spec, tokens, logos, icons                             |                                             | `brand`                                       |
| `business/`, `docs/`            | The business model and agreements; design records                                     |                                             |                                               |

## Getting started

You need Node 22 (`.nvmrc`), pnpm through Corepack, Python 3 (the brand document check), and for the parts you touch:
Go 1.27 (api), OpenTofu 1.13, Terragrunt 1.1 and shellcheck (infra, the site's scripts), Ruby with Bundler and Xcode or
the Android SDK (mobile releases).

```bash
corepack enable
pnpm install

pnpm nx dev site             # Astro, :4321
pnpm nx dev web-shell        # Vite, :5173
pnpm nx start mobile-shell   # Expo; press i for the iOS simulator
pnpm nx serve api            # Go, :8080
```

Everything goes through Nx, which runs a project's targets in dependency order and caches the results:

```bash
pnpm nx run-many -t lint typecheck test build check   # everything, as CI does
pnpm nx affected -t lint typecheck test build         # only what your change touches
pnpm nx graph                                         # the project graph
pnpm format                                           # Prettier (web, mobile, packages, root configs)
```

Targets come from each package's `scripts` (and `project.json` for the Go API and the infrastructure). The ones that
are cacheable, and what they depend on, are named once in [`nx.json`](nx.json).

## How it fits together

**One brand, three outputs.** The tokens in `brand/tokens/mwavuli.tokens.json` are the source. `packages/theme/theme.css`
is the Tailwind 4 theme the site and the web app import; `packages/theme/native.cjs` is the Tailwind 3 preset the mobile
app uses with NativeWind. Both read the same tokens, and `theme.test.mjs` fails when they disagree on a colour, a type
step, a radius or a shadow. Colours, fonts, radii and shadows are reset first, so an off-brand utility such as
`bg-blue-500` generates nothing.

**Personas are disjoint, and one is loaded at a time.** A persona's portal is a package that may use the shared
packages and nothing else, so the tenant portal cannot reach into the landlord's. A shell reaches a portal only through
a dynamic `import()` in its `registry.ts`, so only the chosen portal is fetched on the web and evaluated on mobile.
Three layers hold this: the lint rules in [`eslint.config.mjs`](eslint.config.mjs) (by Nx tag, and for how a shell may
name a portal), the shells' tests (which record what was loaded), and, for the web build, a plugin that fails the build
if a portal's code lands in what loads up front or two portals' code load together
([`isolate-portals.ts`](web/shell/plugins/isolate-portals.ts)).

**Dependency versions are named once.** Shared versions live in the pnpm catalogs in
[`pnpm-workspace.yaml`](pnpm-workspace.yaml) and are referenced as `catalog:`. The site keeps its own ranges: its build is
pinned to Astro's Vite 6. pnpm 12 stops on install scripts nobody approved (`allowBuilds`) and, in strict mode, on a
version younger than 24 hours (`minimumReleaseAge`): pick an older version rather than exempting it.

## CI and deploy

[`ci.yml`](.github/workflows/ci.yml) runs `nx affected` on pull requests and on pushes to `main`. It starts with Nx's
local cache. A remote cache needs the workspace connected to [Nx Cloud](https://nx.dev/nx-cloud) (`pnpm nx connect`,
then a read-write token for runs on `main` and a read-only one for pull requests, as secrets; see the header of
`ci.yml`). `@nx/s3-cache` is not used: it is deprecated, carries an
unpatchable cache-poisoning flaw (CVE-2025-36852) and does not support the current Nx.

[`deploy.yml`](.github/workflows/deploy.yml) publishes the site over OIDC when the site, the brand or the theme changes
(see [`site/README.md`](site/README.md#deploy)). Mobile apps are released locally through Fastlane, never from CI, which
type-checks, tests and bundles the mobile code ([`mobile/README.md`](mobile/README.md)). Infrastructure is applied by a person; CI only validates it
([`infra/README.md`](infra/README.md)).
