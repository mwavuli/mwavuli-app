/**
 * Roof-form art for the film hero, the number tiles, the service cards and the end card
 * (brand M1, M3).
 *
 * Every edge in every scene runs at the logo's slope, about 43 degrees: roofs, chevron bands
 * and stripes are all built from the one constant below, never drawn by eye. The shapes are
 * flat polygons in brand tones (no gradients, no transparency, no ornament), painted back to
 * front on a flat field, and they run off the edge of the frame. The window grid is the
 * mark's: four equal squares.
 */

/** The logo's roof slope (brand L2, M1). */
export const ROOF_DEG = 43;
const RAD = (ROOF_DEG * Math.PI) / 180;
/** Rise over run of a roof edge. */
export const SLOPE = Math.tan(RAD);
const COS = Math.cos(RAD);

/**
 * Brand tones for shapes, mapped to `--mw-*` tokens by the `.tone-*` classes in global.css.
 * green: core Green. g: green ramp. s: sage ramp. k: gold ramp. gold and cream: core colours.
 */
export type Tone =
  | 'green'
  | 'g100'
  | 'g300'
  | 'g700'
  | 'g900'
  | 's100'
  | 's300'
  | 's500'
  | 's700'
  | 'k100'
  | 'k300'
  | 'gold'
  | 'cream';

/** The flat field a scene sits on, mapped to a `.panel-*` class in global.css. */
export type Panel = 'green' | 'g50' | 'g700' | 'g900' | 's100' | 's700' | 'k100';

export interface Shape {
  tone: Tone;
  points: string;
}

export interface SceneArt {
  width: number;
  height: number;
  /** The flat field the shapes sit on. */
  panel: Panel;
  shapes: Shape[];
}

type Pt = readonly [number, number];

const round = (n: number) => Math.round(n * 10) / 10;
const toPoints = (list: Pt[]) => list.map(([x, y]) => `${round(x)},${round(y)}`).join(' ');

/** Vertical size of a band whose thickness is `t` measured at right angles to the roof. */
const rise = (t: number) => t / COS;

/** Roof height at horizontal distance `dx` from the ridge. */
const roofDrop = (dx: number) => SLOPE * Math.abs(dx);

/** A house: walls down to `base`, a pitched roof at the logo's slope. */
const house = (cx: number, ridge: number, half: number, base: number): Pt[] => [
  [cx - half, base],
  [cx - half, ridge + roofDrop(half)],
  [cx, ridge],
  [cx + half, ridge + roofDrop(half)],
  [cx + half, base],
];

/** The left half of a house: the roof rises to the right and stops at the ridge. */
const leftHalf = (edge: number, ridge: number, half: number, base: number): Pt[] => [
  [edge - half, base],
  [edge - half, ridge + roofDrop(half)],
  [edge, ridge],
  [edge, base],
];

/** The right half of a house: the roof falls away to the right from the ridge. */
const rightHalf = (edge: number, ridge: number, half: number, base: number): Pt[] => [
  [edge, base],
  [edge, ridge],
  [edge + half, ridge + roofDrop(half)],
  [edge + half, base],
];

/** A chevron band like a roof bar: ridge at (cx, ridge), legs of horizontal reach `reach`. */
const chevron = (cx: number, ridge: number, reach: number, t: number): Pt[] => {
  const v = rise(t);
  const foot = ridge + roofDrop(reach);
  const inner = reach - v / SLOPE;
  return [
    [cx - reach, foot],
    [cx, ridge],
    [cx + reach, foot],
    [cx + inner, foot],
    [cx, ridge + v],
    [cx - inner, foot],
  ];
};

/** One leg of a chevron: the part to the right of the ridge. */
const rightLeg = (cx: number, ridge: number, reach: number, t: number): Pt[] => {
  const v = rise(t);
  const foot = ridge + roofDrop(reach);
  const inner = reach - v / SLOPE;
  return [
    [cx, ridge],
    [cx + reach, foot],
    [cx + inner, foot],
    [cx, ridge + v],
  ];
};

/** A stripe that rises to the right at the roof slope, from `x0` to `x0 + w` along `base`. */
const stripe = (x0: number, w: number, base: number, top: number): Pt[] => {
  const run = (base - top) / SLOPE;
  return [
    [x0, base],
    [x0 + w, base],
    [x0 + w + run, top],
    [x0 + run, top],
  ];
};

/** A vertical slice of a roof between `a` and `b` on the right-hand slope of the ridge at `cx`. */
const slab = (a: number, b: number, cx: number, ridge: number, base: number): Pt[] => [
  [a, base],
  [a, ridge + roofDrop(a - cx)],
  [b, ridge + roofDrop(b - cx)],
  [b, base],
];

