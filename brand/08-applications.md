# 08 · Applications

How the language lands in each medium. The business card is the one application that has been built and approved, so its
rules are measured; the others follow the board's mock-ups and are marked as such.

## Print and physical

### A1 · Business card

*Strength: Default · Source: Card*

**Rules**

- **Default** to a 90 by 40 mm trim with 3 mm bleed on every side, 3 mm safe margins, flat CMYK builds from C7 and crop
  marks on a 110 by 60 mm sheet. _(Card)_
- **Always** put the stacked lockup, a vertical gold divider and the contact block on the front, with the halftone fade
  (M3) in the bottom-right corner. _(Card)_
- **Always** put the horizontal lockup, a vertical gold divider and the two-beat tagline in the top group of the back,
  then a horizontal gold divider, then the six services, with no vertical separators. _(Card)_
- **Always** keep contact details in Green and the job title and rule in gold only where D9 allows. _(Card)_
- **Never** commit a person's name or number to this repository; per-person artwork is kept elsewhere. _(Proposed)_

| Element            | Type           | Size                      | Color       |
|--------------------|----------------|---------------------------|-------------|
| Front wordmark     | Montserrat 750 | 18.4 pt                   | Green       |
| Front descriptor   | Montserrat 700 | 4.8 pt, 0.18 em track     | Green       |
| Front name         | Montserrat 750 | 12.0 pt                   | Green       |
| Front job title    | Montserrat 700 | 8.1 pt                    | Gold (D9)   |
| Front phone, place | Montserrat 700 | 9.1 pt                    | Green       |
| Back wordmark      | Montserrat 750 | 15.9 pt                   | White       |
| Back descriptor    | Montserrat 650 | 5.1 pt, 0.3 em track      | White       |
| Back tagline       | Montserrat 720 | 11.0 and 10.8 pt          | White, gold |
| Back service label | Montserrat 700 | 5.0 pt on 6.78 pt leading | White       |

| Rule or margin          | Value                                        |
|-------------------------|----------------------------------------------|
| Front vertical divider  | 0.4 mm, gold                                 |
| Front title rule        | 9.02 by 0.63 mm, gold                        |
| Back vertical divider   | 0.38 mm, gold                                |
| Back horizontal divider | 0.28 mm, gold, full width inside the margins |
| Back margins            | 3 mm on every side                           |

**Why** These are the values of the approved 90 by 40 mm layout, measured from the print files. They let a printer or
another designer rebuild the card exactly.

**Example** The web address, if added, goes on the front under the place line in Montserrat 700 at the phone size,
Green, with a Green rounded-square badge using the `web` glyph (decision D4).

**Bend when** The card size changes: scale all sizes together and keep the margins and the divider rule widths at or
above the minimums in S5 and S6.

**Prior art** Print-ready business card practice (trim, bleed, safe area, crop marks, CMYK flat colors) from common
print supplier specifications.

**Note** The board's card mock shows `www.mmavuli.ug` beside `@mwavuli.ug`. The double "m" looks like an artwork slip;
confirm the real address before printing it (decision D4).

### A2 · Signage

*Strength: Prefer · Source: Board*

**Rules**

- **Prefer** the arrangement in the board's mock: dimensional Slate letters and a gold mark on a pale stone or concrete
  wall, descriptor flat in Slate below. _(Board)_
- **Always** follow L8 for the artwork and L4 for clear space, measured on the finished wall. _(Proposed)_
- **Default** to Montserrat 700 numerals in white or gold on Green plates for unit and wayfinding signs, with a
  roof-slope chevron to point direction. _(Proposed)_

**Why** The board's sign mock is the only physical sign shown. Unit plates reuse the card's colors and type so a tenant
sees one brand from the gate to the door.

**Example** Block entrance: lockup on the wall; stair doors: "B2" in Montserrat 700 white on a Green plate.

**Bend when** A listed building or landlord rule limits wall fixings: use a flat panel with the same artwork.

**Prior art** Signmakers' stand-off letter and plate specifications; wayfinding practice of one consistent numeral
style.

### A3 · Uniform

*Strength: Prefer · Source: Board*

**Rules**

- **Prefer** a Green polo with a gold stripe on the collar and the reversed lockup on the chest, as in the board's mock.
  _(Board)_
- **Always** supply the embroiderer with the outlined SVG and a thread match for Green, gold and white (decision D10).
  _(Proposed)_
- **Avoid** embroidering the descriptor where its letters would be under 3 mm tall; make the lockup large enough, or use
  the mark and wordmark only with the owner's approval. _(Proposed)_

**Why** Thread, fabric and size change how a lockup reads. Naming the file and the colors removes guesswork.

**Example** Right chest: reversed stacked lockup 80 mm wide, gold mark and white wordmark.

**Bend when** A garment is not Green (a hi-vis vest): use the mono-white lockup on a Green patch.

**Prior art** Embroidery digitizing guidelines: minimum letter height of about 3 mm, stabilizer on knits.

