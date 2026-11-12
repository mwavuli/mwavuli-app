import type { Persona } from '@mwavuli/personas';
import { type ComponentType, type LazyExoticComponent, lazy } from 'react';

/**
 * One portal per persona, each behind a dynamic import: the bundler cuts a chunk per persona and the
 * browser fetches only the one that is chosen. Nothing in the shell may import a persona statically, or
 * name one in an import() anywhere but here (eslint.config.mjs rejects both), and the build fails if a
 * portal's code ends up in what loads up front (plugins/isolate-portals.ts).
 */
export const portals: Record<Persona, LazyExoticComponent<ComponentType>> = {
  tenant: lazy(() => import('@mwavuli/web-tenant')),
  landlord: lazy(() => import('@mwavuli/web-landlord')),
  ops: lazy(() => import('@mwavuli/web-ops')),
};
