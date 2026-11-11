# 02 · Logo

The logo system: which lockups exist, how they are built, where they may sit and what they must never do. The artwork is
in [`logo/`](logo/); a preview is in [`preview/logo-kit.png`](preview/logo-kit.png).

## Lockups and construction

### L1 · Lockups

*Strength: Always · Source: Board, Card*

**Rules**

- **Always** use one of the supplied files. Do not rebuild or retype a lockup. _(Proposed)_
- **Always** use the stacked lockup (gold roof mark above the green wordmark and descriptor) as the primary logo on
  light grounds. The board calls it "Primary (Light)". _(Board)_
- **Always** use the reversed lockup on green. The board calls it "Dark / Reversed". _(Board)_
- **Default** to the horizontal lockup where height is tight (page headers, the card back). _(Card)_
- **Always** use the mark alone only where the name is already present or the space is under the stacked minimum, such
  as the app icon and favicons. _(Board)_

| ID   | File                                | Lockup                             | Use                           |
|------|-------------------------------------|------------------------------------|-------------------------------|
| LG01 | `logo/logo-primary.svg`             | Stacked, gold mark, green wordmark | Cream or white grounds        |
| LG02 | `logo/logo-reversed.svg`            | Stacked, gold mark, white wordmark | Green grounds                 |
| LG03 | `logo/logo-mono-white.svg`          | Stacked, all white                 | Green, photographs with scrim |
| LG04 | `logo/logo-mono-green.svg`          | Stacked, all green                 | One-color jobs, gold grounds  |
| LG05 | `logo/logo-horizontal.svg`          | Horizontal, gold and green         | Headers, tight heights        |
| LG06 | `logo/logo-horizontal-reversed.svg` | Horizontal, gold and white         | Footers, card back            |
| LG07 | `logo/mark.svg`                     | Roof mark, gold                    | Where the name is present     |
| LG08 | `logo/mark-green.svg`               | Roof mark, green                   | Gold grounds, one color       |
| LG09 | `logo/mark-white.svg`               | Roof mark, white                   | Green grounds, one color      |
| LG10 | `logo/app-icon.svg`                 | Gold tile, green mark              | App stores, favicons          |

**Why** The board shows three logo states: primary, reversed and icon. The card adds a horizontal arrangement that keeps
the same parts.

**Example** Site header on cream: `logo-horizontal`. Footer on green: `logo-horizontal-reversed`. Browser tab and
home-screen icon: `app-icon`.

**Bend when** A one-color process (embossing, laser engraving, stamps) needs a single ink: use `logo-mono-green` or
`logo-mono-white`.

**Prior art** Primary, reversed, horizontal and icon are the usual states in published brand kits.

### L2 · Master geometry

*Strength: Always · Source: Card*

**Rules**

- **Always** build the mark from two roof forms of the same slope, about 43 degrees: a left half-house (a wall and a
  roof bar cut square at its upper end) and a full house with a pitched roof. _(Board, Card)_
- **Always** keep the wall thickness at one fifth of the full house's width. The roof bars have the same thickness
  measured at right angles. _(Card)_
- **Always** put a window of four equal squares in the full house, centered on its axis. Each square is one tenth of the
  house's width, and the gap between squares is about four percent of that width. _(Board, Card)_
- **Always** keep the mark at 1.68 to 1 (width to height), and the stacked lockup at 1.66 to 1. _(Card)_
- **Always** set the wordmark in Montserrat at a weight of 750 (between Bold and ExtraBold), converted to outlines. Set
  the descriptor in Montserrat capitals, centered under the wordmark: Bold with about 0.18 em of letter-spacing in the
  stacked lockup, weight 650 with about 0.3 em in the horizontal lockup. _(Card)_
- **Never** redraw, trace or re-measure the mark from a printout or screenshot. Regenerate from the SVG. _(Proposed)_

