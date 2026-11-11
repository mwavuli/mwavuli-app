# 03 · Color

The five core colors, what each is for, which pairs are legible, and how they are built for print. Values are in
[`tokens/`](tokens/); the contrast figures below are computed from those values.

## Palette and roles

### C1 · Core palette

*Strength: Always · Source: Board*

**Rules**

- **Always** limit the brand to the five core colors the board names: Mwavuli Green, Mwavuli Gold, Mist Cream, Slate and
  Sage. _(Board)_
- **Always** use the exact values in the table. Do not eyedrop from photographs, screens or printouts. _(Proposed)_
- **Always** treat white as a surface and a reversed-text color, not a brand color. _(Proposed)_
- **Never** add a sixth brand color. Ramps (C5) and the functional error color (C6) are derived or functional, not
  brand. _(Board, Proposed)_

| Color         | Role                      | HEX     | RGB         | CMYK build      |
|---------------|---------------------------|---------|-------------|-----------------|
| Mwavuli Green | Primary, trust, stability | #0B4D3B | 11 77 59    | C85 M32 Y70 K42 |
| Mwavuli Gold  | Accent, value, premium    | #C9A241 | 201 162 65  | C10 M26 Y85 K9  |
| Mist Cream    | Backgrounds, clarity      | #F6F3E9 | 246 243 233 | C3 M3 Y6 K0     |
| Slate         | Text, structure           | #2F3437 | 47 52 55    | C81 M71 Y64 K37 |
| Sage          | UI accents, states        | #7A9B7F | 122 155 127 | C52 M22 Y51 K2  |
| White         | Surfaces, reversed text   | #FFFFFF | 255 255 255 | C0 M0 Y0 K0     |

**Why** The board's palette panel is headed "≤5 core colors". Five colors keep layouts calm (Clean and uncluttered, F4)
and make physical matching (paint, thread, vinyl) a short list.

**Example** A flyer uses a cream ground, a green headline, Slate body text and one gold rule: four of the five colors,
no others.

**Bend when** A client or partner logo brings its own colors: keep it inside its clear space and do not tint it.

**Prior art** Small named palettes with explicit roles are the pattern in Material Design 3 (color roles) and the GOV.UK
Design System (a short palette plus functional colors).

### C2 · Roles and proportion

*Strength: Default · Source: Board, Proposed*

**Rules**

- **Always** use each color for the role the board gives it: Green for primary, trust and stability; Gold for accent,
  value and premium; Mist Cream for backgrounds and clarity; Slate for text and structure; Sage for UI accents and
  states. _(Board)_
- **Default** on light layouts to Mist Cream as the page, white for raised cards, Green for brand surfaces and headings,
  Gold in 10 percent of the area or less, and Slate for body text. _(Proposed)_
- **Default** on reversed layouts to a Green ground for most of the area, white or cream text, and Gold in 10 percent or
  less. _(Card)_
- **Avoid** three or more accent areas competing in one view; one gold element per block is usually enough. _(Proposed)_

**Why** Roles make color predictable, so a new page looks like the others without a template. The proportions come from
the approved card: the front is mostly cream with a green corner, the back mostly green with gold accents.

**Example** Site section: cream background, a white card, green heading, Slate paragraph, a gold rule under the heading.

**Bend when** A hero or campaign page needs a full-bleed Green ground: use the reversed proportions.

**Prior art** The 60-30-10 proportion rule is a common starting point for interface color; the card is the local
evidence.

### C3 · Contrast pairs

*Strength: Always · Source: Proposed*

**Rules**

- **Always** meet WCAG 2.2 level AA on screens: 4.5 to 1 for text, 3 to 1 for large text (24 px and up, or 18.66 px and
  up in bold) and for icons and other graphics that carry meaning. _(Proposed)_
- **Always** take text and ground pairs from the table; compute any new pair before use. _(Proposed)_
- **Never** use a pair marked "Not for text" for any text. _(Proposed)_
- **Default** to the same ratios as a legibility guide in print, where WCAG does not apply. _(Card)_