### A4 · Print production checklist

*Strength: Always · Source: Card*

**Rules**

- **Always** run this checklist before any file leaves the building. _(Card)_
- **Always** keep a proof signed by the owner for each print run. _(Proposed)_
- **Default** to PDF 1.4 or later with TrimBox and BleedBox set; use PDF/X-4 when the printer asks for it. _(Card,
  Proposed)_

| Check          | Pass condition                                                                |
|----------------|-------------------------------------------------------------------------------|
| Size and boxes | TrimBox equals the finished size; BleedBox is trim plus 3 mm                  |
| Margins        | Text and logos at least 3 mm inside the trim                                  |
| Color          | Only the flat builds in C7; no RGB objects; total ink at or below 230 percent |
| Type           | Converted to outlines, or fonts embedded; no font below its minimum size      |
| Images         | None, or at least 300 ppi at final size and CMYK                              |
| Marks          | Crop marks outside the bleed, in registration color                           |
| Parser         | The file opens in two viewers with no warnings                                |

**Why** These are the checks run on the business card set before delivery. The card files are PDF 1.4, CMYK and
outlined; they have not been certified to PDF/X.

**Example** Card back: TrimBox 90 by 40 mm, BleedBox 96 by 46 mm, sheet 110 by 60 mm, zero fonts, zero images.

**Bend when** A printer's own preflight profile is stricter: follow it and record the change here.

**Prior art** PDF/X-4 (ISO 15930-7) preflight conditions, and the standard 3 mm bleed and 3 mm safe margin.

## Digital

### A5 · Product interface

*Strength: Default · Source: Board mock, Proposed*

**Rules**

- **Default** to the patterns below, which come from the board's app mock and extend it. _(Board mock, Proposed)_
- **Always** build from the tokens, not from the mock's pixels. _(Proposed)_
- **Always** use the four navigation destinations the mock shows: Home, Properties, Payments and More. _(Board mock)_
- **Default** to an app header with the small gold mark and the "Mwavuli" wordmark in Green at the top left of the cream
  page. _(Board mock)_
- **Default** to a greeting in `body-lg` Slate ("Good morning") and section titles in `h4` Green ("Your properties").
  _(Board mock)_
- **Default** to list cards on a white surface with `radius.lg`, `shadow.md`, 24 px padding and rows separated by a 1 px
  `border.default` hairline. _(Board mock)_
- **Default** to a row of a 32 px Green line icon, a title in `h4` ("Residential") and meta in `body-sm` `text.muted`
  ("24 Units"). _(Board mock)_
- **Default** to a tab bar of four items with 24 px icons and `caption` labels; the active item uses `home-solid` (or
  Green plus a bold label) and the others `text.muted`. _(Board mock)_
- **Default** to primary buttons filled Green with white `button` text, `radius.md`, 48 px high; secondary buttons with
  a 1.5 px Green outline; tertiary as Green text. _(Proposed)_
- **Default** to inputs with `body` text, a 1 px `border.default`, `radius.sm`, the label above and a 2 px Green focus
  ring; errors in Brick with the `alerts` icon. _(Proposed)_
- **Default** to status chips as pills in the state colors of C6, each with an icon and a word ("Paid", "Overdue").
  _(Proposed)_

**Why** The board shows one screen. These rules fix what that screen implies (card, row, tab bar) and add the components
any product needs, from the same tokens.

**Example** Rent row: `payments` icon, "March rent", "Due 1 Mar 2026" in `body-sm`, chip "Paid" in `sage-100`.

**Bend when** A platform's native control is required (an iOS date picker): theme it with the tokens and keep native
behavior.

**Prior art** Apple Human Interface Guidelines (tab bars), Material 3 navigation bars and cards.

### A6 · Website

*Strength: Default · Source: Proposed*

**Rules**

- **Default** to a cream page with a header (horizontal lockup, navigation, one Green call to action), a hero
  (photograph, green band, two-beat headline, gold rule), alternating cream and white sections, and a Green footer with
  the reversed lockup. _(Proposed)_
- **Always** use the tokens, the line icons and the services in this language, and load fonts as in T8. _(Proposed)_
- **Always** meet WCAG 2.2 AA: landmarks, a skip link, focus rings (S8), alt text and labeled forms. _(Proposed)_
- **Default** to a 1200 by 630 px social image: reversed lockup on Green with the tagline in white and gold.
  _(Proposed)_
- **Always** set the page title as "Page name · Mwavuli Property Management". _(Proposed)_

**Why** The site is the repository's main product. These defaults give a first page that already looks like the card and
the app, without waiting for a full design.

**Example** Home: hero "Managed Properties. Better Living."; services strip with six line icons; contact section with
badges; footer with the reversed lockup.

**Bend when** A campaign landing page needs a different shape: keep the header, footer, tokens and tone.

**Prior art** GOV.UK page structure (landmarks, skip link, one primary action) and WCAG 2.2.

