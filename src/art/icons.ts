/**
 * Brand icons as raw SVG, read from brand/icons in place (brand I11): the supplied files stay
 * the source, nothing is copied or redrawn.
 */
const line = import.meta.glob('../../brand/icons/line/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const pictogram = import.meta.glob('../../brand/icons/pictogram/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export type IconFamily = 'line' | 'pictogram';

export function iconRaw(family: IconFamily, name: string): string {
  const source = family === 'line' ? line : pictogram;
  const raw = source[`../../brand/icons/${family}/${name}.svg`];
  if (!raw) throw new Error(`Unknown brand icon: ${family}/${name}`);
  return raw;
}

/** The icon with its own width and height removed, so CSS sizes it and `currentColor` colours it. */
export function iconMarkup(family: IconFamily, name: string): string {
  return iconRaw(family, name).replace(/ width="[\d.]+" height="[\d.]+"/, '');
}

interface Placement {
  x: number;
  y: number;
  /** Width in the parent SVG's units. The height follows the icon's own ratio. */
  width: number;
  className?: string;
}

/**
 * The icon as a nested <svg> at a position and size inside another SVG. The stroke scales with
 * the icon (brand I3), and `currentColor` comes from the class.
 */
export function iconAt(family: IconFamily, name: string, { x, y, width, className }: Placement): string {
  const raw = iconRaw(family, name);
  const tag = /<svg\b[^>]*>/.exec(raw)?.[0] ?? '';
  const box = /viewBox="[\d.]+ [\d.]+ ([\d.]+) ([\d.]+)"/.exec(tag);
  const ratio = box ? Number(box[2]) / Number(box[1]) : 1;
  const height = Math.round(width * ratio * 10) / 10;
  const stripped = tag.replace(/ (width|height)="[\d.]+"/g, '');
  const placed = stripped.replace(
    '<svg',
    `<svg x="${x}" y="${y}" width="${width}" height="${height}"${className ? ` class="${className}"` : ''}`,
  );
  return raw.replace(tag, placed);
}
