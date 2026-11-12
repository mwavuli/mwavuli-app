#!/usr/bin/env node
// Renders the social image (brand A6): scripts/social-image/card.html to public/social.png, 1200 x 630.
//
//   node scripts/social-image/build.mjs
//
// Needs Playwright with Chromium (npm install playwright, or point PLAYWRIGHT_DIR at an existing install)
// and the site's dependencies (pnpm install): the card reads the Montserrat face from node_modules and the
// colours from brand/tokens. The PNG is committed; rebuild it whenever the card or the brand changes.
import { mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../..');
const out = join(root, 'public', 'social.png');

const WIDTH = 1200;
const HEIGHT = 630;

async function loadChromium() {
  try {
    return (await import('playwright')).chromium;
  } catch {
    if (!process.env.PLAYWRIGHT_DIR) {
      throw new Error('Playwright not found. Run `npm install playwright` or set PLAYWRIGHT_DIR.');
    }
    return (await import(pathToFileURL(join(process.env.PLAYWRIGHT_DIR, 'index.mjs')).href)).chromium;
  }
}

const chromium = await loadChromium();
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(join(here, 'card.html')).href);
  await page.evaluate(() => document.fonts.ready);

  // A missing face falls back to a system font without any error, so check that Montserrat really loaded.
  const loaded = await page.evaluate(() =>
    [...document.fonts].some((face) => face.family.includes('Montserrat') && face.status === 'loaded'),
  );
  if (!loaded) throw new Error('Montserrat did not load. Run `pnpm install` and try again.');

  mkdirSync(dirname(out), { recursive: true });
  await page.screenshot({ path: out, clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT } });
} finally {
  await browser.close();
}
console.log(`wrote ${out}`);