const square = (x: number, y: number, size: number): Pt[] => [
  [x, y],
  [x + size, y],
  [x + size, y + size],
  [x, y + size],
];

type Add = (tone: Tone, pts: Pt[]) => void;

/** The mark's window: four equal squares, centred on `cx`, the top row at `top` (brand L2). */
const windowGrid = (add: Add, tone: Tone, cx: number, top: number, size: number, gap: number) => {
  const left = cx - size - gap / 2;
  [0, 1].forEach((row) =>
    [0, 1].forEach((col) => add(tone, square(left + col * (size + gap), top + row * (size + gap), size))),
  );
};

function build(width: number, height: number, panel: Panel, draw: (add: Add) => void): SceneArt {
  const shapes: Shape[] = [];
  draw((tone, pts) => shapes.push({ tone, points: toPoints(pts) }));
  return { width, height, panel, shapes };
}

/* ---------------------------------------------------------------------------------------
 * Hero scenes. Each has a desktop panel (640 by 780, the right-hand side of the hero above
 * the film deck) and a phone panel (400 by 560, the top of the hero, anchored to its top edge). Text never sits on a
 * shape: the panel is a field of its own beside the text on a desktop and above it on a phone.
 * ------------------------------------------------------------------------------------ */

const DB = 860; // desktop base, below the frame so the walls run off the bottom edge
const MB = 700; // phone base

/** 1. Two roofs side by side: the letter M (M1), with the mark's window grid. */
const twoRoofsDesktop = build(640, 780, 'g900', (add) => {
  add('g700', house(206, 130, 214, DB));
  add('s700', chevron(206, 130, 262, 22));
  add('green', house(452, 292, 214, DB));
  add('g700', house(452, 292 + rise(58), 214 - 58, DB));
  add('gold', chevron(452, 292, 214, 16));
  windowGrid(add, 'cream', 452, 520, 46, 14);
});

const twoRoofsPhone = build(400, 560, 'g900', (add) => {
  add('g700', house(96, 190, 170, MB));
  add('s700', chevron(96, 190, 240, 20));
  add('green', house(282, 122, 170, MB));
  add('g700', house(282, 122 + rise(44), 170 - 44, MB));
  add('gold', chevron(282, 122, 170, 12));
});

/** 2. Courses rising at the roof slope, bar after bar: rent coming in, month on month. */
const risingDesktop = build(640, 780, 'g700', (add) => {
  const top = -80;
  add('g900', stripe(-420, 210, DB, top));
  add('green', stripe(-210, 70, DB, top));
  add('s700', stripe(-140, 26, DB, top));
  add('g900', stripe(-114, 150, DB, top));
  add('gold', stripe(36, 22, DB, top));
  add('green', stripe(58, 120, DB, top));
  add('g900', stripe(178, 40, DB, top));
  add('s700', stripe(218, 90, DB, top));
  add('g900', stripe(308, 400, DB, top));
});

const risingPhone = build(400, 560, 'g700', (add) => {
  const top = -60;
  add('g900', stripe(-480, 150, MB, top));
  add('green', stripe(-330, 50, MB, top));
  add('g900', stripe(-280, 110, MB, top));
  add('gold', stripe(-170, 16, MB, top));
  add('green', stripe(-154, 90, MB, top));
  add('s700', stripe(-64, 60, MB, top));
  add('g900', stripe(-4, 500, MB, top));
});

/** 3. One roof, 85 to 15: the gold slab is exactly 15 percent of the roof's width. */
const splitDesktop = (() => {
  const left = 36;
  const right = 604;
  const cx = (left + right) / 2;
  const half = (right - left) / 2;
  const cut = left + (right - left) * 0.85;
  return build(640, 780, 'g900', (add) => {
    add('s700', house(cx, 250, half, DB));
    add('green', house(cx, 250 + rise(26), half - 26, DB));
    add('g700', house(cx, 250 + rise(120), half - 120, DB));
    add('gold', slab(cut, right, cx, 250, DB));
  });
})();

const splitPhone = (() => {
  const left = 24;
  const right = 376;
  const cx = (left + right) / 2;
  const half = (right - left) / 2;
  const cut = left + (right - left) * 0.85;
  return build(400, 560, 'g900', (add) => {
    add('s700', house(cx, 118, half, MB));
    add('green', house(cx, 118 + rise(20), half - 20, MB));
    add('g700', house(cx, 118 + rise(84), half - 84, MB));
    add('gold', slab(cut, right, cx, 118, MB));
  });
})();

