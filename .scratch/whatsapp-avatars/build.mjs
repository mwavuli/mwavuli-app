// WhatsApp group avatars (MVL-28): the app logo in a colourway per group.
// Writes svg/*.svg from the brand files, renders png/*.png at 640 px, and preview.html and preview.png.
// Run: node .scratch/whatsapp-avatars/build.mjs
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, '../..');
const SIZE = 640; // WhatsApp stores profile and group photos at 640 by 640

const tokens = JSON.parse(readFileSync(join(repo, 'brand/tokens/mwavuli.tokens.json'), 'utf8'));
const color = (name) => name.split('.').reduce((node, key) => node[key], tokens.color).$value;

const luminance = (hex) =>
  hex
    .match(/\w\w/g)
    .map((h) => parseInt(h, 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
    .reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0);
const contrast = (a, b) => {
  const [hi, lo] = [luminance(color(a)), luminance(color(b))].sort((x, y) => y - x);
  return ((hi + 0.05) / (lo + 0.05)).toFixed(2);
};

// app-icon.svg holds the mark already placed on its 512 tile at 59 percent (L7). WhatsApp applies its
// own circle, so the tile goes full-bleed and the mark keeps the tile's placement (L7, bend when).
const appIcon = readFileSync(join(repo, 'brand/logo/app-icon.svg'), 'utf8');
const markPath = [...appIcon.matchAll(/ d="([^"]+)"/g)][1][1];

// The roof treatment: one giant roof line at the full house's slope (about 43 degrees, L2), its apex
// on the axis and parallel to the mark's roofs with the mark's clear space (L4) between them. The
// core ground stays the house; the sky above it takes one ramp step (C5).
const SLOPE = 0.92;
const APEX = 75;
const EAVE = APEX + SLOPE * 256;
const sky = (tone) => `<polygon fill="${color(tone)}" points="0,0 512,0 512,${EAVE} 256,${APEX} 0,${EAVE}"/>`;

const colourways = {
  'green-gold': { ground: 'core.green', mark: 'core.gold', sky: 'ramp.green.900' },
  'gold-green': { ground: 'core.gold', mark: 'core.green', sky: 'ramp.gold.300' },
  'slate-gold': { ground: 'core.slate', mark: 'core.gold', sky: 'ramp.slate.700' },
  'cream-green': { ground: 'core.cream', mark: 'core.green', sky: 'ramp.green.100' },
  'cream-gold': { ground: 'core.cream', mark: 'core.gold' },
  'green-white': { ground: 'core.green', mark: 'core.white' },
  'sage-green': { ground: 'core.sage', mark: 'core.green' },
};

const groups = [
  { id: 'general', name: 'General', colourway: 'green-gold' },
  { id: 'finance', name: 'Finance', colourway: 'gold-green' },
  { id: 'ops', name: 'Ops', colourway: 'slate-gold' },
  { id: 'support', name: 'Support', colourway: 'cream-green' },
];
const alternates = ['cream-gold', 'green-white', 'sage-green'];

const solid = groups.map((g) => ({ ...g, file: `mwavuli-${g.id}`, roof: false }));
const roofed = groups.map((g) => ({ ...g, file: `mwavuli-${g.id}-roof`, roof: true }));
const alts = alternates.map((c) => ({ id: c, name: 'Alternate', colourway: c, file: `mwavuli-alt-${c}`, roof: false }));
const avatars = [...solid, ...roofed, ...alts];

const describe = (colourway) => {
  const [ground, mark] = colourway.split('-');
  return `${ground[0].toUpperCase()}${ground.slice(1)} ground, ${mark} mark`;
};

const svg = ({ colourway, roof }) => {
  const c = colourways[colourway];
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 512 512">`,
    `<rect width="512" height="512" fill="${color(c.ground)}"/>`,
    ...(roof ? [sky(c.sky)] : []),
    `<path fill="${color(c.mark)}" d="${markPath}"/>`,
    '</svg>',
    '',
  ].join('\n');
};

rmSync(join(here, 'svg'), { recursive: true, force: true });
rmSync(join(here, 'png'), { recursive: true, force: true });
mkdirSync(join(here, 'svg'));
mkdirSync(join(here, 'png'));
for (const a of avatars) writeFileSync(join(here, 'svg', `${a.file}.svg`), svg(a));