**Why** The mark doubles as the roof motif (M1) and as the letter "M" for Mwavuli: two roof peaks read as two humps.
Stating the proportions lets a signmaker or embroiderer rebuild it without guessing.

**Example** A full house 154 units wide has walls 31 units thick and window squares 15.5 units on a side, with a gap of
7 units between them.

**Bend when** Never for the proportions. A physical process that cannot hold the thin gap between the two roofs
(embroidery under 20 mm wide) may enlarge the gap, not move the roofs closer.

**Prior art** Construction grids appear in most published brand books; the unit here is the house width.

**Note** The printed business card back uses an earlier measurement of the mark with a wider arch. The proportions above
come from the front of the card. Align the back at the next reprint (decision D5).

### L3 · Colorways

*Strength: Always · Source: Board*

**Rules**

- **Always** use the gold roof mark with a green wordmark on cream or white. _(Board)_
- **Always** use the gold roof mark with a white wordmark on green. _(Board, Card)_
- **Always** use the all-white or all-green versions only for one-color jobs and for photographs. _(Proposed)_
- **Never** recolor outside these four pairings; in particular, never use a gold wordmark. _(Proposed)_

| Pairing    | Mark  | Wordmark and descriptor | Ground                     |
|------------|-------|-------------------------|----------------------------|
| Primary    | Gold  | Green                   | Cream, white               |
| Reversed   | Gold  | White                   | Green                      |
| Mono white | White | White                   | Green, photographs (scrim) |
| Mono green | Green | Green                   | Cream, white, gold         |

**Why** Gold carries the accent and green the name. A gold wordmark would fall to 2.17 to 1 on cream, below legibility
for a name.

**Example** Polo shirt chest: reversed lockup on dark green fabric. Contract header: primary lockup on white.

**Bend when** A legal mark or partner co-branding requires black: use Slate (`#2F3437`) in place of black.

**Prior art** WCAG exempts logotypes from contrast minimums (SC 1.4.3), so the rule here is about legibility, not
compliance.

## Placement and size

### L4 · Clear space

*Strength: Default · Source: Proposed*

**Rules**

- **Default** to a clear space on all sides of at least one eighth of the lockup's width. For the stacked lockup that is
  about the x-height of the wordmark. _(Proposed)_
- **Always** measure clear space from the outermost ink of the lockup, not from the file's edge. The files are cropped
  tight. _(Proposed)_
- **Avoid** placing text or edges inside the clear space; photographs may run behind it if a scrim keeps the lockup
  legible. _(Proposed)_

**Why** A fraction of the lockup scales to any size without a diagram, and the files carry no built-in margin.

**Example** A stacked lockup 40 mm wide needs 5 mm clear on every side. A horizontal lockup 200 px wide needs 25 px.

**Bend when** A business card edge or a favicon canvas forces less: keep at least the printing safe margin (S6).

**Prior art** Clear space as a fraction of the logo's width or the height of one letter is the common convention in
published brand guides.

### L5 · Minimum size

*Strength: Default · Source: Proposed*

**Rules**

- **Default** to these minimum widths: stacked 25 mm in print and 140 px on screen; horizontal 30 mm and 180 px; mark
  alone 6 mm and 24 px. _(Proposed)_
- **Always** switch to the next smaller lockup rather than shrinking below the minimum. _(Proposed)_
- **Never** show the descriptor smaller than 4 pt in print or 8 px on screen. _(Proposed)_

**Why** The descriptor is the smallest element. At the stacked minimum it sets at 4.2 pt, the practical floor for
tracked capitals on coated stock and for digital press.

**Example** A 20 mm wide space cannot hold either lockup at its minimum: use the mark alone, 6 mm or larger.

**Bend when** Embossed or engraved marks may go smaller if the descriptor is dropped and the owner approves the artwork.

**Prior art** Minimum sizes stated in both print and pixel units are standard in logo guidelines.

### L6 · Grounds and placement

*Strength: Default · Source: Proposed*

**Rules**

