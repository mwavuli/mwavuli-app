# Mwavuli brand and design language

Status: version 0.1, draft for owner review. Ticket SNT-24. First extraction on 2026-11-09.

The formal brand and design language for Mwavuli Property Management: what the brand stands for, how its logo, color,
type, icons, layout and imagery are built, and how they are applied to the site, the product, print and signage. It is
extracted from the brand board the owner supplied and from the 90 by 40 mm business card that was designed and approved
against it, and it fills the gaps with proposals that are clearly marked and open for decision.

## How to read

Each file is a set of concerns. A concern carries an ID in its heading, one line stating its strength and source, and
five parts: **Rules**, **Why**, **Example**, **Bend when** and **Prior art**. Examples are values and layouts, not code.

**Strength.** Every rule starts with one of six words.

| Word     | Meaning                                                                                                  |
|----------|----------------------------------------------------------------------------------------------------------|
| Always   | Owner-declared house rule, or a correctness and accessibility floor. Breaking it needs an owner decision |
| Default  | The expected choice; deviate only where "Bend when" allows                                               |
| Prefer   | Better than the alternatives in most cases                                                               |
| Consider | Worth weighing; a good choice in some cases                                                              |
| Avoid    | Usually wrong; allowed with a reason                                                                     |
| Never    | Owner-declared prohibition, or a correctness and accessibility floor                                     |

**Source.** Each rule, and each concern, says where it comes from, so what the owner declared stays separate from what
was inferred.

| Tag        | Meaning                                                                             |
|------------|-------------------------------------------------------------------------------------|
| Board      | Stated or shown on the brand board                                                  |
| Board mock | Shown only in a mock-up on the board (the app screen, the sign, the polo, the card) |
| Card       | Decided during the business card work and approved by the owner                     |
| Proposed   | Inferred or added to make the language complete; open until the owner approves it   |

**IDs.** Concerns are a group letter and a number (F1, L4, C3). Open decisions are D1 to D17. Assets have their own IDs:
line icons IC01 and up, service pictograms PG1 to PG6, contact badges BG1 and BG2, logo files LG01 to LG10. To approve,
name the IDs: "approve D5 to D8".

## Map

| File                                            | Group | Settles                                            |
|-------------------------------------------------|-------|----------------------------------------------------|
| [00-inventory](00-inventory.md)                 |       | Every concern, open decisions, trace to the board  |
| [01-foundation](01-foundation.md)               | F     | Purpose, essence, audience, voice, formats         |
| [02-logo](02-logo.md)                           | L     | Lockups, geometry, colorways, clear space, misuse  |
| [03-color](03-color.md)                         | C     | Palette, roles, contrast, states, print builds     |
| [04-typography](04-typography.md)               | T     | Families, scales for screen and card, setting      |
| [05-layout](05-layout.md)                       | S     | Spacing, grid, radii, elevation, rules, margins    |
| [06-iconography](06-iconography.md)             | I     | Icon families, construction, catalog               |
| [07-motif-and-imagery](07-motif-and-imagery.md) | M     | Roof motif, pattern, corner motif, photography     |
| [08-applications](08-applications.md)           | A     | Card, signage, uniform, print checklist, app, site |
| [09-governance](09-governance.md)               | G     | Ownership, versioning, accessibility, deviations   |

## Assets

| Folder             | Contents                                                                     |
|--------------------|------------------------------------------------------------------------------|
| `tokens/`          | `mwavuli.tokens.json` (source of truth) and `mwavuli.tokens.css` (generated) |
| `icons/line/`      | 31 line icons on a 24 px grid, `currentColor`                                |
| `icons/pictogram/` | Six service pictograms and two contact badges                                |
| `logo/`            | Ten logo files: lockups, mark, app icon                                      |
| `preview/`         | `icons.png` and `logo-kit.png`, generated contact sheets                     |
| `tools/`           | `check_docs.py`, the consistency check for this folder                       |

Use the tokens on a page with one line, then the CSS custom properties are available as `--mw-*`:

```
<link rel="stylesheet" href="brand/tokens/mwavuli.tokens.css">
```

## Checking

Run `python3 brand/tools/check_docs.py` from the repository root. It checks the inventory against the headings, every
relative link, code fences, table alignment, line width and the asset files named in the catalogs. Run it on the
unchanged tree first.

## Changelog

- 0.1 (2026-11-09): first extraction from the brand board and the business card set; 72 concerns, 17 open decisions.

