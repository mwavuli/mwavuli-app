/**
 * Roof-form geometry (brand M1, M3). Every band, plane and roofline on the site is built from the
 * logo's slope, about 43 degrees (brand L2), so edges meet at the same angle everywhere.
 *
 * All shapes are flat polygons in SVG user units (px). Bands run far past the drawing; the
 * element that holds the SVG clips them, which is how they bleed off the edge (M3).
 */

/** Rise over run of the logo's roof bars: tan 43 degrees. */
export const ROOF_SLOPE = Math.tan((43 * Math.PI) / 180);

const REACH = 4000;
const DEPTH = 12000;

type Point = readonly [number, number];

const toPoints = (points: readonly Point[]): string =>
  points.map(([x, y]) => `${Math.round(x * 10) / 10},${Math.round(y * 10) / 10}`).join(' ');

/**
 * An inverted-V band, a roof seen end on: apex at (cx, cy), both arms falling at the roof slope,
 * `thickness` measured straight down.
 */
export function chevron(cx: number, cy: number, thickness: number): string {
  const fall = ROOF_SLOPE * REACH;
  return toPoints([
    [cx - REACH, cy + fall],
    [cx, cy],
    [cx + REACH, cy + fall],
    [cx + REACH, cy + fall + thickness],
    [cx, cy + thickness],
    [cx - REACH, cy + fall + thickness],
  ]);
}

/** Everything under an inverted V with its apex at (cx, cy): a flat tonal plane below a roof. */
export function plane(cx: number, cy: number): string {
  const fall = ROOF_SLOPE * REACH;
  return toPoints([
    [cx - REACH, cy + fall],
    [cx, cy],
    [cx + REACH, cy + fall],
    [cx + REACH, cy + DEPTH],
    [cx - REACH, cy + DEPTH],
  ]);
}

/**
 * A row of `count` roofs side by side, each `span` wide and resting on the line y = height. Two
 * roofs read as the letter M (brand M1).
 */
export function roofline(count: number, span: number) {
  const height = (span / 2) * ROOF_SLOPE;
  const points: Point[] = [[0, height]];
  for (let i = 0; i < count; i += 1) {
    points.push([i * span + span / 2, 0], [(i + 1) * span, height]);
  }
  return { points: toPoints(points), width: count * span, height };
}