for (const [id, c] of Object.entries(colourways)) {
  const skyRatio = c.sky ? `  sky/ground ${contrast(c.sky, c.ground)}:1` : '';
  console.log(`${id.padEnd(12)} mark/ground ${contrast(c.mark, c.ground)}:1${skyRatio}`);
}

const tile = (a, size) =>
  `<figure><img src="svg/${a.file}.svg" width="${size}" height="${size}" alt="">` +
  `<figcaption><b>${a.name}</b>${describe(a.colourway)}</figcaption></figure>`;
const chat = (a) =>
  `<div class="chat"><img src="svg/${a.file}.svg" width="49" height="49" alt="">` +
  `<div><b>Mwavuli ${a.name}</b><span>${a.file}.png</span></div></div>`;
const lists = (set) =>
  ['light', 'dark'].map((mode) => `<div class="list ${mode}">${set.map(chat).join('')}</div>`).join('');

const preview = `<!doctype html><meta charset="utf-8"><title>WhatsApp group avatars</title>
<style>
  body { margin: 0; padding: 32px; width: 1360px; background: #F6F3E9; color: #2F3437;
    font: 14px/1.35 Inter, -apple-system, sans-serif; }
  h1 { font: 750 28px Montserrat, sans-serif; color: #0B4D3B; margin: 0 0 4px; }
  h2 { font: 700 13px Montserrat, sans-serif; letter-spacing: .14em; text-transform: uppercase; color: #0B4D3B;
    margin: 28px 0 12px; }
  p { margin: 0; color: #696D6F; }
  .row { display: flex; gap: 28px; }
  figure { margin: 0; text-align: center; }
  figure img { display: block; border-radius: 50%; }
  figcaption { margin-top: 8px; font-size: 12px; color: #696D6F; }
  figcaption b { display: block; color: #2F3437; font-size: 14px; }
  .lists { display: flex; gap: 16px; }
  .list { width: 320px; border-radius: 12px; padding: 6px 0; }
  .light { background: #FFFFFF; color: #111B21; }
  .dark { background: #111B21; color: #E9EDEF; }
  .chat { display: flex; align-items: center; gap: 14px; padding: 8px 16px; }
  .chat img { border-radius: 50%; }
  .chat b { display: block; font-weight: 600; font-size: 15px; }
  .chat span { opacity: .6; font-size: 12px; }
</style>
<h1>WhatsApp group avatars</h1>
<p>The app logo per group, in WhatsApp's circular crop. Upload the 640 px PNGs in png/.</p>
<h2>Solid, recommended</h2>
<div class="row">${solid.map((a) => tile(a, 180)).join('')}</div>
<h2>Roof</h2>
<div class="row">${roofed.map((a) => tile(a, 180)).join('')}</div>
<h2>Chat list at 49 px, light and dark</h2>
<div class="lists">${lists(solid)}</div>
<div class="lists" style="margin-top:16px">${lists(roofed)}</div>
<h2>Alternate colourways</h2>
<div class="row">${alts.map((a) => tile(a, 120)).join('')}<div class="lists">${lists(alts)}</div></div>
`;
writeFileSync(join(here, 'preview.html'), preview);

// Playwright comes from the private browser tools (~/.claude/tools/browser), never from the workspace.
const tools = process.env.BROWSER_TOOLS ?? join(homedir(), '.claude/tools/browser');
const { chromium } = createRequire(join(tools, 'package.json'))('playwright');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: SIZE, height: SIZE } });
for (const a of avatars) {
  await page.goto(pathToFileURL(join(here, 'svg', `${a.file}.svg`)).href);
  await page.screenshot({ path: join(here, 'png', `${a.file}.png`), clip: { x: 0, y: 0, width: SIZE, height: SIZE } });
}
const sheet = await browser.newPage({ viewport: { width: 1424, height: 900 }, deviceScaleFactor: 2 });
await sheet.goto(pathToFileURL(join(here, 'preview.html')).href);
await sheet.screenshot({ path: join(here, 'preview.png'), fullPage: true });
await browser.close();
console.log(`${avatars.length} avatars in png/, preview.png`);
