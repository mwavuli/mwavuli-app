# 04 · Typography

Two families, a short scale for screens and a measured scale for the business card. Values are in [`tokens/`](tokens/).

## Families and scale

### T1 · Families

*Strength: Always · Source: Board*

**Rules**

- **Always** set headings, brand elements and interface labels in Montserrat. _(Board)_
- **Always** set body text, forms and long text in Inter. _(Board)_
- **Never** introduce a third family. Use weight and size for emphasis. _(Proposed)_
- **Always** convert the wordmark, descriptor and any logo text to outlines; never typeset the logo live. _(Card)_

| Family     | Role                   | Weights            | License | Notes                               |
|------------|------------------------|--------------------|---------|-------------------------------------|
| Montserrat | Headings, brand, UI    | 500, 600, 700, 800 | SIL OFL | Geometric and wide; wordmark at 750 |
| Inter      | Body, forms, long text | 400, 500, 600      | SIL OFL | Tabular figures for amounts         |

**Why** The board's Typography panel assigns the two families and their roles. Both are open-licensed, so they can be
self-hosted and used in artwork and signage without per-seat fees.

**Example** A listing card: title in Montserrat 600, unit count in Inter 400.

**Bend when** A printer or signmaker cannot take the fonts: supply outlined artwork or a PDF with fonts embedded.

**Prior art** A display family plus a text family is the standard two-family system (for example Material Design 3's
display and body roles).

### T2 · Weights

*Strength: Default · Source: Card*

**Rules**

