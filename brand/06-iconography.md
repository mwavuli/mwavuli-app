# 06 · Iconography

Three icon families, the grid and stroke they follow, the catalog and how to add to it. The artwork is in
[`icons/`](icons/); a preview is in [`preview/icons.png`](preview/icons.png).

## Families and construction

### I1 · Families

*Strength: Always · Source: Board, Card*

**Rules**

- **Always** use one of three families: line icons for the interface, service pictograms for print and marketing,
  contact badges for contact details. _(Board, Card)_
- **Always** keep one family within a row or group of items. Do not mix outline and solid icons side by side, except a
  solid companion that marks the active state (I4). _(Proposed)_
- **Never** use the logo mark as an icon, and never use an icon as a logo. _(Proposed)_

| Family             | Style                                  | Where                  | Folder             |
|--------------------|----------------------------------------|------------------------|--------------------|
| Line icons         | Outline, 24 px grid, 1.5 px stroke     | App, site, documents   | `icons/line/`      |
| Service pictograms | Solid, one color, traced from the card | Card back, brochures   | `icons/pictogram/` |
| Contact badges     | Rounded square, knocked-out glyph      | Card front, signatures | `icons/pictogram/` |

**Why** The board's iconography panel shows a consistent outline set, while the approved card uses solid gold pictograms
and rounded contact badges. They serve different media, so each is named and bounded.

**Example** Site services row: six line icons in Green. Card back services row: six solid pictograms in gold and white.

**Bend when** A print piece has to use an interface icon (for example a QR caption): keep the line style at 1.5 px per
24 px.

**Prior art** Separate outline and solid sets with one grid are standard in Material Symbols and Phosphor; Carbon keeps
pictograms apart from UI icons.

### I2 · Grid and live area

*Strength: Always · Source: Proposed*

**Rules**

- **Always** draw on a 24 by 24 px canvas with a 20 by 20 px live area (2 px padding). _(Proposed)_
- **Default** to keyline shapes: a 20 px circle, an 18 px square, a 20 by 16 px landscape and a 16 by 20 px portrait
  rectangle. _(Proposed)_
- **Always** center the optical mass of an icon, not just its bounding box. _(Proposed)_

**Why** The board's icons are drawn at one size with even padding. A 24 px grid scales cleanly to the sizes in I5 and
matches the grid used by most icon libraries.

**Example** `properties` spans 3 to 21 px wide and 3.2 to 20.2 px tall inside the 20 px live area.

**Bend when** An icon needs more width than the live area (the `tenants` group runs to 1.6 px from each edge): keep the
stroke inside the 24 px canvas.

**Prior art** Material Symbols (24 dp canvas, 2 dp padding) and Feather and Lucide (24 px canvas).

### I3 · Stroke and corners

*Strength: Always · Source: Board, Proposed*

**Rules**

- **Always** use a 1.5 px stroke at 24 px (6.25 percent of the canvas), with round caps and round joins. _(Proposed)_
- **Always** let the stroke scale with the icon; never fix it in pixels at larger sizes. _(Proposed)_
- **Default** to a corner radius of at least 1 px on inside corners and 2 px on outer corners of rectangles.
  _(Proposed)_
- **Always** leave at least 1.5 px between two strokes so they stay apart at 20 px. _(Proposed)_
- **Never** use fills, gradients, shadows or text inside a line icon. _(Board)_
- **Default** to dots drawn as zero-length round-capped strokes (for example the windows of `commercial`). _(Proposed)_

**Why** The board's icons are light, rounded and uniform. 1.5 px at 24 px matches their proportion (roughly 5 to 6
percent) while staying crisp at 16 and 20 px. It is a measured choice; see decision D13.

**Example** The `compliance` shield: 1.5 px stroke and round joins, with the check mark kept at least 1.5 px clear of
the outline.

**Bend when** A set is shown at 48 px or larger for marketing: the same proportion applies; do not add detail.

**Prior art** Feather and Lucide use 2 px at 24 px; Phosphor offers thin, light, regular and bold weights. 1.5 px is a
lighter weight chosen to match the board.

### I4 · Color and state

*Strength: Default · Source: Board, Proposed*

**Rules**

- **Default** to Green icons on light grounds, as in the board's iconography panel. Use Slate for neutral controls and
  `text.muted` for inactive ones. _(Board)_
- **Always** use white icons on Green, and gold icons on Green only at 24 px and larger. _(Proposed)_
- **Default** to marking the active state with the solid companion where one exists (`home-solid`) and with Green plus a
  label otherwise. _(Board mock)_
- **Always** use Brick for error icons and nothing else. _(Proposed)_
- **Never** use more than one color in a line icon. _(Proposed)_

**Why** The app mock shows Home filled in Green when active and the other tabs in outline. One color per icon keeps them
legible and themable through `currentColor`.

**Example** Tab bar: `home-solid` Green with the label "Home" bold; `properties`, `payments` and `more` in `text.muted`.

**Bend when** A marketing diagram needs two colors: use the pictogram family, not a line icon.

