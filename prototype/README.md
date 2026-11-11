# Sentence hero (SNT-38, prototype 12)

**Concept:** the hero is a sentence the visitor completes ("I’m an owner and I want to know when I’m paid.") and the matching plain statement appears at once.

## References and moves borrowed
- Savills: the hero as an interactive sentence on a calm flat field, changeable words in the accent colour with a dotted underline and a chevron.
- Savills: a row of big plain figures as proof (1st, 15%, 30 days, the pitch's three numbers, BM18).
- Strutt & Parker: one prominent white box that turns a wish into a result (the answer card) and one next step ("Talk to us").
- Strutt & Parker: heavy left-aligned headings, a quiet services row, and sections that differ in build and ground.

## Distinctive
- Native selects sit invisible over a wrapping face: giant type wraps, the OS picker opens, keyboard and screen readers work. About 25 lines of JS; with JS off all ten answers show as a stacked list.
- Layered flat roof bands (lighter, darker, gold trim) bleed off the hero behind the card; tonal roofs rise from the footer at Contact.
- Four screens at 1440, one gold device per block, no photography.

## Brand rules that shaped it
F1, F5, F6, C2 to C4, L4, L5, T1 to T3, T5, S3 to S5, S8, S9, M1, M3, M4, I5, I7, I8, I10, A5, A6, G4. Tokens only (no hex, no gradients); reversed and primary lockups at h-12 with 24 px clear space; buttons are `rounded-md`, 48 px.

## Imagery
None. One roof glyph (`RoofGlyph.astro`: 43 degrees, band thickness a fifth of the width, gold about a tenth of the motif), the six pictograms and the contact badges.

## Deliberate bends
- F6 (Default): the H1 is all white, not white then gold; C2 asks for few gold areas and the sentence and roof trim carry the gold.
- C2 (Avoid): the first screen shows gold in the choices, the knobs and the roof trim (choices and knobs are one device).
- T3 (Avoid): more than four type sizes on the first screen (giant sentence, H1 and lead, support, link and hint, overline); the card is self-contained.

## Placeholders
Phone number and email are labelled placeholders (no `tel:` or `mailto:`). There is no form: the selects only choose which answer shows.

## New copy for the owner to approve
- Sentence: "I’m", "and I want to know"; an owner, a tenant, a business; when I’m paid, what it costs, what happens if a tenant does not pay, how to leave, who does repairs; how I pay, what happens to my deposit, who fixes things; what you manage, the terms. (Two options extend the brief's labels so the sentence reads correctly.)
- "Choose an underlined word to change it.", "Talk to us", "What do you want to know?" (no-JS), "For owners", "For tenants", "For businesses".
- "Three numbers to remember.", overlines "Services" and "Contact", "Postal address", "Phone", "Email".
- Answers use the model's wording; two edits: the tenant rent line says "in your tenancy form" (clause 2 says "above"), and BM10 is split at its colon. Services are the card's six names in sentence case, with BM18's "we cover that first month" beside "Guaranteed".

## Run
`pnpm dev --port 4412 --host 127.0.0.1`, or `pnpm build && pnpm preview --port 4412 --host 127.0.0.1`. Screenshots: `prototype/desktop.jpg` (1440 wide), `prototype/mobile.jpg` (393 wide).
