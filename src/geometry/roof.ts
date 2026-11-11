/**
 * Geometry for the page's flat roof-form compositions (brand M1 and M3): straight edges at
 * the logo's slope, about 43 degrees, in solid planes and bands that run off the edges of
 * the section they sit in.
 *
 * Every edge rises to the right ("/") and is named by the x where it crosses the bottom edge
 * of the art. A mirrored edge ("\") is the same edge read from the other side.
 */

/** The logo's roof slope: tan 43 degrees. */
export const SLOPE = Math.tan((43 * Math.PI) / 180);

const fixed = (n: number) => n.toFixed(1);

/**
 * A band between two rising edges that cross the bottom edge (y = height) at x1 and x2. The
 * band runs up to the top edge (y = 0) and is cut off there and at the sides by the art's
 * viewBox. The width at the bottom edge is x2 - x1.
 */
export function band(x1: number, x2: number, height: number): string {
  const run = height / SLOPE;
  return [
    [x1, height],
    [x2, height],
    [x2 + run, 0],
    [x1 + run, 0],
  ]
    .map(([x, y]) => `${fixed(x)},${fixed(y)}`)
    .join(' ');
}

/**
 * A gable: two edges meeting at a peak, with the body below them filled down to the bottom
 * of the art. `apexX` and `apexY` place the peak; the edges run past the sides so the roof is
 * cut off by the art's viewBox.
 */
export function gable(apexX: number, apexY: number, width: number, height: number): string {
  const half = width / 2;
  const eave = apexY + half * SLOPE;
  return [
    [apexX, apexY],
    [apexX + half, eave],
    [apexX + half, height],
    [apexX - half, height],
    [apexX - half, eave],
  ]
    .map(([x, y]) => `${fixed(x)},${fixed(y)}`)
    .join(' ');
}

/** The roof edge of a gable as a polyline, for a band that follows it. */
export function ridge(apexX: number, apexY: number, width: number): string {
  const half = width / 2;
  const eave = apexY + half * SLOPE;
  return [
    [apexX - half, eave],
    [apexX, apexY],
    [apexX + half, eave],
  ]
    .map(([x, y]) => `${fixed(x)},${fixed(y)}`)
    .join(' ');
}
