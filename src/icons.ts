/**
 * The favicon fallbacks, rendered from the brand's app icon when the site is built (brand G3: a platform that
 * needs a fixed filename or format gets a generated file, never a copy). The tile and the mark come from
 * brand/logo/app-icon.svg, so they cannot drift from the brand.
 */
import sharp from 'sharp';
import appIcon from '../brand/logo/app-icon.svg?raw';

const source = Buffer.from(appIcon);

// The tile's colour, read from the file so a full-bleed ground always matches it.
function tileFill(svg: string): string {
  const fill = /fill="(#[0-9a-f]{6})"/i.exec(svg)?.[1];
  if (!fill) throw new Error('brand/logo/app-icon.svg has no tile fill to build the icons from.');
  return fill;
}
const tileColour = tileFill(appIcon);

/** The app icon at `size` px, its rounded corners transparent, as the brand draws it (brand L7). */
const tile = (size: number): Promise<Buffer> => sharp(source).resize(size, size).png().toBuffer();

/**
 * The iOS home-screen icon, 180 px. iOS rounds the icon itself and paints transparency black, so the tile
 * sits on a full-bleed square of its own colour, with the mark unchanged at 59 percent of the width
 * (brand L7, "Bend when").
 */
export async function appleTouchIcon(): Promise<Buffer> {
  const size = 180;
  return sharp({ create: { width: size, height: size, channels: 3, background: tileColour } })
    .composite([{ input: await tile(size) }])
    .removeAlpha()
    .png()
    .toBuffer();
}

// Both sizes are above the 24 px minimum for the mark alone (brand L5); 48 px is the multiple Google asks for.
const ICO_SIZES = [32, 48] as const;

/** favicon.ico: the tile at each size in ICO_SIZES, every image stored as a PNG (ICO has allowed that since Vista). */
export async function faviconIco(): Promise<Buffer> {
  const images = await Promise.all(ICO_SIZES.map(tile));

  const header = Buffer.alloc(6 + 16 * images.length);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  let offset = header.length;
  images.forEach((image, index) => {
    const entry = 6 + 16 * index;
    header.writeUInt8(ICO_SIZES[index] ?? 0, entry); // width
    header.writeUInt8(ICO_SIZES[index] ?? 0, entry + 1); // height
    header.writeUInt16LE(1, entry + 4); // colour planes
    header.writeUInt16LE(32, entry + 6); // bits per pixel
    header.writeUInt32LE(image.length, entry + 8); // image size in bytes
    header.writeUInt32LE(offset, entry + 12); // image offset from the start of the file
    offset += image.length;
  });

  return Buffer.concat([header, ...images]);
}