- **Default** to Montserrat 700 for headings, 600 for sub-headings and buttons, and 500 for small labels. _(Proposed)_
- **Default** to Inter 400 for body text, 500 for labels and 600 for emphasis within body text. _(Proposed)_
- **Default** to 750 for large brand display type (the wordmark, a person's name on the card) and 720 for taglines, as
  set on the card. These are variable-font values; use the nearest static weight (700 or 800) where only static fonts
  exist. _(Card)_
- **Avoid** weights lighter than 400 and heavier than 800. _(Proposed)_

**Why** The card artwork was measured against the supplied mock-up and matched at 700 to 750. Variable fonts allow those
in-between weights; static fonts do not.

**Example** Card name line: Montserrat at weight 750. Site H1: Montserrat 700.

**Bend when** Contrast on a dark ground needs a heavier weight (white on Green below 14 px): step up one weight.

**Prior art** Variable-font weight axes (CSS `font-weight` accepts any value from 1 to 1000).

### T3 · Digital scale

*Strength: Default · Source: Proposed*

**Rules**

- **Default** to the scale below. Sizes are in px at the base of 16 px; set in rem. _(Proposed)_
- **Always** keep body text at 16 px or larger and line height at 1.5 for body, 1.2 to 1.3 for headings. _(Proposed)_
- **Prefer** fluid sizing for `display`, `h1` and `h2` between the small and large breakpoints. _(Proposed)_
- **Avoid** more than four sizes in one view. _(Proposed)_

| Token      | Family     | Size / line (px) | Weight | Tracking | Use                      |
|------------|------------|------------------|--------|----------|--------------------------|
| `display`  | Montserrat | 56 / 64          | 700    | -0.01em  | Hero headline            |
| `h1`       | Montserrat | 40 / 48          | 700    | -0.01em  | Page title               |
| `h2`       | Montserrat | 32 / 40          | 700    | 0        | Section title            |
| `h3`       | Montserrat | 24 / 32          | 600    | 0        | Card or panel title      |
| `h4`       | Montserrat | 20 / 28          | 600    | 0        | List title, subsection   |
| `body-lg`  | Inter      | 18 / 28          | 400    | 0        | Lead paragraph, summary  |
| `body`     | Inter      | 16 / 24          | 400    | 0        | Body text, inputs        |
| `body-sm`  | Inter      | 14 / 20          | 400    | 0        | Meta, table body         |
| `label`    | Inter      | 14 / 20          | 500    | 0        | Field labels, navigation |
| `caption`  | Inter      | 12 / 16          | 500    | 0.01em   | Fine print, tab labels   |
| `overline` | Montserrat | 12 / 16          | 600    | 0.16em   | Label above a heading    |
| `button`   | Montserrat | 16 / 24          | 600    | 0        | Button text              |

**Why** A short scale with named steps keeps pages consistent. The sizes follow a roughly 1.25 ratio and land on whole
pixels.

**Example** Property detail page: `h1` for the property name, `body-lg` for the summary, `label` for field names,
`caption` for fine print.

**Bend when** An app screen is very dense (a rent roll table): `body-sm` may carry the body, never below 14 px.

**Prior art** Material Design 3 type scale (display, headline, title, body, label); the modular scale idea of Bringhurst
and of type-scale.com.

### T4 · Print scale (business card)

*Strength: Default · Source: Card*

**Rules**

- **Default** to the sizes below on the 90 by 40 mm card. They were set against the approved artwork. _(Card)_
- **Always** keep every size at or above 4.8 pt on the card, and tracked capitals at 4.8 pt or above. _(Card)_
- **Avoid** setting contact details in gold. _(Proposed)_

| Item                           | Montserrat weight | Size (pt)          | Color     |
|--------------------------------|-------------------|--------------------|-----------|
| Front wordmark                 | 750               | 18.4               | Green     |
| Front name                     | 750               | 12.0               | Green     |
| Front job title                | 700               | 8.1                | Gold (D9) |
| Front phone and place          | 700               | 9.1                | Green     |
| Front descriptor, tracked caps | 700               | 4.8 (0.18 em)      | Green     |
| Back wordmark                  | 750               | 15.9               | White     |
| Back descriptor, tracked caps  | 650               | 5.1 (0.32 em)      | White     |
| Back tagline, first beat       | 720               | 11.0               | White     |
| Back tagline, second beat      | 720               | 10.8               | Gold      |
| Back service label             | 700               | 5.0 on 6.8 leading | White     |

**Why** On a 40 mm tall card the services labels and descriptor lines are the limiting case. They are legible on digital
presses at 5 pt in Bold; below that, move to a larger card or fewer words.

**Example** Back labels: 5.0 pt Bold on 6.8 pt leading, white on Green, centered under a pictogram.

**Bend when** The card grows (for example 90 by 55 mm): scale all sizes in proportion and keep the ratios between lines.

**Prior art** Common minimum sizes for reversed text in print are 6 pt for body and 5 pt for bold labels on digital
stock.

## Setting

### T5 · Case and tracking

*Strength: Default · Source: Board, Card*

**Rules**

- **Default** to sentence case for interface text and Title Case for headlines and taglines. _(Proposed)_
- **Always** reserve tracked capitals for the logo descriptor and short overlines (a label above a heading). _(Card)_
- **Always** track capitals: about 0.18 em on the card's front descriptor, 0.16 em for web overlines. _(Card, Proposed)_
- **Never** letter-space lowercase text, and never set body text in capitals. _(Proposed)_

**Why** Tracked capitals read as a label. Used for sentences they lose legibility and the brand loses its signal.

**Example** Overline "SERVICES" above an H2 "What we manage": Montserrat 600, 12 px, 0.16 em, uppercase.

**Bend when** Never for body text. A short all-caps button label is acceptable at 0.04 em.

**Prior art** Typographic convention: add space to capitals and small sizes, never to lowercase running text.

### T6 · Text color

*Strength: Always · Source: Proposed*

**Rules**

- **Always** use Slate for body text, Green for headings on light grounds, and white or cream on Green. _(Proposed)_
- **Always** use the `text.muted` role for secondary text, never a lighter gray. _(Proposed)_
- **Never** set text in Sage or in gold below large size (C3, C4). _(Proposed)_
- **Avoid** pure black. Slate is the darkest text color. _(Proposed)_

**Why** Slate on cream is 11.35 to 1 and Green on cream 8.84 to 1, both far above AA. A single dark neutral gives a
softer, warmer page than pure black.

**Example** Card body copy in Slate; section title in Green; footer text white on Green.

**Bend when** Print on colored stock changes the ground: check the pair and use the darker of Green and Slate.

**Prior art** WCAG 1.4.3; Material Design 3 uses on-surface and on-primary pairs the same way.

### T7 · Measure and rhythm

*Strength: Prefer · Source: Proposed*

**Rules**

- **Prefer** 45 to 75 characters per line for body text. _(Proposed)_
- **Prefer** space above a heading of at least one and a half times the space below it. _(Proposed)_
- **Avoid** centered paragraphs of more than three lines. _(Proposed)_
- **Always** left-align running text. Center only short headings, taglines and captions. _(Proposed)_

**Why** Line length and spacing do more for readability than the choice of face.

**Example** Article column 40 rem wide (640 px) at 16 px gives about 70 characters.

**Bend when** A narrow column (a sidebar) cannot reach 45 characters: keep the size and reduce line length rather than
shrink the type.

**Prior art** The 45 to 75 character guideline in Bringhurst's *The Elements of Typographic Style*.

### T8 · Loading and fallbacks

*Strength: Default · Source: Proposed*

**Rules**

- **Default** to self-hosted variable fonts (WOFF2) for Montserrat and Inter, subsetted to the Latin range. _(Proposed)_
- **Always** declare `font-display: swap` and a metric-compatible fallback stack as in the tokens. _(Proposed)_
- **Avoid** loading more than two families and four files per page. _(Proposed)_

**Why** Self-hosting avoids a third-party request and keeps the site fast on mobile data; fallbacks keep the layout
stable while the fonts load.

**Example** Fallback for display: Montserrat, Helvetica Neue, Arial, sans-serif. For text: Inter, system-ui, sans-serif.

**Bend when** A page uses only the system font stack for a lightweight error or offline view.

**Prior art** Google Fonts' variable-font delivery and the CSS Fonts Level 4 specification.

### T9 · Figures and data

*Strength: Prefer · Source: Proposed*

**Rules**

- **Prefer** Inter with tabular figures for amounts, units and any column of numbers. _(Proposed)_
- **Always** right-align numeric columns and show the currency code once per column. _(Proposed)_
- **Avoid** abbreviating amounts in tables ("1.2M"); show the full number. _(Proposed)_

**Why** Tenants and owners compare numbers by eye. Tabular figures and right alignment make the decimal places line up.

**Example** Rent roll: Unit, Tenant, Rent (UGX), Due. Rents right-aligned: 1,200,000 and 850,000.

**Bend when** A dashboard tile needs one headline number: abbreviate with the full value in a tooltip.

**Prior art** Inter's tabular-number feature (`tnum`) and the right-aligned numeric column rule in the Material Design
and Carbon data-table guidance.

