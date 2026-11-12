// WhatsApp group avatars (MVL-28, brand decision D18): the app logo in a colourway per group.
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

const groups = [
  { id: 'general', name: 'General', ground: 'core.green', mark: 'core.gold' },
  { id: 'finance', name: 'Finance', ground: 'core.gold', mark: 'core.green' },
  { id: 'ops', name: 'Ops', ground: 'core.slate', mark: 'core.gold' },
  { id: 'support', name: 'Support', ground: 'core.cream', mark: 'core.green' },
].map((g) => ({ ...g, file: `mwavuli-${g.id}` }));

const svg = (g) =>
  [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 512 512">`,
    `<rect width="512" height="512" fill="${color(g.ground)}"/>`,
    `<path fill="${color(g.mark)}" d="${markPath}"/>`,
    '</svg>',
    '',
  ].join('\n');

rmSync(join(here, 'svg'), { recursive: true, force: true });
rmSync(join(here, 'png'), { recursive: true, force: true });
mkdirSync(join(here, 'svg'));
mkdirSync(join(here, 'png'));
for (const g of groups) {
  writeFileSync(join(here, 'svg', `${g.file}.svg`), svg(g));
  console.log(`${g.id.padEnd(8)} mark/ground ${contrast(g.mark, g.ground)}:1`);
}

const describe = ({ ground, mark }) => {
  const [g, m] = [ground, mark].map((token) => token.split('.')[1]);
  return `${g[0].toUpperCase()}${g.slice(1)} ground, ${m} mark`;
};
const tile = (g) =>
  `<figure><img src="svg/${g.file}.svg" width="180" height="180" alt="">` +
  `<figcaption><b>${g.name}</b>${describe(g)}</figcaption></figure>`;
const chat = (g) =>
  `<div class="chat"><img src="svg/${g.file}.svg" width="49" height="49" alt="">` +
  `<div><b>Mwavuli ${g.name}</b><span>${g.file}.png</span></div></div>`;

const preview = `<!doctype html><meta charset="utf-8"><title>WhatsApp group avatars</title>
<style>
  body { margin: 0; padding: 32px; width: 820px; background: #F6F3E9; color: #2F3437;
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
<h2>Circle crop</h2>
<div class="row">${groups.map(tile).join('')}</div>
<h2>Chat list at 49 px, light and dark</h2>
<div class="lists">${['light', 'dark']
  .map((mode) => `<div class="list ${mode}">${groups.map(chat).join('')}</div>`)
  .join('')}</div>
`;
writeFileSync(join(here, 'preview.html'), preview);

// Playwright comes from the private browser tools (~/.claude/tools/browser), never from the workspace.
const tools = process.env.BROWSER_TOOLS ?? join(homedir(), '.claude/tools/browser');
const { chromium } = createRequire(join(tools, 'package.json'))('playwright');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: SIZE, height: SIZE } });
for (const g of groups) {
  await page.goto(pathToFileURL(join(here, 'svg', `${g.file}.svg`)).href);
  await page.screenshot({ path: join(here, 'png', `${g.file}.png`), clip: { x: 0, y: 0, width: SIZE, height: SIZE } });
}
const sheet = await browser.newPage({ viewport: { width: 884, height: 600 }, deviceScaleFactor: 2 });
await sheet.goto(pathToFileURL(join(here, 'preview.html')).href);
await sheet.screenshot({ path: join(here, 'preview.png'), fullPage: true });
await browser.close();
console.log(`${groups.length} avatars in png/, preview.png`);