**Prior art** Outline for inactive and filled for active is the pattern in Apple's tab bars and Material 3 navigation
bars.

### I5 · Sizes and alignment

*Strength: Default · Source: Proposed*

**Rules**

- **Default** to these sizes: 16 px (dense lists), 20 px (inline with 16 px text), 24 px (default), 32 px (feature rows)
  and 48 px (marketing). _(Proposed)_
- **Always** center an inline icon on the x-height of its text and leave 4 px between icon and label at 16 px text, 8 px
  at larger sizes. _(Proposed)_
- **Always** place icon-only controls in a 44 by 44 px target (S8). _(Proposed)_
- **Avoid** sizes between steps, and avoid scaling an icon with CSS `zoom`. _(Proposed)_

**Why** Whole sizes land strokes on the pixel grid. The steps match the common 16, 20, 24, 32 and 48 sizes in Carbon and
Material.

**Example** Row: 24 px `payments` icon, 16 px gap, title in `h4`.

**Bend when** A hero shows an icon at 96 px or more: scale from the SVG, the proportions hold.

**Prior art** Carbon icon sizes 16, 20, 24 and 32; Material Symbols optical sizes 20, 24, 40 and 48.

## Catalog

### I6 · Catalog and naming

*Strength: Always · Source: Board, Proposed*

**Rules**

- **Always** use the icon mapped to a concept in the table; do not draw a second icon for the same concept. _(Proposed)_
- **Always** name files with lowercase, hyphenated, meaning-based names: `utilities-water`, not `blue-drop`.
  _(Proposed)_
- **Default** to these aliases: People-Centric uses `tenants`; Construction and Repairs and Maintenance use
  `maintenance`; Guaranteed Rental Income uses `payments`. _(Board, Card)_

| ID   | Name              | Meaning                            | Source     |
|------|-------------------|------------------------------------|------------|
| IC01 | `properties`      | Property, building, listing        | Board      |
| IC02 | `tenants`         | Tenants, people, customers         | Board      |
| IC03 | `leases`          | Leases, agreements, documents      | Board      |
| IC04 | `payments`        | Payments, rent, money              | Board      |
| IC05 | `maintenance`     | Maintenance, repairs, construction | Board      |
| IC06 | `bookings`        | Bookings, viewings, schedules      | Board      |
| IC07 | `commercial`      | Commercial units, offices          | Board      |
| IC08 | `reports`         | Reports, statements, performance   | Board      |
| IC09 | `compliance`      | Compliance, verified, secure       | Board      |
| IC10 | `alerts`          | Alerts, notifications, reminders   | Board      |
| IC11 | `trusted`         | Trusted, protected                 | Board      |
| IC12 | `organized`       | Organized, transparent management  | Board      |
| IC13 | `growth`          | Growth, value, investment          | Board      |
| IC14 | `utilities-water` | Water, water bills                 | Proposed   |
| IC15 | `utilities-power` | Electricity, power                 | Proposed   |
| IC16 | `waste`           | Waste, garbage collection          | Proposed   |
| IC17 | `phone`           | Phone, call                        | Proposed   |
| IC18 | `location`        | Location, address                  | Proposed   |
| IC19 | `mail`            | Email                              | Proposed   |
| IC20 | `web`             | Website, online                    | Proposed   |
| IC21 | `home`            | Home (navigation)                  | Board mock |
| IC22 | `chevron-right`   | Next, expand                       | Proposed   |
| IC23 | `chevron-down`    | Open, expand                       | Proposed   |
| IC24 | `check`           | Done, selected                     | Proposed   |
| IC25 | `close`           | Close, remove                      | Proposed   |
| IC26 | `plus`            | Add                                | Proposed   |
| IC27 | `search`          | Search                             | Proposed   |
| IC28 | `arrow-right`     | Go, continue                       | Proposed   |
| IC29 | `menu`            | Menu                               | Proposed   |
| IC30 | `home-solid`      | Home, active state                 | Board mock |
| IC31 | `more`            | More (navigation)                  | Board mock |

**Why** The board names ten core icons and four essence icons. The catalog adds the icons the card and a site need
(services, contact, interface) in the same style, each tagged by source so the owner can see what was drawn from the
board and what was added.

**Example** A rent statement uses `payments` and `reports`; a repair request uses `maintenance` and `alerts`.

**Bend when** A concept has no icon: follow I9, add it to this table and tag it Proposed.

**Prior art** Semantic icon naming in Material Symbols and Carbon; IDs in this table follow the review convention in the
README.

### I7 · Service pictograms

*Strength: Default · Source: Card*

**Rules**

- **Default** to solid gold pictograms on Green, or Green on cream, for the six services. The card back also sets two of
  them in white. _(Card)_
- **Always** use one color per pictogram. _(Card)_
- **Avoid** pictograms smaller than 6 mm tall in print or 32 px on screen. _(Proposed)_
- **Never** use a pictogram for interface actions. Use the line family. _(Proposed)_

