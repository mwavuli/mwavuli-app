import type { Persona } from '@mwavuli/personas';
import { type ComponentType, type LazyExoticComponent, lazy } from 'react';

/**
 * One portal per persona, each behind a dynamic import: the bundler cuts a chunk per persona and the
 * browser fetches only the one that is chosen. Nothing in the shell may import a persona statically
 * (the lint rule `@nx/enforce-module-boundaries` rejects it, and `scripts/check-chunks.mjs` checks
 * the built chunks).
 */
export const portals: Record<Persona, LazyExoticComponent<ComponentType>> = {
  tenant: lazy(() => import('@mwavuli/web-tenant')),
  landlord: lazy(() => import('@mwavuli/web-landlord')),
  ops: lazy(() => import('@mwavuli/web-ops')),
};
