/**
 * Roof geometry for the site's flat art (brand M1, M3). Every roof is built at the logo's slope:
 * the full house in brand/logo/mark.svg rises 70.9 over a run of 77.1, about 42.6 degrees.
 * Everything here returns SVG path data in the units of the SVG it is drawn into.
 */
const SLOPE = 70.9 / 77.1;

/** Cosine of the roof angle: converts a thickness measured at right angles to a vertical one. */
const COS = 1 / Math.sqrt(1 + SLOPE * SLOPE);

type Point = readonly [number, number];

const round = (n: number) => Math.round(n * 10) / 10;
const toPath = (points: Point[]) => `M${points.map(([x, y]) => `${round(x)} ${round(y)}`).join('L')}Z`;

export interface HouseSpec {
  /** Horizontal axis of the roof. */
  cx: number;
  apexY: number;
  eavesY: number;
  /** Where the walls stop, usually past the bottom edge of the art. */
  bottomY: number;
}

/** Half the width of a house: from its axis to an outer wall. */
const halfSpan = (apexY: number, eavesY: number) => (eavesY - apexY) / SLOPE;

/** A house silhouette: two roof edges meeting at a peak, then straight walls. */
export function house({ cx, apexY, eavesY, bottomY }: HouseSpec): string {
  const half = halfSpan(apexY, eavesY);
  return toPath([
    [cx - half, bottomY],
    [cx - half, eavesY],
    [cx, apexY],
    [cx + half, eavesY],
    [cx + half, bottomY],
  ]);
}

interface BandSpec {
  cx: number;
  /** Top of the band's outer edge, at the peak. */
  apexY: number;
  /** Horizontal reach of each arm from the axis. Past the art's edge, the band bleeds off. */
  half: number;
  /** Thickness measured at right angles to the slope. */
  thickness: number;
}

/**
 * A roof band: a chevron of constant thickness, its ends cut square to the slope as on the
 * logo's left roof bar.
 */
function roofBand({ cx, apexY, half, thickness }: BandSpec): string {
  const rise = thickness / COS;
  const inX = thickness * SLOPE * COS;
  const inY = thickness * COS;
  const endY = apexY + half * SLOPE;
  return toPath([
    [cx - half, endY],
    [cx, apexY],
    [cx + half, endY],
    [cx + half - inX, endY + inY],
    [cx, apexY + rise],
    [cx - half + inX, endY + inY],
  ]);
}

/** A band that follows a house's roof at a gap, overhanging the eaves a little. */
export function roofLine(h: HouseSpec, gap: number, thickness: number, overhang: number): string {
  const half = halfSpan(h.apexY, h.eavesY) + overhang;
  return roofBand({ cx: h.cx, apexY: h.apexY - (gap + thickness) / COS, half, thickness });
}

interface StackLayer {
  /** Thickness at right angles to the slope. */
  thickness: number;
  className: string;
}

/**
 * Nested roof bands that share one peak, outermost first, each starting where the last one
 * ends. Used for the layered tonal planes behind the art. Arms run far past any edge.
 */
export function roofStack(cx: number, apexY: number, layers: StackLayer[], reach = 2400) {
  let top = apexY;
  return layers.map(({ thickness, className }) => {
    const d = roofBand({ cx, apexY: top, half: reach, thickness });
    top += thickness / COS;
    return { d, className };
  });
}

/**
 * The mark's window: four equal squares with a gap of 0.42 of a square (logo/mark.svg), as one
 * path. `size` is the side of one square; `cx` and `top` place the block.
 */
export function windowGrid({ cx, top, size }: { cx: number; top: number; size: number }): string {
  const gap = size * 0.42;
  const left = cx - size - gap / 2;
  const square = (x: number, y: number): Point[] => [
    [x, y],
    [x + size, y],
    [x + size, y + size],
    [x, y + size],
  ];
  return [0, 1]
    .flatMap((row) =>
      [0, 1].map((col) => toPath(square(left + col * (size + gap), top + row * (size + gap)))),
    )
    .join('');
}

/**
 * One outlined roof with a small window, for the tone-on-tone pattern (brand M2): a house 52
 * wide, its roof at the logo's slope, its window a tenth of the width. `x` and `y` place its
 * top-left corner in a 64 by 48 cell.
 */
export function outlineRoof(x: number, y: number): string {
  const half = 26;
  const eaves = 26;
  const apex = eaves - half * SLOPE;
  const cx = x + 32;
  return [
    `M${round(cx - half)} ${round(y + 44)}V${round(y + eaves)}L${round(cx)} ${round(y + apex)}L${round(cx + half)} ${round(y + eaves)}V${round(y + 44)}Z`,
    `M${round(cx - 5)} ${round(y + 30)}h10v10h-10Z`,
  ].join('');
}
