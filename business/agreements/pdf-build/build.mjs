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
const ADDRESS = 'P.O. Box 170886, Kampala, Uganda';
const logo = readFileSync(join(here, 'logo-horizontal-slate.svg'), 'utf8')
  .replace('<svg ', '<svg style="display:block;width:38mm;height:auto" ');
const ALL = ['landlord-agreement', 'landlord-agreement-schedule', 'tenancy-form', 'inspection-report'];
const MONTHS = 'January|February|March|April|May|June|July|August|September|October|November|December';

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

// The first paragraph after the title is drafting meta and is not printed.
// Everything from "Drafting notes" on is for counsel and is not printed either.
function prepare(source) {
  const blocks = source.split(/\n{2,}/);
  const title = blocks[0].replace(/^#\s+/, '').trim();
  const end = blocks.findIndex((b) => b.startsWith('## Drafting notes'));
  return { title, md: blocks.slice(2, end === -1 ? undefined : end).join('\n\n') };
}

// [ ] becomes a checkbox and [name] a blank line to write on. The name says what goes there and does not print:
// a day, number, first or last gets a short line, a name over 26 characters a long one, and "[name; 2 lines]" two
// lines. A blank stays on one line with the word before it and the punctuation after it, and a checkbox with the
// word after it. Amounts, day-months and the P.O. Box stay on one line too. Only text between tags is touched.
const BOX = '';
const FILL = { '': 'fill short', '': 'fill', '': 'fill long' };
const KEPT = /(?: )?(?:[^\s-]+ )?[-][.,;:)”’]*|(?: [^\s-]+)?/g;

function fieldsAndSpaces(text) {
  return text
    .replace(/\[ \]/g, BOX)
    .replace(/\[([^\]]+)\]/g, (_, inner) => {
      const [, name, lines = 1] = inner.trim().match(/^(?:to fill:?\s*)?(.*?)(?:;\s*(\d+) lines)?$/i);
      return (/^(day|number|first|last)$/.test(name) ? '' : name.length > 26 ? '' : '').repeat(lines);
    })
    .replace(KEPT, (kept) => {
      const html = kept.replace(/[-]/g,
        (c) => (c === BOX ? '<span class="box"></span>' : `<span class="${FILL[c]}">&nbsp;</span>`));
      return kept.length > 1 ? `<span class="nb">${html}</span>` : html;
    })
    .replace(/\bUGX \d[\d,.]*/g, '<span class="nb">$&</span>')
    .replace(new RegExp(`\\b\\d{1,2}(?:st|nd|rd|th)? (?:${MONTHS})\\b`, 'g'), '<span class="nb">$&</span>')
    .replace(/P\.O\. Box/g, '<span class="nb">$&</span>');
}

function transform(html) {
  html = html
    .replace(/<colgroup>[\s\S]*?<\/colgroup>\s*/g, '')
    .replace(/<a\b[^>]*>([\s\S]*?)<\/a>/g, '$1')
    .replace(/<h1\b[^>]*>[\s\S]*?<\/h1>\s*/, '')
    .replace(/<h3([^>]*)>\s*(S?\d+)\.\s+([\s\S]*?)<\/h3>/g, '<h3$1><span class="num">$2</span><span class="ttl">$3</span></h3>')
    .replace(/<h2([^>]*)>\s*(Annex \d+)\.\s+([\s\S]*?)<\/h2>/g, '<h2$1><span class="kick">$2</span><span class="ttl">$3</span></h2>')
    .replace(/<li>\s*<strong>([^<]+?)<\/strong>\s*([\s\S]*?)<\/li>/g, (_, lead, rest) => `<li class="${/:$/.test(lead) ? 'lead field' : 'lead'}">`
      + `<span class="n">${lead.replace(/:$/, '')}</span><span class="tx">${rest.trim()}</span></li>`)
    .replace(/<p>\s*<strong>([^<]+?):<\/strong>\s*([\s\S]*?)<\/p>/g,
      '<p class="lead field"><span class="n">$1</span><span class="tx">$2</span></p>')
    .replace(/<input type="checkbox"[^>]*>/g, '<span class="box"></span>')
    .replace(/<p>For example: /g, '<p class="example"><span class="lbl">For example</span>')
    .replace(/(<section id="the-figures"[^>]*>[\s\S]*?)<table>/, '$1<table class="figures">')
    .replace(/<table>(\s*<thead>\s*<tr>\s*<th>Detail<\/th>)/g, '<table class="form">$1')
    .replace(/<table>(\s*<thead>\s*<tr>\s*<th>Part<\/th>\s*<th>OK<\/th>)/g, '<table class="checks">$1');
  // A cell or a labelled field holding nothing but blanks gets full-width lines.
  return html.split(/(<[^>]+>)/).map((part, i) => (i % 2 ? part : fieldsAndSpaces(part))).join('')
    .replace(/<td>((?:\s*<span class="fill[^"]*">&nbsp;<\/span>)+\s*)<\/td>/g, '<td class="solo">$1</td>')
    .replace(/<span class="tx">((?:\s*<span class="fill[^"]*">&nbsp;<\/span>)+\s*)<\/span>/g, '<span class="tx solo">$1</span>');
}

// A title with a colon prints as a title and a subtitle.
function render(name, title, body) {
  const [main, ...rest] = title.split(':');
  const sub = rest.join(':').trim();
  const subtitle = sub ? `<p class="sub">${sub[0].toUpperCase()}${sub.slice(1)}</p>` : '';
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${title}</title><style>${css}</style></head>`
    + `<body class="${name}"><header class="titleblock"><h1>${main}</h1>${subtitle}</header>${body}</body></html>`;
}

// Every page is headed: the one-color lockup on the left, the company on the right. The Slate values repeat
// print.css because a header and footer template is its own page.
function header() {
  return `<div style="position:absolute;top:8.5mm;left:22mm;right:22mm;display:flex;justify-content:space-between;`
    + `align-items:flex-end;font-family:Montserrat,Helvetica,Arial,sans-serif;color:#2F3437;-webkit-print-color-adjust:exact">`
    + logo
    + `<div style="text-align:right;font-size:6.8pt;line-height:1.5"><div style="font-weight:600">${ORG}</div>`
    + `<div style="font-weight:500;color:#4E5255">${ADDRESS}</div></div></div>`;
}

function footer(label) {
  return `<div style="width:100%;padding:0 22mm;font-family:Montserrat,Helvetica,Arial,sans-serif;font-size:6.8pt;font-weight:500;color:#4E5255">`
    + `<div style="display:flex;justify-content:space-between;border-top:0.5pt solid #828587;padding-top:2.2mm">`
    + `<span>${label}</span>`
    + `<span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div></div>`;
}

const names = process.argv.slice(2).length ? process.argv.slice(2) : ALL;
const chromium = await loadChromium();
mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
try {
  for (const name of names) {
    const { title, md } = prepare(readFileSync(join(root, `${name}.md`), 'utf8'));
    const html = execFileSync('pandoc', ['-f', 'gfm+smart', '-t', 'html', '--section-divs', '--wrap=none'], { input: md, encoding: 'utf8' });
    const tab = await browser.newPage();
    await tab.setContent(render(name, title, transform(html)), { waitUntil: 'load' });
    await tab.evaluate(() => document.fonts.ready);
    await tab.pdf({
      path: join(outDir, `${name}.pdf`),
      preferCSSPageSize: true,
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: header(),
      footerTemplate: footer(title.split(':')[0]),
      tagged: true,
      outline: true,
    });
    await tab.close();
    console.log(`built ${name}.pdf`);
  }
} finally {
  await browser.close();
}
