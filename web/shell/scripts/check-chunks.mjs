// Fails the build unless every portal is a chunk of its own that only a dynamic import reaches: the
// shell's entry must not pull a portal in statically, and no portal may pull in another. This is what
// makes "one persona at a time" true of the built app, whatever the source looks like.
//
//   node scripts/check-chunks.mjs        (after `vite build`, which writes dist/.vite/manifest.json)
import { readFileSync } from 'node:fs';

const PERSONAS = ['tenant', 'landlord', 'ops'];

const manifest = JSON.parse(readFileSync(new URL('../dist/.vite/manifest.json', import.meta.url), 'utf8'));
const keys = Object.keys(manifest);
const failures = [];

const entryKey = keys.find((key) => manifest[key].isEntry);
if (!entryKey) failures.push('the build has no entry chunk');

// A portal's source lives next to the shell: ../tenant/src/index.ts, and so on.
const portalKey = Object.fromEntries(PERSONAS.map((p) => [p, keys.find((key) => key.startsWith(`../${p}/src/`))]));

/** Every chunk reachable from `key` through static imports, `key` included. */
function staticClosure(key) {
  const seen = new Set();
  const pending = [key];
  while (pending.length > 0) {
    const next = pending.pop();
    if (seen.has(next)) continue;
    seen.add(next);
    pending.push(...(manifest[next]?.imports ?? []));
  }
  return seen;
}

for (const persona of PERSONAS) {
  const key = portalKey[persona];
  if (!key) {
    failures.push(`${persona}: no chunk was built for it`);
    continue;
  }
  if (!manifest[key].isDynamicEntry) failures.push(`${persona}: its chunk is not a dynamic entry`);
  if (entryKey && !manifest[entryKey].dynamicImports?.includes(key)) {
    failures.push(`${persona}: the shell does not load it with a dynamic import`);
  }
  if (entryKey && staticClosure(entryKey).has(key)) failures.push(`${persona}: the shell's entry imports it statically`);
  for (const other of PERSONAS.filter((p) => p !== persona)) {
    const otherKey = portalKey[other];
    if (otherKey && staticClosure(key).has(otherKey)) failures.push(`${persona}: it imports ${other} statically`);
  }
}

if (failures.length > 0) {
  console.error(failures.map((failure) => `chunk check failed: ${failure}`).join('\n'));
  process.exit(1);
}
console.log(`chunk check: ${PERSONAS.map((p) => `${p} (${manifest[portalKey[p]].file})`).join(', ')} load on demand only`);