| Text or mark | Ground     | Ratio | WCAG               | Use                                |
|--------------|------------|-------|--------------------|------------------------------------|
| Slate        | Mist Cream | 11.35 | AA text            | Body text                          |
| Slate        | White      | 12.60 | AA text            | Body text                          |
| Green        | Mist Cream | 8.84  | AA text            | Headings, links, text              |
| Green        | White      | 9.82  | AA text            | Headings, links, text              |
| White        | Green      | 9.82  | AA text            | Reversed text                      |
| Mist Cream   | Green      | 8.84  | AA text            | Reversed text                      |
| White        | Slate      | 12.60 | AA text            | Reversed text on Slate             |
| Muted text   | Mist Cream | 4.71  | AA text            | Secondary text                     |
| Muted text   | White      | 5.23  | AA text            | Secondary text                     |
| Brick        | White      | 6.44  | AA text            | Error text and icons               |
| Brick        | Mist Cream | 5.80  | AA text            | Error text and icons               |
| Sage 700     | Mist Cream | 5.15  | AA text            | Success text and marks             |
| Gold 700     | White      | 4.08  | AA large, graphics | Informative gold icons             |
| Gold 700     | Mist Cream | 3.68  | AA large, graphics | Informative gold icons, large text |
| Gold         | Slate      | 5.24  | AA text            | Gold text and marks on Slate       |
| Slate        | Gold       | 5.24  | AA text            | Slate text on a gold ground        |
| Gold         | Green      | 4.08  | AA large, graphics | Large text, rules, icons, marks    |
| Green        | Gold       | 4.08  | AA large, graphics | Large text only                    |
| Sage         | White      | 3.08  | AA large, graphics | Graphics only; not for text        |
| Sage         | Mist Cream | 2.77  | Below AA           | Not for text or meaning            |
| Gold         | White      | 2.41  | Below AA           | Not for text; decoration only      |
| Gold         | Mist Cream | 2.17  | Below AA           | Not for text; decoration only      |

**Why** Contrast is the one accessibility measure that can be checked from the palette alone, and the brand's two warm
colors are the risky ones: Gold and Sage are both under 4.5 to 1 on light grounds.

**Example** A button: white text on Green, 9.82 to 1. A caption: muted Slate on cream, 4.71 to 1.

**Bend when** Never on screen. In print, large display type in a pair under 4.5 to 1 is acceptable if the card or sign
is viewed from a distance and the owner has approved the proof (see D9).

**Prior art** WCAG 2.2 success criteria 1.4.3 (text) and 1.4.11 (non-text contrast); Material Design 3 checks pairs by
color role.

### C4 · Gold discipline

*Strength: Never · Source: Card, Proposed*

**Rules**

- **Never** set gold text smaller than large text on cream or white: the ratio is 2.17 to 1 on cream and 2.41 to 1 on
  white. _(Proposed)_
- **Never** set small body text in gold on green; the ratio is 4.08 to 1. Gold on green is for large text, rules, icons
  and marks. _(Proposed)_
- **Always** pair an informative gold graphic on a light ground with a Green or Slate label, or use `gold-700` for the
  graphic. _(Proposed)_
- **Always** keep gold for the accent role (C2): marks, rules, key figures, the second beat of a tagline. _(Board)_

**Why** Gold is the brand's signal color and its weakest text color. Keeping it to marks and large type protects both
the look and the legibility.

**Example** Card back: "Our Responsibility." in gold at display size on green is allowed; the same words at 6 pt would
not be.

**Bend when** A decorative, non-informational use (a rule, a pattern, a logo mark) has no contrast requirement; the rule
applies to anything the reader must read or recognize.

**Prior art** WCAG 1.4.3 and 1.4.11, and the logotype exemption in 1.4.3 for the mark itself.

**Note** The printed card sets the job title in gold at 8.1 pt on cream, which is below these ratios. It is a print
exception pending decision D9.

## Extensions

### C5 · Ramps and neutrals

*Strength: Prefer · Source: Proposed*

**Rules**

- **Prefer** ramp steps for surfaces, borders and hover or pressed states, never for the logo, rules or brand marks,
  which use the core values. _(Proposed)_
- **Always** derive ramps from the core colors by mixing with white (tints) or black (shades); do not invent new hues.
  _(Proposed)_
