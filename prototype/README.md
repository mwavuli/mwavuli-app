# Prototype 15: Simple pricing (SNT-38)
The money terms are the hero: a full-bleed Green field, a 256 px gold "15%" and the three "No ..." terms.

## References and moves borrowed
- Wolfnest: the money terms stated plainly, at once, straight under the headline, with the actions beside them.
- Next Brick: pricing as big figures in one white card (15%, 10%, No markup), What you pay / What you get, no tiers.
- Mynd: one confident line as the value (the proof line) and a flat Green field of oversize figures.

## Distinctive
- Scale contrast: a 256 px numeral against 16 px text; a new ground every section (Green, cream, green-50, white, sage-100).
- A rooftop skyline whose cream front row is the hero's bottom edge; the same roofs rise out of the footer.
- Every figure comes from `src/config.ts`; the example statement is computed (3,600,000 - 540,000 - 110,000).

## Brand rules that shaped it
F1/F6 two-beat headline, white and gold on Green; C2 reversed proportions; C3/C4 gold only as large type and key figures;
M1/M3 roof forms at 43 degrees; M4 one gold rule; S3/S4 radii, soft shadows on light grounds only; L4/L5 lockups at h-12;
I1/I7/I8 line icons, Green pictograms, contact badges; S8 focus rings (Gold on Green); S9 one 320 ms entrance; T9 tabular amounts.

## Imagery
No photograph (D14). Only the roof-form skyline (flat houses in tonal planes, the mark's four-square window cut out of one)
and the six pictograms. A photograph can later replace the skyline.

## Deliberate bends
- S2/L4: page margin 24 px on phones (not 16), so the 195 px lockup keeps its 24 px clear space.
- T3: more than four sizes in one view; four larger steps (`giant`, `hero`, `term`, `figure`) sit in a second `@theme` block.
- A6/M4: no gold rule in the hero (the gold beat and numeral carry gold, C2); the one rule is under "Leave any time."
- A5/C3: field borders use slate-500 (3.7:1), not border.default (1.5:1), to meet WCAG 1.4.11.
- Skeleton defects fixed: header and footer lockups h-12, Contact and 404 buttons rounded-md and 48 px.

## Placeholders
"Phone number to be added" and "Email address to be added". The form is design only: its button does nothing and nothing is sent.

## New copy for the owner to approve
- Nav: What you pay, Repairs, Services, Leaving. Buttons: Talk to us, See what you pay, See the six services, Send.
- Headings: Two fees. Both shown to you. / Repairs: the contractor's price plus our 10%. / What we look after. / Talk to us. / Your details.
- Labels: Our fees, What we charge, Example, not a quote, on the quote, Contractor's price, Our 10%, The quote.
- Lines derived from the model: pay and get rows, six service lines, leaving rows, card strip, Tell us about your building.
- "Up to UGX 200,000" is the other side of "above it the landlord says YES" (the model's example says "below").

## Run
`pnpm dev --port 4415 --host 127.0.0.1`, or `pnpm build` then `pnpm preview --port 4415 --host 127.0.0.1`.