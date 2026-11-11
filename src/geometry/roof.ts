/**
 * Roof-form geometry (brand M1): two straight edges meeting at a peak, at the logo's slope
 * of about 43 degrees. The helpers return SVG `points` strings and squares in a viewBox's
 * own units.
 */

const SLOPE_DEGREES = 43;
const RAD = (SLOPE_DEGREES * Math.PI) / 180;

/** Rise per unit of run. */
export const SLOPE = Math.tan(RAD);

type Point = readonly [number, number];

const toPoints = (points: readonly Point[]): string =>
  points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

/** A chevron band: two roof slopes meeting at a peak, `thickness` tall measured vertically. */
export function chevron(peakX: number, peakY: number, run: number, thickness: number): string {
  const rise = run * SLOPE;
  return toPoints([
    [peakX - run, peakY + rise],
    [peakX, peakY],
    [peakX + run, peakY + rise],
    [peakX + run, peakY + rise + thickness],
    [peakX, peakY + thickness],
    [peakX - run, peakY + rise + thickness],
  ]);
}

/**
 * A bar that runs parallel to one slope of `chevron(peakX, peakY, run, …)`, standing `gap`
 * off its outer edge, `thickness` wide and `length` long, cut square at both ends. `from` is
 * how far along the slope, from the eave, the bar starts.
 */
export function slopeBar(
  peakX: number,
  peakY: number,
  run: number,
  gap: number,
  thickness: number,
  from: number,
  length: number,
  side: 'left' | 'right' = 'left',
): string {
  const sign = side === 'left' ? -1 : 1;
  const eave: Point = [peakX + sign * run, peakY + run * SLOPE];
  const along: Point = [-sign * Math.cos(RAD), -Math.sin(RAD)];
  const away: Point = [sign * Math.sin(RAD), -Math.cos(RAD)];
  const start: Point = [
    eave[0] + along[0] * from + away[0] * gap,
    eave[1] + along[1] * from + away[1] * gap,
  ];
  const end: Point = [start[0] + along[0] * length, start[1] + along[1] * length];
  return toPoints([
    start,
    end,
    [end[0] + away[0] * thickness, end[1] + away[1] * thickness],
    [start[0] + away[0] * thickness, start[1] + away[1] * thickness],
  ]);
}

export interface Square {
  x: number;
  y: number;
  size: number;
}

/**
 * The mark's window (brand L2): four equal squares, two by two. The gap between squares is
 * 0.4 of a square, as in the mark.
 */
export function windowGrid(x: number, y: number, size: number): Square[] {
  const step = size * 1.4;
  return [
    { x, y, size },
    { x: x + step, y, size },
    { x, y: y + step, size },
    { x: x + step, y: y + step, size },
  ];
}
