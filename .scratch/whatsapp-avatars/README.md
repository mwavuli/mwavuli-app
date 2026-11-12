# WhatsApp group avatars

The app logo in a colourway per internal WhatsApp group (MVL-28). Working files, not brand assets: a set the owner
adopts becomes a decision in `brand/` (G5), recorded there.

![Preview](preview.png)

## Upload

Each file in `png/` is a 640 by 640 square; WhatsApp keeps group pictures at 640 px, so a larger file gains nothing.
WhatsApp shows it as a circle, and the ground runs full-bleed so the crop never shows a corner. Set it from the group's
info by tapping the group picture, and keep the whole square when WhatsApp offers a crop.

| Group   | Solid (recommended)   | Roof                       | Ground     | Mark  | Mark contrast |
|---------|-----------------------|----------------------------|------------|-------|---------------|
| General | `mwavuli-general.png` | `mwavuli-general-roof.png` | Green      | Gold  | 4.08 to 1     |
| Finance | `mwavuli-finance.png` | `mwavuli-finance-roof.png` | Gold       | Green | 4.08 to 1     |
| Ops     | `mwavuli-ops.png`     | `mwavuli-ops-roof.png`     | Slate      | Gold  | 5.24 to 1     |
| Support | `mwavuli-support.png` | `mwavuli-support-roof.png` | Mist Cream | Green | 8.84 to 1     |

Each group takes the core colour whose role fits it (C2): Green, primary and trust, for the whole company; Gold,
value, for money; Slate, structure, for operations; Mist Cream, clarity, for support. General and Ops are the closest
pair, both dark and told apart by hue; in WhatsApp's dark mode the roof treatment separates them further.

- **Solid** is the app icon's geometry: the mark at 59 percent, placed exactly as in `brand/logo/app-icon.svg`.
- **Roof** adds one giant roof line behind the mark at the mark's own slope, apex on the axis, parallel to the mark's
  roofs and outside its clear space (L4). The ground stays the house; the sky above takes one ramp step (C5). In
  WhatsApp's dark mode the General sky nearly meets the background, so the avatar reads as a house.
- **Alternates** (`mwavuli-alt-*.png`): Mist Cream with the gold mark (the primary pairing, 2.17 to 1, faint at chat
  size), Green with the white mark (9.82 to 1), and Sage with the green mark (3.19 to 1).

## Brand decisions for the owner

- **Full-bleed square.** L7's "bend when" covers a platform that applies its own mask; the mark keeps 59 percent.
- **Ops on Slate.** Gold on Slate is a computed pair (C3), but Slate is not one of L6's default grounds.
- **Support's green mark on Mist Cream.** L3 keeps the all-green mark for one-colour jobs; the primary pairing, the
  gold mark, is the cream-gold alternate.

## Rebuild

```bash
node .scratch/whatsapp-avatars/build.mjs
```

Colours come from `brand/tokens/mwavuli.tokens.json` and the mark from `brand/logo/app-icon.svg`. To add a group or
change a colourway, edit `groups` or `colourways` in `build.mjs`. Rendering uses the Playwright in
`~/.claude/tools/browser`; point `BROWSER_TOOLS` elsewhere to use another install.
