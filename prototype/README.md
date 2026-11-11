# Prototype 03: GIANT TYPE (SNT-38)

Concept: the page is carried by oversized Montserrat, one flat roof-form accent and no photographs.

## References and moves borrowed
- BXP: one enormous headline at the foot of a flat first screen, switcher chips directly above it (Owners, Tenants, Businesses change the proof line), full-width bands below.
- AppFolio: stacked huge statements on varied soft grounds, with a small paragraph and one button beside them (the proof card, the three offer bands).
- Northpoint: a two-tone headline with the second phrase in the accent, a ruled title-and-line list (the six services), one clear action repeated.

## Distinctive
- Four-line hero, white "Managed Properties." and gold "Better Living." (one h1, both beats together), 160 px at 1440 (11 vw), filling the width on phones.
- One roof composition: layered flat bands (gold outline, Green 700 band, the mark's four-pane window) bleeding off the right and bottom edges, with a white proof card overlapping them.
- The offer as three full-bleed bands (cream, Green, sage-100) led by oversize figures 1st, 15% and 30, mirrored left and right. The page is 4.5 screens at 1440.
- Chips are radios with :has(), no script. Without :has() the chips hide and all three proof lines show.

## Brand
F1, F3, F5, F6 (copy; tagline white and gold on Green, green and gold on cream); L1, L4, L5 (reversed lockup on Green, h-12, 24 px clear space); C1 to C4 (gold-700 for text on light grounds, core gold only large on Green); T1, T2, T5, T9 (Montserrat 750 to 800, tracked overlines, tabular figures); S3 to S5, S7 to S9 (rounded-md buttons, pills only for chips, shadow-md only on the white form card on cream, focus rings Green and Gold on Green, motion tokens, reduced motion); M1, M3, M4 (one gold rule, in the services view); A5, A6; G4.
Imagery: type, plus the one roof composition (M1, M3). No photographs, pictograms or pattern.

## Deliberate bends
- T3 (Default, Avoid): sizes above the display step (hero 160 px, figures 192 px, closing line 118 px) and tracking tightened to -0.02 to -0.05em. Four sizes or fewer in each section.
- S2 (Default): page margin 24 px at phone width, not 16 px, so the 195 px lockup keeps its L4 clear space and the left edges align.
- A6 (Default): the header sits on Green (reversed lockup, white button) to join the first screen; no photograph (D14), the gold roof band stands in for the gold rule under the headline.

## Placeholders and design-only parts
"Phone number to be added" and "Email address to be added". The contact form is design only: its button is type="button" and sends nothing.

## New copy for the owner to approve
- Proof lines: Tenants "Tell us what is broken. We arrange a trusted contractor." (tenancy form, clause 6); Businesses "We manage shops and offices as well as homes." (BM9).
- Labels: "The offer in three lines", "What we look after for you.", "Services", "Contact us", "Send your details", "Your name", "Your phone number", "Post", "Phone", "Email".
- The offer statements split BM18 at its commas; the six one-line service descriptions are taken from BM18 and BM2.

## Run
`pnpm install --frozen-lockfile`, then `pnpm dev --port 4403 --host 127.0.0.1`, or `pnpm build` and `pnpm preview --port 4403 --host 127.0.0.1`.
