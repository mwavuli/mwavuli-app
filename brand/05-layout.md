# 05 · Layout and space

Spacing, grid, shape, depth, rules and motion, for screens and for print. Values are in [`tokens/`](tokens/).

## Space and structure

### S1 · Spacing scale

*Strength: Default · Source: Proposed*

**Rules**

- **Default** to a 4 px base. Use only the steps in the table. _(Proposed)_
- **Default** to 16 px between related elements, 24 px inside cards and 64 to 96 px between page sections. _(Proposed)_
- **Avoid** one-off values. If a design needs 14 px, choose 12 or 16. _(Proposed)_

| Token      | Value | Typical use                   |
|------------|-------|-------------------------------|
| `space.1`  | 4 px  | Icon to label, tight chips    |
| `space.2`  | 8 px  | Between inline items          |
| `space.3`  | 12 px | Dense lists                   |
| `space.4`  | 16 px | Default gap, form fields      |
| `space.5`  | 20 px | Card header to body           |
| `space.6`  | 24 px | Card padding, grid gutter     |
| `space.8`  | 32 px | Group separation              |
| `space.10` | 40 px | Section padding on mobile     |
| `space.12` | 48 px | Section padding, hero spacing |
| `space.16` | 64 px | Section separation            |
| `space.20` | 80 px | Large section separation      |
| `space.24` | 96 px | Hero and footer padding       |

**Why** A fixed scale makes spacing a choice among a few options, not a pixel hunt, and it carries straight into the
tokens.

**Example** List row: 16 px padding, 8 px between title and meta, 1 px hairline below.

**Bend when** A component must align to an image or a third-party widget: match the external size and note it in the
component.

**Prior art** Material Design (8 dp grid with 4 dp half steps) and Tailwind CSS (4 px steps) use the same base.

### S2 · Grid and containers

*Strength: Default · Source: Proposed*

**Rules**

- **Default** to a 12-column grid inside a container at most 1200 px wide, centered. _(Proposed)_
- **Default** to a 16 px gutter below 768 px and 24 px from 768 px up; page margins 16, 24 and 32 px at small, medium
  and large widths. _(Proposed)_
- **Always** design mobile first and test at 360, 768, 1024 and 1440 px wide. _(Proposed)_
- **Default** to these breakpoints: 640, 768, 1024 and 1280 px. _(Proposed)_

**Why** Most tenants will meet Mwavuli on a phone. Mobile-first with four breakpoints is enough for a marketing site and
a dashboard.

**Example** Listing grid: one column below 640, two from 640, three from 1024.

**Bend when** A full-bleed photograph or map spans the viewport: let the image break out of the container, not the text.

**Prior art** Material Design's responsive layout grid and the 12-column grids of Bootstrap and Foundation.

### S3 · Radii

*Strength: Default · Source: Board, Card*

**Rules**

- **Default** to these radii: 8 px for inputs and chips, 12 px for buttons, 16 px for cards, 24 px for large panels.
  _(Board mock, Proposed)_
- **Always** round contact badges at 20 percent of their side and the app tile at 22 percent. _(Card, Board)_
- **Always** use a pill (fully round) only for chips and toggles. _(Proposed)_
- **Never** mix sharp and rounded corners inside one component. _(Proposed)_

**Why** The board's phone mock rounds cards at about 16 px and the app tile at 22 percent; the card's contact badges at
20 percent. Consistent rounding is part of the warm, modern character (F4).

**Example** A property card: 16 px radius, image corners clipped to match.

**Bend when** A shape touches a screen or page edge: square that edge.

**Prior art** Rounding scales (small, medium, large, extra large) in Material Design 3 and Tailwind CSS.

### S4 · Elevation

*Strength: Prefer · Source: Board mock*

**Rules**

- **Prefer** a white surface with the soft `shadow.md` for raised cards on a cream page, as in the board's app mock.
  _(Board mock)_
- **Default** to no more than two elevation levels in one view: resting cards and overlays. _(Proposed)_
- **Never** use colored or hard-edged shadows. Reversed (green) surfaces do not use shadows; use a lighter ramp step.
  _(Proposed)_

**Why** The app mock separates cards from the page with a quiet shadow, not borders. It keeps the page clean (F4).

**Example** Cards: `shadow.md`. Dropdown and dialog: `shadow.lg`. Inline panels: border only.

**Bend when** A card sits on white: use `border.default` instead of a shadow.

**Prior art** Elevation tokens in Material Design 3 and the Atlassian Design System.

### S5 · Dividers and rules

*Strength: Default · Source: Card, Board*

**Rules**

- **Default** to a 1 px hairline in `border.default` to separate items in interface lists. _(Proposed)_
- **Prefer** a gold rule for brand moments: a short rule under a headline, a vertical rule between a logo and its
  details, a horizontal rule between two groups. _(Board, Card)_
