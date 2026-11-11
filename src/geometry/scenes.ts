/**
 * Flat roof-form compositions (brand M1, M3). Each scene is a list of houses standing on one
 * baseline, drawn back to front. A house is the logo's full house at any width (src/lib/roof.ts), so
 * every roof keeps the same slope. Nothing here is traced, shaded or blended: solid tone fills only.
 */

export type Tone =
  | 'cream'
  | 'white'
  | 'green'
  | 'green-50'
  | 'green-100'
  | 'green-300'
  | 'green-700'
  | 'green-900'
  | 'sage-100'
  | 'sage-300'
  | 'sage-700'
  | 'gold';

export type Item =
  | {
      type: 'house';
      cx: number;
      w: number;
      fill: Tone;
      /** Fill for the enclosed space, so a window reads against a darker room. */
      interior?: Tone;
      /** A filled house instead of the hollow house of the mark. */
      solid?: boolean;
      /** The four-square window of the mark, which lights up. */
      windows?: boolean;
    }
  | { type: 'line'; cx: number; w: number; stroke: Tone; width: number };

export interface Scene {
  width: number;
  height: number;
  base: number;
  items: Item[];
}

/** A family of nested roofs sharing one axis and one baseline: each ring is a larger house. */
function family(cx: number, rings: ReadonlyArray<readonly [number, Tone]>, core: number, gold?: number): Item[] {
  const items: Item[] = rings.map(([w, fill]): Item => ({ type: 'house', cx, w, fill }));
  if (gold) {
    // The gold band of the board's motif: a line at the roof's slope between the outer rings.
    items.splice(1, 0, { type: 'line', cx, w: gold, stroke: 'gold', width: 9 });
  }
  items.push({ type: 'house', cx, w: core, fill: 'cream', interior: 'green-700', windows: true });
  return items;
}

/** Hero, desktop: three families of different sizes, the largest bleeding off the right edge. */
export const heroWide: Scene = {
  width: 1440,
  height: 600,
  base: 600,
  items: [
    ...family(1180, [[720, 'green-700'], [590, 'sage-700']], 460, 655),
    ...family(650, [[330, 'sage-700']], 240),
    ...family(330, [[200, 'sage-700']], 128),
  ],
};

/** Hero, phone: the same idea at the width of a phone. */
export const heroNarrow: Scene = {
  width: 393,
  height: 340,
  base: 340,
  items: [
    ...family(262, [[400, 'green-700'], [326, 'sage-700']], 250, 363),
    ...family(78, [[170, 'sage-700']], 112),
  ],
};

/** The oversize "1st" card: one family bleeding off its right edge. */
export const cardNest: Scene = {
  width: 520,
  height: 440,
  base: 440,
  items: family(330, [[520, 'green-700'], [420, 'sage-700']], 320, 470),
};

/** Two roofs side by side read as the letter M (M1). */
export const pullPair: Scene = {
  width: 560,
  height: 400,
  base: 400,
  items: [
    { type: 'house', cx: 380, w: 470, fill: 'sage-300', solid: true },
    { type: 'house', cx: 170, w: 250, fill: 'green', solid: true, windows: true },
    { type: 'house', cx: 420, w: 330, fill: 'green-700', solid: true, windows: true },
  ],
};

/** The photo slot's placeholder: a facade in layered tonal planes, cropped square. */
export const slotArt: Scene = {
  width: 520,
  height: 520,
  base: 466,
  items: [
    { type: 'house', cx: 70, w: 330, fill: 'sage-300', interior: 'green-100' },
    { type: 'line', cx: 280, w: 440, stroke: 'gold', width: 8 },
    { type: 'house', cx: 280, w: 390, fill: 'green', interior: 'green-700', windows: true },
  ],
};
