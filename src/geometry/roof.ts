/**
 * Roof-form geometry (brand M1, M3, L2).
 *
 * Every edge in the site's roof art runs at the logo's slope of about 43 degrees, so peaks, bars
 * and bands drawn by different components always agree. Coordinates are SVG user units, y down.
 */
export const SLOPE_DEG = 43;

const RAD = (SLOPE_DEG * Math.PI) / 180;
export const COS = Math.cos(RAD);
export const SIN = Math.sin(RAD);
/** Rise over run of a roof plane. */
export const RISE = Math.tan(RAD);

export type Point = readonly [number, number];

const round = (value: number) => Number(value.toFixed(1));

/** The `points` value of an SVG polygon. */
export function points(list: readonly Point[]): string {
  return list.map(([x, y]) => `${round(x)},${round(y)}`).join(' ');
}

/** The left eave of a gable: where its left roof plane meets the wall. */
export function eave(apex: Point, half: number): Point {
  return [apex[0] - half, apex[1] + half * RISE];
}

/** A gable: two roof planes meeting at `apex`, walls down to `bottom`. `half` is half its width. */
export function gable(apex: Point, half: number, bottom: number): Point[] {
  const eaveY = apex[1] + half * RISE;
  return [
    [apex[0] - half, eaveY],
    apex,
    [apex[0] + half, eaveY],
    [apex[0] + half, bottom],
    [apex[0] - half, bottom],
  ];
}

/**
 * A bar that runs parallel to a roof plane through `origin`, with square ends. A `rising` plane
 * climbs to the right and a `falling` plane descends to it. `run` is the start and end along the
 * plane (positive runs to the right), `gap` the distance from the plane out into the air above it
 * and `thick` the bar's thickness, both measured at right angles to the plane.
 */
export function bar(
  origin: Point,
  run: readonly [number, number],
  gap: number,
  thick: number,
  plane: 'rising' | 'falling' = 'rising',
): Point[] {
  const along: Point = plane === 'rising' ? [COS, -SIN] : [COS, SIN];
  const out: Point = plane === 'rising' ? [-SIN, -COS] : [SIN, -COS];
  const at = (s: number, o: number): Point => [
    origin[0] + s * along[0] + o * out[0],
    origin[1] + s * along[1] + o * out[1],
  ];
  return [at(run[0], gap), at(run[1], gap), at(run[1], gap + thick), at(run[0], gap + thick)];
}

/**
 * The mark's window (L2): four equal squares centred on `cx`. Each square is one tenth of the
 * house's width and the gap between squares is four percent of it.
 */
export function windowGrid(cx: number, top: number, houseWidth: number) {
  const side = houseWidth / 10;
  const gap = houseWidth * 0.04;
  const left = cx - side - gap / 2;
  const col = [left, left + side + gap];
  const row = [top, top + side + gap];
  return row.flatMap((y) => col.map((x) => ({ x: round(x), y: round(y), side: round(side) })));
}
