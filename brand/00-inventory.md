# 00 · Inventory

Every concern in the language, the decisions still open and the trace from the board to the rules. Concerns are listed
in the order of the files. The strength is the concern's headline strength; the source lists every origin its rules draw
on. Run `tools/check_docs.py` after any change; it compares this file with the headings.

## Totals

| Group | Name              | Concerns | Always | Default | Prefer | Consider | Avoid | Never |
|-------|-------------------|----------|--------|---------|--------|----------|-------|-------|
| F     | Foundation        | 8        | 4      | 3       | 1      | 0        | 0     | 0     |
| L     | Logo              | 9        | 3      | 4       | 1      | 0        | 0     | 1     |
| C     | Color             | 7        | 2      | 3       | 1      | 0        | 0     | 1     |
| T     | Typography        | 9        | 2      | 5       | 2      | 0        | 0     | 0     |
| S     | Layout and space  | 9        | 2      | 4       | 3      | 0        | 0     | 0     |
| I     | Iconography       | 11       | 5      | 6       | 0      | 0        | 0     | 0     |
| M     | Motif and imagery | 7        | 2      | 2       | 2      | 0        | 1     | 0     |
| A     | Applications      | 6        | 1      | 3       | 2      | 0        | 0     | 0     |
| G     | Governance        | 6        | 3      | 2       | 0      | 1        | 0     | 0     |
|       | Total             | 72       | 24     | 32      | 12     | 1        | 1     | 2     |

A concern can draw on more than one source:

| Source tag | Concerns that use it |
|------------|----------------------|
| Board      | 30                   |
| Board mock | 2                    |
| Card       | 21                   |
| Proposed   | 39                   |

## Concerns

### F · Foundation

| ID                     | Concern                    | Strength | Source         |
|------------------------|----------------------------|----------|----------------|
| [F1](01-foundation.md) | Purpose and promise        | Always   | Board          |
| [F2](01-foundation.md) | Essence pillars            | Always   | Board          |
| [F3](01-foundation.md) | Audience and positioning   | Default  | Proposed       |
| [F4](01-foundation.md) | Personality                | Always   | Board          |
| [F5](01-foundation.md) | Voice and tone             | Default  | Card, Proposed |
| [F6](01-foundation.md) | Taglines and copy patterns | Prefer   | Board, Card    |
| [F7](01-foundation.md) | Naming and descriptor      | Always   | Board, Card    |
| [F8](01-foundation.md) | Local formats              | Default  | Proposed       |

### L · Logo

| ID               | Concern               | Strength | Source          |
|------------------|-----------------------|----------|-----------------|
| [L1](02-logo.md) | Lockups               | Always   | Board, Card     |
| [L2](02-logo.md) | Master geometry       | Always   | Card            |
| [L3](02-logo.md) | Colorways             | Always   | Board           |
| [L4](02-logo.md) | Clear space           | Default  | Proposed        |
| [L5](02-logo.md) | Minimum size          | Default  | Proposed        |
| [L6](02-logo.md) | Grounds and placement | Default  | Proposed        |
| [L7](02-logo.md) | App icon and tiles    | Default  | Board           |
| [L8](02-logo.md) | Dimensional signage   | Prefer   | Board           |
| [L9](02-logo.md) | Misuse                | Never    | Board, Proposed |

### C · Color

| ID                | Concern              | Strength | Source          |
|-------------------|----------------------|----------|-----------------|
| [C1](03-color.md) | Core palette         | Always   | Board           |
| [C2](03-color.md) | Roles and proportion | Default  | Board, Proposed |
| [C3](03-color.md) | Contrast pairs       | Always   | Proposed        |
| [C4](03-color.md) | Gold discipline      | Never    | Card, Proposed  |
| [C5](03-color.md) | Ramps and neutrals   | Prefer   | Proposed        |
| [C6](03-color.md) | State colors         | Default  | Board, Proposed |
| [C7](03-color.md) | Print builds         | Default  | Card            |

### T · Typography

