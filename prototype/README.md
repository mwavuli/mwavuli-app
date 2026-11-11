# Prototype 06 · Proof band (SNT-38)

**Concept.** Enterprise gravitas through numbers and structure: the five figures of the landlord agreement on a white tray that rises over a Green hero, then bands that each change build and ground (Green, white, sage-100, cream).

**References and moves borrowed**
- Knight Frank: a numbers band with large numerals and short captions; dark and light bands alternating; a header with one filled contact button; alternating two-column editorial blocks.
- JLL: a white tray overlapping the hero's lower edge; structured navigation with a dropdown panel (CSS-only `details`/`summary`, the six services); "Explore more" rows (the tray's three jump links).

**Distinctive.** A 160 px "15%" lead figure beside a ledger of four. No two bands built alike: tray, slot strip bleeding off the page with an overlapping statement card, pictogram cards, a 30:14 proportional bar, a four-slot strip, a form card. Layered 43-degree roof bands and the mark's window grid as hero art (gold is a small part of the motif).

**Brand rules that shaped it.** F1, F5 to F7 (copy, two-beat headlines); L1, L3 to L6 (h-12 lockup, 24 px clear space); C1 to C4 (new pairs computed: green on green-50, 100 and 300; slate and green on sage-100; gold-700 only as large text); T1, T3, T5; S3 to S5, S8, S9; I4, I5, I7, I10 (pictograms 32 px and up); M1 to M4, M6; A5, A6. Header and footer lockups are h-12; buttons are rounded-md and 48 px (skeleton defects fixed, 404 included).

**Imagery.** Photo-slot strips: a 5:2 slot in the Rent band and a four-slot strip (rooms and flats, small blocks, shops, offices). Each is layered flat tonal planes built from the roof form and the window grid, with the M2 roof pattern on light grounds only and the caption "Photograph to come (D14)" on a solid Green chip.

**Deliberate bends**
- S2 (Default): 24 px page margin at 393 px, not 16, so the h-12 lockup keeps its L4 clear space and one left edge runs down the page.
- A5 (Default): inputs have a slate-500 border, not border.default, so the field edge reaches 3 to 1 (C3, Always).
- A5 (Default): on Green the primary button is white with Green text, the reversal of Green with white text.
- T9 (Prefer): proof numerals are Montserrat display type with tabular figures, not Inter; the statement amounts stay Inter.
- T3 (Avoid): more than four sizes in one view; the hero scales the display size up, and the proof band adds a lead-figure size.

**Placeholders.** "Phone number to be added" and "Email address to be added" (no `tel:` or `mailto:`); photographs (D14). The form is design only: its button does nothing and nothing is sent.

**New copy for the owner to approve**
- Labels: The figures; Leaving; Who we manage; Contact us; Talk to us; See the figures; For landlords in Kampala; Six services, one agreement; How we pay you; How repairs work; How leaving works; Notice; Final payment.
- Headlines: Five Numbers. All in Your Agreement.; One Payment. One Statement.; We Find the Contractor. You See the Price.; Leave Any Time. Be Paid Within 14 Days.; Homes and Business Premises.
- Six service lines (Services panel) and five figure captions, worded from BM1 to BM9, P8 and the landlord agreement.
- Examples: Example statement, 1st April; A tap; A roof; Below UGX 200,000; Above UGX 200,000; Illustration, not a quote.
- Other: Renting from a landlord we manage?; Tell us about your building; Your name; Your phone number; Where is your building?; Send your details; This form is a design only. It sends nothing yet.

**Run.** `pnpm install`, `pnpm dev --port 4406 --host 127.0.0.1`, `pnpm build`, `pnpm preview --port 4406 --host 127.0.0.1`. Screenshots: `desktop.jpg` (1440 wide), `mobile.jpg` (393 wide).
