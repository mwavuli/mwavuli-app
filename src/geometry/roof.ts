/**
 * Roof-form geometry for the flat bands and planes of the art (brand M1, M3).
 * Every edge runs at the logo's slope, 43 degrees, so nothing here is eyeballed.
 * Coordinates are SVG user units, y down.
 */
const SLOPE = (43 * Math.PI) / 180;
const SIN = Math.sin(SLOPE);
const COS = Math.cos(SLOPE);

/** Rise over run of the roof slope, about 0.93. */
export const TAN = Math.tan(SLOPE);

export type Point = readonly [number, number];

/** SVG `points` attribute for a polygon. */
export function points(list: readonly Point[]): string {
  return list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
}

/** The way a bar runs from its square-cut end. */
export type Run = 'down-left' | 'down-right';

export interface Stripe {
  /** Name of the tone, mapped to a fill class by the component. */
  tone: string;
  /** Thickness measured at right angles to the bar. */
  thickness: number;
  /** Space between the previous stripe and this one, measured the same way. */
  gap?: number;
}

/**
 * A bundle of parallel bars at the roof slope. They share one square-cut end line, which
 * starts at `origin` (the outer corner) and steps toward the inside of the composition, and
 * they run `length` units away from it, far enough to bleed off the edge of the art.
 */
export function bundle(
  origin: Point,
  run: Run,
  length: number,
  stripes: readonly Stripe[],
): { tone: string; points: string }[] {
  const along: Point = run === 'down-left' ? [-COS, SIN] : [COS, SIN];
  const across: Point = run === 'down-left' ? [SIN, COS] : [-SIN, COS];
  let offset = 0;
  return stripes.map(({ tone, thickness, gap = 0 }) => {
    offset += gap;
    const a: Point = [origin[0] + across[0] * offset, origin[1] + across[1] * offset];
    const b: Point = [a[0] + across[0] * thickness, a[1] + across[1] * thickness];
    const c: Point = [b[0] + along[0] * length, b[1] + along[1] * length];
    const d: Point = [a[0] + along[0] * length, a[1] + along[1] * length];
    offset += thickness;
    return { tone, points: points([a, b, c, d]) };
  });
}

/** A pitched roof band (two bars meeting at a peak). `thickness` is measured at right angles to the slope. */
export function roofBand(cx: number, apexY: number, thickness: number, reach: number): string {
  const drop = reach * TAN;
  const v = thickness / COS;
  return points([
    [cx - reach, apexY + drop],
    [cx, apexY],
    [cx + reach, apexY + drop],
    [cx + reach, apexY + drop + v],
    [cx, apexY + v],
    [cx - reach, apexY + drop + v],
  ]);
}

/** A solid roof plane: a triangle with its peak at (cx, apexY) and its base on `baseY`. */
export function gable(cx: number, apexY: number, baseY: number): string {
  const half = (baseY - apexY) / TAN;
  return points([
    [cx - half, baseY],
    [cx, apexY],
    [cx + half, baseY],
  ]);
}

/**
 * The mark's window grid: four equal squares, with the gap at 0.4 of a square (the logo's
 * 4 percent gap over a 10 percent square). `x` and `y` are the top-left corner.
 */
export function windowGrid(x: number, y: number, size: number): { x: number; y: number; size: number }[] {
  const step = size * 1.4;
  return [
    { x, y, size },
    { x: x + step, y, size },
    { x, y: y + step, size },
    { x: x + step, y: y + step, size },
  ];
}
