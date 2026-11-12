import type { Persona } from '@mwavuli/personas';
import { type ComponentType, type LazyExoticComponent, lazy } from 'react';

/**
 * One portal per persona, each behind a dynamic import, so a portal's module is evaluated only when
 * that persona is chosen. Nothing in the shell may import a persona statically (the lint rule in
 * eslint.config.mjs rejects it).
 */
export const portals: Record<Persona, LazyExoticComponent<ComponentType>> = {
  tenant: lazy(() => import('@mwavuli/mobile-tenant')),
  landlord: lazy(() => import('@mwavuli/mobile-landlord')),
  ops: lazy(() => import('@mwavuli/mobile-ops')),
};
