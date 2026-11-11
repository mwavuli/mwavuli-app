/**
 * Brand icons, read from brand/icons/ in place (brand I11): inlined so `currentColor`
 * works. The files declare a fixed width and height; they are dropped here so the
 * viewBox carries the ratio and CSS sets the size.
 */
const files = import.meta.glob<string>('../../brand/icons/**/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
});

/** `name` is the path under brand/icons/ without the extension, e.g. `line/arrow-right`. */
export function icon(name: string): string {
  const svg = files[`../../brand/icons/${name}.svg`];
  if (!svg) throw new Error(`Unknown brand icon: ${name}`);
  return svg.replace(/ width="\d+" height="\d+"/, '');
}