| ID                     | Concern                     | Strength | Source      |
|------------------------|-----------------------------|----------|-------------|
| [T1](04-typography.md) | Families                    | Always   | Board       |
| [T2](04-typography.md) | Weights                     | Default  | Card        |
| [T3](04-typography.md) | Digital scale               | Default  | Proposed    |
| [T4](04-typography.md) | Print scale (business card) | Default  | Card        |
| [T5](04-typography.md) | Case and tracking           | Default  | Board, Card |
| [T6](04-typography.md) | Text color                  | Always   | Proposed    |
| [T7](04-typography.md) | Measure and rhythm          | Prefer   | Proposed    |
| [T8](04-typography.md) | Loading and fallbacks       | Default  | Proposed    |
| [T9](04-typography.md) | Figures and data            | Prefer   | Proposed    |

### S · Layout and space

| ID                 | Concern                        | Strength | Source      |
|--------------------|--------------------------------|----------|-------------|
| [S1](05-layout.md) | Spacing scale                  | Default  | Proposed    |
| [S2](05-layout.md) | Grid and containers            | Default  | Proposed    |
| [S3](05-layout.md) | Radii                          | Default  | Board, Card |
| [S4](05-layout.md) | Elevation                      | Prefer   | Board mock  |
| [S5](05-layout.md) | Dividers and rules             | Default  | Card, Board |
| [S6](05-layout.md) | Margins and safe zones (print) | Always   | Card        |
| [S7](05-layout.md) | White space and grouping       | Prefer   | Card        |
| [S8](05-layout.md) | Touch targets and focus        | Always   | Proposed    |
| [S9](05-layout.md) | Motion                         | Prefer   | Proposed    |

### I · Iconography

| ID                       | Concern                | Strength | Source          |
|--------------------------|------------------------|----------|-----------------|
| [I1](06-iconography.md)  | Families               | Always   | Board, Card     |
| [I2](06-iconography.md)  | Grid and live area     | Always   | Proposed        |
| [I3](06-iconography.md)  | Stroke and corners     | Always   | Board, Proposed |
| [I4](06-iconography.md)  | Color and state        | Default  | Board, Proposed |
| [I5](06-iconography.md)  | Sizes and alignment    | Default  | Proposed        |
| [I6](06-iconography.md)  | Catalog and naming     | Always   | Board, Proposed |
| [I7](06-iconography.md)  | Service pictograms     | Default  | Card            |
| [I8](06-iconography.md)  | Contact badges         | Default  | Card            |
| [I9](06-iconography.md)  | Adding an icon         | Default  | Proposed        |
| [I10](06-iconography.md) | Accessibility of icons | Always   | Proposed        |
| [I11](06-iconography.md) | Files and use          | Default  | Proposed        |

### M · Motif and imagery

| ID                            | Concern              | Strength | Source      |
|-------------------------------|----------------------|----------|-------------|
| [M1](07-motif-and-imagery.md) | Roof motif           | Always   | Board       |
| [M2](07-motif-and-imagery.md) | Tone-on-tone pattern | Prefer   | Board       |
| [M3](07-motif-and-imagery.md) | Corner motif         | Default  | Card, Board |
| [M4](07-motif-and-imagery.md) | Gold rule            | Prefer   | Board, Card |
| [M5](07-motif-and-imagery.md) | Photography          | Default  | Board       |
| [M6](07-motif-and-imagery.md) | Text over images     | Always   | Proposed    |
| [M7](07-motif-and-imagery.md) | Illustration         | Avoid    | Proposed    |

### A · Applications

| ID                       | Concern                    | Strength | Source               |
|--------------------------|----------------------------|----------|----------------------|
| [A1](08-applications.md) | Business card              | Default  | Card                 |
| [A2](08-applications.md) | Signage                    | Prefer   | Board                |
| [A3](08-applications.md) | Uniform                    | Prefer   | Board                |
| [A4](08-applications.md) | Print production checklist | Always   | Card                 |
| [A5](08-applications.md) | Product interface          | Default  | Board mock, Proposed |
| [A6](08-applications.md) | Website                    | Default  | Proposed             |

### G · Governance

| ID                     | Concern                   | Strength | Source   |
|------------------------|---------------------------|----------|----------|
| [G1](09-governance.md) | Ownership and approval    | Always   | Proposed |
| [G2](09-governance.md) | Versioning and change     | Always   | Proposed |
| [G3](09-governance.md) | Asset locations and names | Default  | Proposed |
| [G4](09-governance.md) | Accessibility baseline    | Always   | Proposed |
| [G5](09-governance.md) | Deviations                | Default  | Proposed |
| [G6](09-governance.md) | Review cadence            | Consider | Proposed |