- **Default** to the `text.muted` role for secondary text and `border.default` for hairlines. `slate-500` is only 3.35
  to 1 on cream: use it for icons and disabled states, never for text. _(Proposed)_

| Family | 50      | 100     | 300     | 500      | 700     | 900      |
|--------|---------|---------|---------|----------|---------|----------|
| green  | #EBF1EF | #D8E3E0 | #9DB8B1 | #0B4D3B* | #093C2E | #062A20  |
| gold   | #FAF6EC | #F3EBD5 | #E4D0A0 | #C9A241* | #977A31 |          |
| sage   | #F2F5F2 | #E4EBE5 | #C3D2C5 | #7A9B7F* | #556C59 |          |
| slate  | #F3F3F3 | #E6E7E7 | #B6B8B9 | #828587  | #4E5255 | #2F3437* |
| brick  | #F8EFEE |         |         | #A63A2B* |         |          |

*An asterisk marks the core color of the family.*

**Why** UI needs lighter and darker neighbors of each color. Deriving them keeps the palette at five hues.

**Example** A selected list row: `sage-100` ground with Green text. A disabled button: `slate-100` ground with
`slate-500` text.

**Bend when** An illustration or chart needs more than six distinguishable colors: use the ramps with pattern or label,
and tell the owner.

**Prior art** Tonal palettes in Material Design 3 and numbered ramps (50 to 900) in Tailwind CSS and the Atlassian
Design System.

### C6 · State colors

*Strength: Default · Source: Board, Proposed*

**Rules**

- **Always** use Sage for positive and selected states, as the board names it "UI accents, states". _(Board)_
- **Default** to these four states: success (Sage), warning (Gold), error (Brick) and information (Slate). _(Proposed)_
- **Always** show state with an icon or word as well as color. _(Proposed)_
- **Never** use Brick for decoration or branding; it is a functional color for errors only. _(Proposed)_

| State       | Ground      | Text and mark     | Icon      |
|-------------|-------------|-------------------|-----------|
| Success     | `sage-100`  | Green             | `check`   |
| Warning     | `gold-100`  | Slate             | `alerts`  |
| Error       | `brick-50`  | Brick (`#A63A2B`) | `alerts`  |
| Information | `slate-100` | Slate             | `trusted` |

**Why** The board names only Sage for states. A product needs an error color that passes contrast; Brick is a warm, dark
red that sits with the palette (6.44 to 1 on white).

**Example** Paid rent: a `sage-100` chip with a check icon and the word "Paid" in Green.

**Bend when** The owner prefers to keep the palette at exactly five colors: use Slate with a bold label and the `alerts`
icon for errors (decision D7).

**Prior art** Semantic state colors (success, warning, error, info) in Material Design, GOV.UK and Atlassian; the extra
cue (icon or word) is WCAG 1.4.1 (use of color).

### C7 · Print builds

*Strength: Default · Source: Card*

**Rules**

- **Default** to the CMYK builds in the palette table for all four-color print. They were used on the business card.
  _(Card)_
- **Always** print brand colors as flat builds; do not convert from RGB in the printer's software. _(Card)_
- **Always** keep total ink coverage at or below 230 percent for brand builds (Green is the heaviest at 229 percent).
  _(Card)_
- **Avoid** reversed text under 6 pt out of a four-color build on an offset press, where misregistration fills it in.
  The card's 5 pt labels are acceptable on digital presses only. _(Proposed)_
- **Always** ask the printer for a proof before a run; match signage paint, vinyl and thread to the RGB or a physical
  swatch (decision D10). _(Proposed)_

**Why** The builds were converted from the board's RGB values through Apple's Generic CMYK profile (relative
colorimetric, black point compensation) and checked by round trip. They are a starting point, not a press profile.

**Example** Mwavuli Green on the card: C85 M32 Y70 K42. Printed on coated stock, expect a slightly lighter, bluer green
than on screen.

**Bend when** The printer supplies an ICC profile (for example FOGRA39 or SWOP): re-separate from the RGB values with
that profile and update this table.

**Prior art** ISO 12647-2 and FOGRA39 for offset on coated stock; PDF/X-4 for exchange; the card set in `mwavuli-card/`
follows the same trim, bleed and flat-color practice.

