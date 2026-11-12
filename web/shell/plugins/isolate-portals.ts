import type { Plugin } from 'vite';

/** The part of a Rollup/Rolldown output chunk this check reads. */
export interface ChunkInfo {
  fileName: string;
  isEntry: boolean;
  /** Chunks it imports statically, so they load with it. */
  imports: string[];
  /** The ids of the modules bundled into it. */
  moduleIds: string[];
}

/** The persona a module belongs to, from its path: web/tenant/src/Portal.tsx is "tenant". */
const personaOf = (id: string) => /\/web\/(tenant|landlord|ops)\//.exec(id)?.[1];

/**
 * What is wrong with how the portals landed in the bundle, as messages (none when it is right): a portal
 * in the code that loads up front, or the code of two portals loading together. It reads which modules are
 * in which chunk, so it holds however a portal got there: a static import, a re-export, a relative path,
 * an `import.meta.glob`, or a bundler that merged chunks.
 */
export function findPortalLeaks(chunks: ChunkInfo[]): string[] {
  const byFile = new Map(chunks.map((chunk) => [chunk.fileName, chunk]));

  /** The personas whose modules load with `start`: in it, or in anything it imports statically. */
  const personasLoadedWith = (start: ChunkInfo) => {
    const found = new Set<string>();
    const seen = new Set<string>();
    const pending = [start];
    for (let chunk = pending.pop(); chunk; chunk = pending.pop()) {
      if (seen.has(chunk.fileName)) continue;
      seen.add(chunk.fileName);
      for (const id of chunk.moduleIds) {
        const persona = personaOf(id);
        if (persona) found.add(persona);
      }
      for (const imported of chunk.imports) {
        const next = byFile.get(imported);
        if (next) pending.push(next);
      }
    }
    return found;
  };

  const problems: string[] = [];
  for (const chunk of chunks) {
    const personas = [...personasLoadedWith(chunk)].sort();
    if (chunk.isEntry && personas.length > 0) {
      problems.push(
        `the ${personas.join(', ')} portal${personas.length > 1 ? 's load' : ' loads'} up front, with ${chunk.fileName}`,
      );
    } else if (personas.length > 1) {
      problems.push(`the ${personas.join(' and ')} portals load together, with ${chunk.fileName}`);
    }
  }
  return problems;
}

/** Fails the build when a portal is anywhere but its own on-demand chunk (see findPortalLeaks). */
export function isolatePortals(): Plugin {
  return {
    name: 'mwavuli:isolate-portals',
    generateBundle(_options, bundle) {
      const chunks = Object.values(bundle).flatMap((item) => (item.type === 'chunk' ? [item] : []));
      const problems = findPortalLeaks(chunks);
      if (problems.length > 0) {
        this.error(`Portals must load one at a time, on demand:\n  ${problems.join('\n  ')}`);
      }
    },
  };
}