- **Default** to cream, white or green grounds. _(Board)_
- **Always** use a green scrim (green at 60 to 80 percent opacity, or a solid band) under a lockup that sits on a
  photograph. _(Proposed)_
- **Avoid** gold grounds except for `mark-green` and `logo-mono-green`. _(Board)_
- **Never** place a lockup on a ground that has less than 3 to 1 contrast with the lockup's wordmark. _(Proposed)_
- **Default** to top-left for headers and centered for covers, signs and shirts. _(Board)_

**Why** Reversed lockups on photographs lose their descriptor first. A scrim protects it without altering the
photograph.

**Example** Hero image with the reversed lockup: a green band across the bottom third carries the lockup at 70 percent
opacity.

**Bend when** The photograph already has a dark, quiet area where the lockup meets 4.5 to 1 against the average of that
area: no scrim needed.

**Prior art** Semi-opaque overlays behind text on photographs are the usual way to meet WCAG 1.4.3 over images.

### L7 · App icon and tiles

*Strength: Default · Source: Board*

**Rules**

- **Default** to the gold rounded-square tile with the green mark for app stores, home screens and favicons: `app-icon`.
  _(Board)_
- **Always** keep the tile radius at 22 percent of its side, and the mark at 59 percent of the tile's width, centered.
  _(Board, Card)_
- **Never** add a wordmark, a gradient or an effect inside the tile. _(Proposed)_

**Why** The board shows the app icon as a flat gold tile with the green mark. Platforms apply their own masks and
shadows.

**Example** 1024 by 1024 px master exported from `app-icon.svg`; the platform mask rounds it further where it needs to.

**Bend when** A platform requires a full-bleed square or a transparent foreground layer: export the tile and mark as
separate layers from the same file; keep the 59 percent mark.

**Prior art** Apple Human Interface Guidelines (app icons) and Android adaptive icons both want a simple glyph on a flat
ground with room inside the mask.

### L8 · Dimensional signage

*Strength: Prefer · Source: Board*

**Rules**

- **Prefer** dimensional letters in Slate (graphite) with the roof mark in gold on stone, concrete or plaster. _(Board)_
- **Consider** the all-green version for darker walls and the reversed version on green panels. _(Proposed)_
- **Always** cut letters from the outlined paths in `logo-mono-green` or `logo-primary`, never from a font. _(Proposed)_

**Why** The board's sign mock shows Slate letters and a gold mark standing off a pale concrete wall. The material gives
the depth; the artwork stays flat.

**Example** Entrance wall: Slate letters standing off the wall, a gold mark above them, the descriptor cut flat in
Slate.

**Bend when** A site rule or lighting needs backlit letters: keep the same artwork and the white-on-green reversed
colors for the lit face.

**Prior art** Signmakers work from outlined vector artwork and published stand-off, depth and clear-space dimensions.

### L9 · Misuse

*Strength: Never · Source: Board, Proposed*

**Rules**

- **Never** stretch, squash, skew, rotate or mirror a lockup. _(Proposed)_
- **Never** recolor beyond the four pairings in L3, or fill the mark with a gradient or a photograph. _(Proposed)_
- **Never** add a shadow, glow, outline or bevel to a flat lockup. Physical depth in signage (L8) is a material, not an
  effect. _(Proposed)_
- **Never** change the order, spacing or proportions of mark, wordmark and descriptor, or set the wordmark in another
  font. _(Proposed)_
- **Never** use the mark as a bullet, a pattern tile in running copy, or a letter inside a word. The pattern use in M2
  is the only repeat. _(Proposed)_
- **Never** place a lockup on a busy ground without a scrim (L6). _(Proposed)_

**Why** Each of these breaks recognition or legibility. They are listed so a reviewer can name the rule instead of
arguing taste.

**Example** A promotion that tilts the stacked lockup 10 degrees to look dynamic is rejected under this rule.

**Bend when** Never. A real exception is a change to this document, made through G2.

**Prior art** The standard misuse pages of published brand kits.