## Open decisions

Approve by ID, for example "approve D5 to D8". A decision stays open until the owner answers; the recommended default is
what the language assumes meanwhile.

- **D1** Primary tagline and campaign line (F6). Recommended: "Your Property. Our Responsibility." as tagline; "Managed
  Properties. Better Living." as campaign.
- **D2** Use the meaning of the name (Swahili: umbrella) (F7). Recommended: Use sparingly in About copy, after the owner
  confirms.
- **D3** Audiences and positioning line (F3). Recommended: Adopt the three audiences and the positioning line.
- **D4** Web address (board mock shows www.mmavuli.ug) (A1, A6). Recommended: Confirm the real domain, then use it
  everywhere.
- **D5** Master logo geometry; card back uses an earlier measurement (L2). Recommended: Adopt the card-front geometry;
  align the back at reprint.
- **D6** Clear space and minimum sizes (L4, L5). Recommended: One eighth of the lockup width; the minimums in L5.
- **D7** Error color Brick #A63A2B as the one functional extension (C6). Recommended: Adopt, so errors pass contrast.
- **D8** Ramps and semantic color roles (C5, C6). Recommended: Adopt as in the tokens.
- **D9** Gold job title on cream on the printed card (2.17 to 1) (C4, T4). Recommended: Keep for this run if the proof
  is approved; Green at reprint.
- **D10** Print builds and physical color matching (C7, A3). Recommended: Re-separate with the printer profile; match
  sign, vinyl and thread.
- **D11** Type scale and self-hosted fonts (T3, T8). Recommended: Adopt the scale; self-host Montserrat and Inter.
- **D12** Spacing, grid and breakpoints (S1, S2). Recommended: Adopt the 4 px scale, 12 columns and four breakpoints.
- **D13** Icon stroke weight and contact badge style (I3, I8). Recommended: 1.5 px stroke; Green rounded-square badges.
- **D14** Photography source and licensing (M5). Recommended: Commission shoots of managed properties; log stock
  licenses.
- **D15** Services list: names, order and icons (I7, A1). Recommended: Freeze the six services as on the card.
- **D16** Formats: clock, dates, phone forms (F8). Recommended: Adopt the forms in F8.
- **D17** Print files in the repository (A4). Recommended: Add the 90 by 40 mm PDFs under print/ without personal
  details.
- **D18** WhatsApp group avatars (L3, L6, L7). Chosen by the owner on 2026-11-12: the app icon on a full-bleed square,
  one core ground per group. General is Green with the gold mark, Finance Gold with the green mark, Ops Slate with the
  gold mark and Support Mist Cream with the green mark. The Slate ground bends L6 and the all-green mark on cream bends
  L3. Recommended: Fold into an applications concern at the next minor version.

## Trace from the board

| Board region                                      | Concerns       |
|---------------------------------------------------|----------------|
| Brand Purpose paragraph                           | F1             |
| Brand Essence (four pillars and icons)            | F2, I6         |
| Logo System: Primary, Dark / Reversed, Icon / App | L1, L3, L7     |
| Color Palette (five core colors and roles)        | C1, C2, C6     |
| Typography (Montserrat, Inter)                    | T1             |
| Visual Style list                                 | F4             |
| Iconography (core set)                            | I1 to I6       |
| Pattern and Brand Motif                           | M1, M2, M3     |
| Hero photograph and headline                      | F6, M5, M6     |
| App mock (header, list card, tab bar)             | A5, S3, S4, I4 |
| Signage mock                                      | L8, A2         |
| Polo mock                                         | A3             |
| Business card mock                                | A1, I8, D4     |

## Assets

| Family             | Count | Folder             | IDs                 |
|--------------------|-------|--------------------|---------------------|
| Line icons         | 31    | `icons/line/`      | IC01 to IC31        |
| Service pictograms | 6     | `icons/pictogram/` | PG1 to PG6          |
| Contact badges     | 2     | `icons/pictogram/` | BG1, BG2            |
| Logo files         | 10    | `logo/`            | LG01 to LG10        |
| Token files        | 2     | `tokens/`          | JSON source and CSS |
| Preview sheets     | 2     | `preview/`         | icons, logo kit     |

