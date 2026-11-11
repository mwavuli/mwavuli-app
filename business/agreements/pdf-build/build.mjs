#!/usr/bin/env node
// Builds print-ready PDFs of the agreement documents from their markdown sources.
//
//   node business/agreements/pdf-build/build.mjs [name ...]
//
// Needs pandoc on the PATH and Playwright with Chromium (npm install playwright, or point
// PLAYWRIGHT_DIR at an existing install). The PDFs go to business/agreements/pdf/.
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const outDir = join(root, 'pdf');
const css = readFileSync(join(here, 'print.css'), 'utf8');

const ORG = 'Mwavuli Holdings Ltd';
const ALL = ['landlord-agreement', 'landlord-agreement-schedule', 'tenancy-form', 'inspection-report', 'explanation-note'];
const MONTHS = 'Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec';

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

// The first paragraph after the title is drafting meta: it gives the version and is not printed.
// Everything from "Drafting notes" on is for counsel and is not printed either.
function prepare(source) {
  const blocks = source.split(/\n{2,}/);
  const title = blocks[0].replace(/^#\s+/, '').trim();
  const version = (blocks[1].match(/^(Draft|Version)\s+[\d.]+/) || ['Draft'])[0];
  const end = blocks.findIndex((b) => b.startsWith('## Drafting notes'));
  return { title, version, md: blocks.slice(2, end === -1 ? undefined : end).join('\n\n') };
}

// [ ] becomes a checkbox and [hint] a fill-in line. Amounts, day-months and the P.O. Box stay on one line.
// Only text between tags is touched.
function fieldsAndSpaces(text) {
  return text
    .replace(/\[ \]/g, '<span class="box"></span>')
    .replace(/\[([^\]]+)\]/g, (_, inner) => {
      const hint = inner.replace(/^to fill:?\s*/i, '').trim();
      if (!hint) return '<span class="fill blank">&nbsp;</span>';
      return `<span class="${hint.length > 26 ? 'fill long' : 'fill'}"><span class="h">${hint}</span></span>`;
    })
    .replace(/\bUGX \d[\d,.]*/g, '<span class="nb">$&</span>')
    .replace(new RegExp(`\\b\\d{1,2} (?:${MONTHS})\\b`, 'g'), '<span class="nb">$&</span>')
    .replace(/P\.O\. Box/g, '<span class="nb">$&</span>');
}

function transform(html) {
  html = html
    .replace(/<colgroup>[\s\S]*?<\/colgroup>\s*/g, '')
    .replace(/<a\b[^>]*>([\s\S]*?)<\/a>/g, '$1')
    .replace(/<h1\b[^>]*>[\s\S]*?<\/h1>\s*/, '')
    .replace(/<h3([^>]*)>\s*(S?\d+)\.\s+([\s\S]*?)<\/h3>/g, '<h3$1><span class="num">$2</span><span class="ttl">$3</span></h3>')
    .replace(/<h2([^>]*)>\s*(Annex \d+)\.\s+([\s\S]*?)<\/h2>/g, '<h2$1><span class="kick">$2</span><span class="ttl">$3</span></h2>')
    .replace(/<li>\s*<strong>([^<]+?)<\/strong>\s*([\s\S]*?)<\/li>/g,
      (_, lead, rest) => `<li class="lead"><span class="n">${lead.replace(/:$/, '')}</span><span class="tx">${rest.trim()}</span></li>`)
    .replace(/<input type="checkbox"[^>]*>/g, '<span class="box"></span>')
    .replace(/<p>For example: /g, '<p class="example"><span class="lbl">For example</span>')
    .replace(/(<section id="the-figures"[^>]*>[\s\S]*?)<table>/, '$1<table class="figures">')
    .replace(/<table>(\s*<thead>\s*<tr>\s*<th>Detail<\/th>)/g, '<table class="form">$1')
    .replace(/<table>(\s*<thead>\s*<tr>\s*<th>Part<\/th>\s*<th>OK<\/th>)/g, '<table class="checks">$1');
  // A cell holding nothing but a blank gets a full-width line.
  return html.split(/(<[^>]+>)/).map((part, i) => (i % 2 ? part : fieldsAndSpaces(part))).join('')
    .replace(/<td>(\s*<span class="fill[^"]*">(?:<span class="h">[^<]*<\/span>|&nbsp;)<\/span>\s*)<\/td>/g, '<td class="solo">$1</td>');
}

// A title with a colon prints as a title and a subtitle.
function render(name, title, body) {
  const [main, ...rest] = title.split(':');
  const sub = rest.join(':').trim();
  const subtitle = sub ? `<p class="sub">${sub[0].toUpperCase()}${sub.slice(1)}</p>` : '';
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${title}</title><style>${css}</style></head>`
    + `<body class="${name}"><header class="titleblock"><div class="org">${ORG}</div><h1>${main}</h1>${subtitle}</header>${body}</body></html>`;
}

function footer(label, version) {
  return `<div style="width:100%;padding:0 22mm;font-family:Montserrat,Helvetica,Arial,sans-serif;font-size:6.8pt;font-weight:500;color:#4d4d4d">`
    + `<div style="display:flex;justify-content:space-between;border-top:0.5pt solid #8a8a8a;padding-top:2.2mm">`
    + `<span>${ORG} &nbsp;·&nbsp; ${label} &nbsp;·&nbsp; ${version}</span>`
    + `<span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div></div>`;
}

const names = process.argv.slice(2).length ? process.argv.slice(2) : ALL;
const chromium = await loadChromium();
mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
try {
  for (const name of names) {
    const { title, version, md } = prepare(readFileSync(join(root, `${name}.md`), 'utf8'));
    const html = execFileSync('pandoc', ['-f', 'gfm+smart', '-t', 'html', '--section-divs', '--wrap=none'], { input: md, encoding: 'utf8' });
    const tab = await browser.newPage();
    await tab.setContent(render(name, title, transform(html)), { waitUntil: 'load' });
    await tab.evaluate(() => document.fonts.ready);
    await tab.pdf({
      path: join(outDir, `${name}.pdf`),
      preferCSSPageSize: true,
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate: footer(title.split(':')[0], version),
      tagged: true,
      outline: true,
    });
    await tab.close();
    console.log(`built ${name}.pdf`);
  }
} finally {
  await browser.close();
}
