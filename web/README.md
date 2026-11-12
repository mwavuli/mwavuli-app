# web

The Mwavuli web app: a shell and three portals. Each is its own package and Nx project.

| Package                    | Project         | Role                                                               |
| -------------------------- | --------------- | ------------------------------------------------------------------ |
| `shell/` (`@mwavuli/web-shell`)       | `web-shell`    | Vite and React Router. The page frame, the picker, and the loader. |
| `tenant/` (`@mwavuli/web-tenant`)     | `web-tenant`   | The tenant portal.                                                 |
| `landlord/` (`@mwavuli/web-landlord`) | `web-landlord` | The landlord portal.                                               |
| `ops/` (`@mwavuli/web-ops`)           | `web-ops`      | The operations portal.                                             |

## One portal at a time

The address names the persona (`/tenant`, `/landlord`, `/ops`). The shell mounts that portal and nothing else; going
to another persona unmounts the first. A portal is a separate chunk behind a dynamic `import()` in
[`shell/src/registry.ts`](shell/src/registry.ts), so the browser fetches only the one it needs.

Portals are disjoint: a portal may use the shared packages (such as `@mwavuli/personas`) and nothing else, and the shell
may not import one statically. Its Tailwind classes come from the shell's stylesheet, which loads `@mwavuli/theme`. The lint rules enforce both, the shell's tests record which
portal modules were fetched, and `pnpm nx build web-shell` runs [`shell/plugins/isolate-portals.ts`](shell/plugins/isolate-portals.ts),
which reads which modules went into which chunk and fails the build if a portal's code is in what loads up front or
two portals' code load together, whichever way it got there (a static import, a re-export, a relative path, an
`import.meta.glob`).

Tailwind detects classes only under the app it builds, so the shell's [`styles.css`](shell/src/styles.css) names each
portal with an `@source` line. A new portal needs one.

## Commands

```bash
pnpm nx dev web-shell
pnpm nx run-many -t lint typecheck test build --projects=web-shell,web-tenant,web-landlord,web-ops
```

## Adding a persona

Add it to `PERSONAS` and `PERSONA_LABELS` in [`packages/personas`](../packages/personas/src/index.ts), then a portal
package here and one in `mobile/`, each tagged `persona:<name>`, a loader in each shell's `registry.ts`, and an `@source`
line (web) or a `content` glob (mobile). In `eslint.config.mjs`, add a `persona:<name>` constraint and the name to the
shells' static-import rule, and the pattern in `shell/plugins/isolate-portals.ts`: each lists the three personas.
