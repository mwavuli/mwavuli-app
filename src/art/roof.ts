/**
 * Roof-form geometry for the site's art (brand M1 and M3). Every edge in the hero art, the
 * corner flag and the roof pattern runs at the logo's slope, about 43 degrees, so the shapes
 * are built here from that one number and never drawn by hand.
 */

/** The logo's roof slope (brand M1, L2). */
export const ROOF_DEG = 43;

const RAD = (ROOF_DEG * Math.PI) / 180;

/** Rise per unit of run. */
export const SLOPE = Math.tan(RAD);

const COS = Math.cos(RAD);

type Point = readonly [number, number];

const points = (list: Point[]): string =>
  list.map(([x, y]) => `${Math.round(x * 10) / 10},${Math.round(y * 10) / 10}`).join(' ');

/** Height of a roof's leg at `x`, for a peak at (ax, ay). */
export const legY = (ax: number, ay: number, x: number): number => ay + SLOPE * Math.abs(x - ax);

/** A vertical distance for a thickness measured at right angles to the legs. */
export const rise = (perpendicular: number): number => perpendicular / COS;

/** A solid roof: everything under two legs that meet at (ax, ay), cut square at xl and xr. */
export function roof(ax: number, ay: number, bottom: number, xl: number, xr: number): string {
  return points([
    [xl, bottom],
    [xl, legY(ax, ay, xl)],
    [ax, ay],
    [xr, legY(ax, ay, xr)],
    [xr, bottom],
  ]);
}

/**
 * A roof band: two legs that meet at (ax, ay), `p` thick at right angles to the legs, cut square
 * at xl and xr (the way the logo's roof bar is cut square at its upper end).
 */
export function band(ax: number, ay: number, p: number, xl: number, xr: number): string {
  const t = rise(p);
  const top: Point[] = [[xl, legY(ax, ay, xl)], [ax, ay], [xr, legY(ax, ay, xr)]];
  const under: Point[] = [[xr, legY(ax, ay, xr) + t], [ax, ay + t], [xl, legY(ax, ay, xl) + t]];
  return points([...top, ...under]);
}

/**
 * A corner flag: nested right triangles that share the top-right corner of the viewBox, each with
 * a horizontal leg of `w` and a vertical leg at the roof slope. `w` is the horizontal leg.
 */
export function flag(w: number, size: number): string {
  return points([[size, 0], [size - w, 0], [size, w * SLOPE]]);
}

/** A rectangle as polygon points, for window grids. */
export function box(x: number, y: number, w: number, h: number): string {
  return points([[x, y], [x + w, y], [x + w, y + h], [x, y + h]]);
}

/** The mark's window: four equal squares, a gap of about 40 percent of a square between them. */
export function windowGrid(
  cx: number,
  top: number,
  square: number,
  cols = 2,
  rows = 2,
  gap = square * 0.4,
): string[] {
  const width = cols * square + (cols - 1) * gap;
  const out: string[] = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      out.push(box(cx - width / 2 + c * (square + gap), top + r * (square + gap), square, square));
    }
  }
  return out;
}