- **Always** print gold rules at 0.25 mm or thicker; the card uses 0.4 mm (vertical), 0.28 mm (horizontal) and 9.02 by
  0.63 mm (title rule). _(Card)_
- **Never** use white vertical separators between columns of services. White space separates them. _(Card)_

**Why** The owner removed white column separators from the card back after review and asked for a divider between the
two groups instead. Gold rules are the brand's way of marking structure; hairlines are for the interface.

**Example** Web headline rule: 64 px wide, 4 px thick, `color.core.gold`, 16 px under the heading.

**Bend when** A dense table needs vertical lines for scanning: use `border.default` hairlines, never gold or white.

**Prior art** Rule-and-white-space layouts in editorial design; hairlines as the default separator in Material Design
lists.

## Print and grouping

### S6 · Margins and safe zones (print)

*Strength: Always · Source: Card*

**Rules**

- **Always** supply print artwork with 3 mm bleed on every side and keep text and logos at least 3 mm inside the trim.
  _(Card)_
- **Always** let background color, the corner motif and photographs run to the bleed edge. _(Card)_
- **Default** to 3 mm outer margins on dense layouts such as the card back, and to larger margins where content is
  sparse (the card front). _(Card)_
- **Always** add crop marks 3.5 mm out from the trim on the sheet, in registration color. _(Card)_

**Why** Trimming moves by up to a millimeter. A 3 mm margin keeps content intact after a worst-case cut and is the
common safe-zone figure for digital print.

**Example** Business card 90 by 40 mm: sheet 110 by 60 mm with 10 mm of margin outside the trim for bleed and marks.

**Bend when** A supplier states a different bleed (for example 5 mm for large format): follow the supplier and keep the
safe margin.

**Prior art** The 3 mm bleed and safe-area convention in most print suppliers' guides and in PDF/X preflight profiles.

### S7 · White space and grouping

*Strength: Prefer · Source: Card*

**Rules**

- **Prefer** grouping by proximity: space between groups is at least one and a half times the space inside a group.
  _(Card)_
- **Prefer** a divider when two groups stack, with equal white space above and below it. _(Card)_
- **Avoid** filling white space; empty space is part of the brand's calm. _(Board)_

**Why** The card back needed a clear break between the logo group and the services row once the vertical separators
went. Space plus one gold divider did it without lines between every column.

**Example** Card back: 8.8 mm between the groups, with the divider centered, about 4.4 mm above and below; 3.1 mm
between service columns.

**Bend when** A screen is very small and vertical space is scarce: reduce the gap to one and a half times the inner
space and keep the divider.

**Prior art** The Gestalt principle of proximity; spacing rules in GOV.UK and Material layout guidance.

## Interaction

### S8 · Touch targets and focus

*Strength: Always · Source: Proposed*

**Rules**

- **Always** make tap targets at least 44 by 44 px, with at least 8 px between neighbors. _(Proposed)_
- **Always** show a visible focus ring: 2 px `focus.ring` (Green) with a 2 px offset; on Green grounds use
  `focus.ring-inverse` (Gold). _(Proposed)_
- **Never** remove an outline without providing an equal or stronger replacement. _(Proposed)_
- **Default** to pressed states one ramp step darker, hover states one ramp step lighter or darker per ground.
  _(Proposed)_

**Why** Many users are on phones and some use keyboards or switches. WCAG 2.2 sets a floor of 24 by 24 px (SC 2.5.8); 44
px is the comfortable size recommended by Apple's guidelines.

**Example** An icon button: 24 px icon inside a 44 by 44 px target, with the focus ring around the target.

**Bend when** A dense table needs smaller controls: keep 24 by 24 px minimum and widen the spacing.

**Prior art** WCAG 2.2 SC 2.4.7 (focus visible), 2.4.11 (focus not obscured) and 2.5.8 (target size); Apple Human
Interface Guidelines (44 pt).

### S9 · Motion

*Strength: Prefer · Source: Proposed*

**Rules**

- **Prefer** short, calm transitions: 120 ms (fast), 200 ms (base) and 320 ms (slow), with the `standard` easing.
  _(Proposed)_
- **Always** respect `prefers-reduced-motion`: replace movement with a fade or no change. _(Proposed)_
- **Avoid** parallax, autoplay carousels and looping animation. _(Proposed)_
- **Default** to animating opacity, transform and color only. _(Proposed)_

**Why** The brand is calm and uncluttered. Movement should confirm an action, not decorate.

**Example** A card lifts from `shadow.sm` to `shadow.md` in 200 ms on hover; under reduced motion it changes shadow with
no movement.

**Bend when** A one-off brand film or hero needs richer motion: it must be skippable and respect reduced motion.

**Prior art** WCAG 2.3.3 (animation from interactions) and Material Design motion durations and easing.

