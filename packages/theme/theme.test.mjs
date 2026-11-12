// The web theme (theme.css) and the mobile preset (native.cjs) are two views of one set of tokens. This
// reads both, with the token values they point at, and fails when they stop agreeing: a colour, a type
// step, a radius or a shadow that is in one and not the other, or has a different value.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);
const preset = require('./native.cjs');
const themeCss = readFileSync(new URL('./theme.css', import.meta.url), 'utf8');
const tokensCss = readFileSync(require.resolve('@mwavuli/brand/tokens.css'), 'utf8');

/** `--mw-*: value;` declarations of the token stylesheet. */
const tokenValue = Object.fromEntries(
  [...tokensCss.matchAll(/^\s*(--mw-[\w-]+):\s*(.+?);/gm)].map(([, name, v]) => [name, v]),
);

/** The `@theme` block's `--prefix-name: var(--mw-*)` declarations, resolved to their token values. */
function webTheme(prefix, suffix = '') {
  const block = themeCss.match(/@theme \{([\s\S]*?)\n\}/)[1];
  const out = {};
  const declaration = new RegExp(`^\\s*--${prefix}-([a-z][a-z0-9-]*?)${suffix}:\\s*var\\((--mw-[\\w-]+)\\);`, 'gm');
  for (const [, name, token] of block.matchAll(declaration)) {
    if (suffix || !name.includes('--')) out[name] = tokenValue[token];
  }
  return out;
}

/** A length in pixels: the stylesheet writes rem (16px each), the preset writes px. */
const toPx = (v) => (v.endsWith('rem') ? Number.parseFloat(v) * 16 : Number.parseFloat(v));

const upper = (map) => Object.fromEntries(Object.entries(map).map(([k, v]) => [k, v.toUpperCase()]));

describe('the mobile preset follows the web theme', () => {
  it('takes every web colour, type step, radius and shadow from a token', () => {
    // A value written in the web theme itself would be one the preset cannot be compared against.
    const block = themeCss.match(/@theme \{([\s\S]*?)\n\}/)[1];
    const literals = [...block.matchAll(/^\s*(--(?:color|text|radius|shadow)-[\w-]+):\s*(.+?);/gm)]
      .filter(([, , value]) => value !== 'initial' && !/^var\(--mw-[\w-]+\)$/.test(value))
      .map(([, name]) => name);
    expect(literals).toEqual([]);
  });

  it('has the same colours with the same values', () => {
    expect(upper(preset.theme.colors)).toEqual(upper(webTheme('color')));
  });

  it('has the same type steps with the same sizes, line heights and tracking', () => {
    const size = webTheme('text');
    const steps = Object.keys(size).filter((name) => !name.includes('--'));
    const lineHeight = webTheme('text', '--line-height');
    const tracking = webTheme('text', '--letter-spacing');

    expect(Object.keys(preset.theme.fontSize).sort()).toEqual(steps.sort());
    for (const name of steps) {
      const [fontSize, extras] = preset.theme.fontSize[name];
      const sizePx = toPx(size[name]);
      expect(toPx(fontSize), `${name} size`).toBe(sizePx);
      expect(toPx(extras.lineHeight), `${name} line height`).toBe(toPx(lineHeight[name]));
      // The web theme gives tracking in em; the preset gives pixels.
      const em = tracking[name] === undefined ? 0 : Number.parseFloat(tracking[name]);
      expect(Number.parseFloat(extras.letterSpacing), `${name} tracking`).toBeCloseTo(em * sizePx, 3);
    }
  });

  it('has the same radii and shadows', () => {
    const { none, ...radii } = preset.theme.borderRadius;
    expect(none).toBe('0px');
    expect(radii).toEqual(webTheme('radius'));
    expect(preset.theme.boxShadow).toEqual(webTheme('shadow'));
  });
});
