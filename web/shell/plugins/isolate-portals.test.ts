import { describe, expect, it } from 'vitest';
import { type ChunkInfo, findPortalLeaks } from './isolate-portals';

const chunk = (fileName: string, over: Partial<ChunkInfo> = {}): ChunkInfo => ({
  fileName,
  isEntry: false,
  imports: [],
  moduleIds: [],
  ...over,
});

const module = (persona: string) => `/repo/web/${persona}/src/Portal.tsx`;

describe('findPortalLeaks', () => {
  it('accepts an entry that loads each portal from a chunk of its own', () => {
    expect(
      findPortalLeaks([
        chunk('index.js', { isEntry: true, imports: ['react.js'], moduleIds: ['/repo/web/shell/src/App.tsx'] }),
        chunk('react.js', { moduleIds: ['/repo/node_modules/react/index.js'] }),
        chunk('tenant.js', { imports: ['react.js'], moduleIds: [module('tenant')] }),
        chunk('landlord.js', { imports: ['react.js'], moduleIds: [module('landlord')] }),
      ]),
    ).toEqual([]);
  });

  it('rejects a portal bundled into the entry (a static import, an eager glob, a relative path)', () => {
    const problems = findPortalLeaks([
      chunk('index.js', { isEntry: true, moduleIds: ['/repo/web/shell/src/App.tsx', module('tenant')] }),
    ]);
    expect(problems).toEqual(['the tenant portal loads up front, with index.js']);
  });

  it('rejects a portal in a chunk the entry imports statically', () => {
    const problems = findPortalLeaks([
      chunk('index.js', { isEntry: true, imports: ['shared.js'] }),
      chunk('shared.js', { moduleIds: [module('ops')] }),
    ]);
    expect(problems).toEqual(['the ops portal loads up front, with index.js']);
  });

  it('rejects two portals that load together, however they got into one load', () => {
    const merged = findPortalLeaks([
      chunk('index.js', { isEntry: true }),
      chunk('tenant.js', { imports: ['common.js'], moduleIds: [module('tenant')] }),
      chunk('common.js', { moduleIds: [module('landlord')] }),
    ]);
    expect(merged).toEqual(['the landlord and tenant portals load together, with tenant.js']);
  });
});
