/**
 * The roof form at the logo's master geometry (brand L2 and M1).
 *
 * Units are the mark's own. The full house is 154.2 wide and 126.5 high. The wall is 30.6 thick
 * (one fifth of the width), the roof rises at about 43 degrees (70.9 over 77.1), and the window is
 * four squares of 15.6, centred on the axis. Every roof on the page is drawn from these numbers.
 */
export const HOUSE_W = 154.2;
export const HOUSE_H = 126.5;

/** Rise over run of the roof: about 42.6 degrees. */
export const SLOPE = 70.9 / 77.1;

/** Roof bars and two walls, as in the mark. */
export const HOLLOW =
  'M0 126.5L0 70.9L77.1 0L154.2 70.9L154.2 126.5L123.6 126.5L123.6 81.7L77.1 39L30.6 81.7L30.6 126.5Z';

/** The same outline filled in. */
export const SOLID = 'M0 126.5L0 70.9L77.1 0L154.2 70.9L154.2 126.5Z';

/** What the roof bars and walls enclose. */
export const INTERIOR = 'M30.6 126.5L30.6 81.7L77.1 39L123.6 81.7L123.6 126.5Z';

/** One window square, and the four cells of the window grid. */
export const SQUARE = 15.6;
export const WINDOW_CELLS: ReadonlyArray<readonly [number, number]> = [
  [58.1, 79.8],
  [80.5, 79.8],
  [58.1, 101.8],
  [80.5, 101.8],
];

/** Transform that puts a house of width `w`, centred on `cx`, on the line `base`. */
export function place(cx: number, w: number, base: number): string {
  const s = w / HOUSE_W;
  const x = cx - w / 2;
  const y = base - HOUSE_H * s;
  return `translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${s.toFixed(4)})`;
}

/** The outline of a house, for a line of constant width at the same slope. */
export function outline(cx: number, w: number, base: number): string {
  const s = w / HOUSE_W;
  const left = cx - w / 2;
  const right = cx + w / 2;
  const eave = base - (HOUSE_H - 70.9) * s;
  const apex = base - HOUSE_H * s;
  return `M${left.toFixed(2)} ${base}L${left.toFixed(2)} ${eave.toFixed(2)}L${cx} ${apex.toFixed(2)}L${right.toFixed(2)} ${eave.toFixed(2)}L${right.toFixed(2)} ${base}`;
}

/** A band of constant width laid along one roof slope, a gold band in the board's motif (M3). */
export function slopeBand(
  side: 'left' | 'right',
  offset: number,
  thick: number,
  from: number,
  to: number,
): string {
  const theta = Math.atan2(70.9, 77.1);
  const ux = Math.cos(theta);
  const uy = -Math.sin(theta);
  const nx = Math.sin(theta);
  const ny = Math.cos(theta);
  const at = (t: number, o: number): [number, number] => {
    const x = t * ux + o * nx;
    const y = 70.9 + t * uy + o * ny;
    return [side === 'left' ? x : HOUSE_W - x, y];
  };
  const pts = [at(from, offset), at(to, offset), at(to, offset + thick), at(from, offset + thick)];
  return `M${pts.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join('L')}Z`;
}