/** 4. An open roof: two halves with a gap between them, and daylight through it. */
const openDesktop = build(640, 780, 's700', (add) => {
  add('g900', leftHalf(282, 210, 250, DB));
  add('green', leftHalf(282, 210 + rise(40), 250 - 40, DB));
  add('g700', rightHalf(358, 290, 250, DB));
  add('gold', rightLeg(358, 290, 250, 16));
  windowGrid(add, 'cream', 150, 520, 46, 14);
});

const openPhone = build(400, 560, 's700', (add) => {
  add('g900', leftHalf(186, 112, 170, MB));
  add('green', leftHalf(186, 112 + rise(28), 170 - 28, MB));
  add('g700', rightHalf(234, 186, 170, MB));
  add('gold', rightLeg(234, 186, 170, 12));
});

export type SceneId = 'roofs' | 'rise' | 'split' | 'open';

export const SCENES: Record<SceneId, { desktop: SceneArt; phone: SceneArt }> = {
  roofs: { desktop: twoRoofsDesktop, phone: twoRoofsPhone },
  rise: { desktop: risingDesktop, phone: risingPhone },
  split: { desktop: splitDesktop, phone: splitPhone },
  open: { desktop: openDesktop, phone: openPhone },
};

/* ---------------------------------------------------------------------------------------
 * Number tiles: corner art in the family of each tile's ground (480 by 200), standing in the
 * bottom-right corner and run off the bottom and right edges of the tile.
 * ------------------------------------------------------------------------------------ */

const TB = 300;

export const TILE_ART: SceneArt[] = [
  build(480, 200, 's100', (add) => {
    add('s300', house(350, 40, 230, TB));
    add('s100', house(350, 40 + rise(30), 230 - 30, TB));
    add('s500', house(424, 100, 150, TB));
    add('gold', chevron(424, 100, 150, 10));
  }),
  build(480, 200, 'green', (add) => {
    add('g700', house(340, 30, 250, TB));
    add('g900', house(410, 90, 170, TB));
    add('gold', chevron(410, 90, 170, 11));
  }),
  build(480, 200, 'k100', (add) => {
    add('k300', house(360, 30, 240, TB));
    add('k100', house(360, 30 + rise(30), 210, TB));
    add('green', house(430, 110, 130, TB));
    add('gold', chevron(430, 110, 130, 10));
  }),
];

/* ---------------------------------------------------------------------------------------
 * Service card art (light grounds): roof planes in green tints on green-50, with the
 * M2 pattern behind them in CSS (400 by 224).
 * ------------------------------------------------------------------------------------ */

const CB = 300;

export const CARD_ART: SceneArt[] = [
  build(400, 224, 'g50', (add) => {
    add('g100', house(300, 40, 170, CB));
    add('g300', house(330, 110, 140, CB));
    add('gold', chevron(330, 110, 140, 9));
  }),
  build(400, 224, 'g50', (add) => {
    add('g100', house(250, 70, 150, CB));
    add('g300', house(370, 100, 110, CB));
    add('gold', chevron(370, 100, 110, 9));
  }),
  build(400, 224, 'g50', (add) => {
    add('g100', stripe(120, 110, CB, -20));
    add('g300', stripe(230, 60, CB, -20));
    add('gold', stripe(290, 12, CB, -20));
    add('g100', stripe(302, 160, CB, -20));
  }),
  build(400, 224, 'g50', (add) => {
    add('g100', leftHalf(290, 60, 180, CB));
    add('g300', rightHalf(330, 110, 110, CB));
    add('gold', rightLeg(330, 110, 110, 9));
  }),
  build(400, 224, 'g50', (add) => {
    add('g100', house(280, 80, 150, CB));
    add('g300', house(280, 80 + rise(36), 150 - 36, CB));
    add('gold', slab(335, 430, 280, 80, CB));
  }),
  build(400, 224, 'g50', (add) => {
    add('g100', house(230, 90, 140, CB));
    add('g300', house(350, 50, 140, CB));
    add('gold', chevron(350, 50, 140, 9));
  }),
];

/* ---------------------------------------------------------------------------------------
 * The photo slot in the contact section (4 by 5): layered tonal planes, as the photograph's
 * stand-in until it exists (D14). Light field, so the M2 pattern runs behind it.
 * ------------------------------------------------------------------------------------ */

export const SLOT_ART: SceneArt = build(480, 600, 's100', (add) => {
  add('s300', house(150, 120, 220, 700));
  add('g100', house(150, 120 + rise(30), 190, 700));
  add('g300', house(360, 250, 220, 700));
  add('green', house(360, 250 + rise(36), 220 - 36, 700));
  add('gold', chevron(360, 250, 220, 12));
  windowGrid(add, 'cream', 360, 430, 40, 12);
});