| ID  | File                                       | Service or use                          | Source |
|-----|--------------------------------------------|-----------------------------------------|--------|
| PG1 | `icons/pictogram/rental-income.svg`        | Guaranteed Rental Income                | Card   |
| PG2 | `icons/pictogram/tenant-management.svg`    | Tenant Management and Sourcing          | Card   |
| PG3 | `icons/pictogram/construction-repairs.svg` | Construction and Repairs                | Card   |
| PG4 | `icons/pictogram/electrical-plumbing.svg`  | Electrical and Plumbing Services        | Card   |
| PG5 | `icons/pictogram/utilities.svg`            | Utilities (Electricity and Water Bills) | Card   |
| PG6 | `icons/pictogram/garbage-management.svg`   | Garbage Disposal and Management         | Card   |
| BG1 | `icons/pictogram/badge-phone.svg`          | Phone line badge                        | Card   |
| BG2 | `icons/pictogram/badge-location.svg`       | Place line badge                        | Card   |

**Why** The pictograms were traced from the approved card artwork and keep its look: coins, people, crossed tools, plug,
drop and bin.

**Example** Card back: six pictograms, each 5 to 7 mm tall, centered above their labels.

**Bend when** A service is added: draw a new pictogram in the same solid style and add it here (decision D15).

**Prior art** Solid service pictograms for print alongside outline UI icons, as in Carbon's pictogram set.

### I8 · Contact badges

*Strength: Default · Source: Card*

**Rules**

- **Default** to a Green rounded square (radius 20 percent) with the glyph knocked out, so the ground shows through.
  _(Card)_
- **Always** build new badges (email, website) from the same square with a glyph from the line family at the same scale.
  _(Proposed)_
- **Consider** the gold circular badge from the board's card mock for the app and email only (decision D13). _(Board
  mock)_

**Why** The approved card uses Green squares with cream glyphs for the phone and location lines. The board's card mock
uses small gold circles instead; both are shown, one is the default.

**Example** Card front: a phone badge before the number, a location badge before the place.

**Bend when** A badge has to sit on Green: use a cream square and a Green glyph.

**Prior art** Contact lines with a small icon badge are common on business cards and email signatures.

### I9 · Adding an icon

*Strength: Default · Source: Proposed*

**Rules**

- **Default** to this checklist before an icon is added: one concept; drawn on the 24 px grid; 1.5 px stroke, round caps
  and joins; at least 1.5 px between strokes; no text or perspective; checked at 16, 24 and 48 px. _(Proposed)_
- **Always** add the icon to the catalog table with its source and meaning. _(Proposed)_
- **Always** review new icons on a preview sheet beside the existing set in the same pull request. _(Proposed)_
- **Avoid** drawing an icon the catalog already covers. _(Proposed)_

**Why** A short checklist keeps contributions consistent without a design review for every icon.

**Example** New icon `parking`: a P in a rounded square, 1.5 px stroke, checked at 16 px, added as IC32 with source
Proposed.

**Bend when** An icon needs a detail that fails at 16 px: offer a simpler 16 px variant, not a thicker stroke.

**Prior art** Contribution checklists in Material Symbols and Carbon's icon library.

### I10 · Accessibility of icons

*Strength: Always · Source: Proposed*

**Rules**

- **Always** mark decorative icons `aria-hidden="true"` and give meaning-bearing icons a text alternative. _(Proposed)_
- **Always** give an icon-only button an accessible name (visible label, `aria-label` or visually hidden text).
  _(Proposed)_
- **Always** keep meaning-bearing icons at 3 to 1 contrast or better against their ground (C3). _(Proposed)_
- **Never** rely on an icon alone to show status. Pair it with a word. _(Proposed)_

**Why** Icons are read differently by different users and are not announced by assistive technology unless labeled.

**Example** A "Paid" chip: `check` icon with `aria-hidden="true"` next to the word "Paid".

**Bend when** Never for icon-only buttons. Decorative icons next to an identical visible label need no extra text.

**Prior art** WCAG 1.1.1 (non-text content), 1.4.11 (non-text contrast) and 4.1.2 (name, role, value).

### I11 · Files and use

*Strength: Default · Source: Proposed*

**Rules**

- **Default** to SVG with `viewBox="0 0 24 24"`, `currentColor` for stroke or fill, and no hard-coded colors, IDs, masks
  or filters in line icons. _(Proposed)_
- **Default** to inlining icons or using an SVG sprite built from `icons/line/`; do not convert them to an icon font.
  _(Proposed)_
- **Always** keep the supplied files as the source; optimize copies, not the originals. _(Proposed)_

**Why** `currentColor` lets one file serve every state, and SVG avoids the accessibility and rendering problems of icon
fonts.

**Example** `<svg>` inline from `icons/line/check.svg`, colored by the surrounding text color.

**Bend when** A platform needs raster icons (store listings): export PNGs from the SVG at the platform's sizes.

**Prior art** SVG sprites and inline SVG replaced icon fonts across Material, GitHub Primer and Carbon.

