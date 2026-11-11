# Prototype 08: Value icons (SNT-38)

Light, airy and clear: four promises as icon tiles, six services as big pictograms, three fees as oversize figures, and one flat roof form running through all of it.

## Reference and moves borrowed (Next Brick)
- Hero: a kicker (the F1 purpose line) over an oversized left-aligned headline, four icon tiles with one short promise each, then one action.
- Navigation: logo, two text links and one filled primary button.
- The "how we work" icon grid becomes "What we look after": icon, title and one sentence per service.
- Pricing as plain big numerals with short descriptors, then a row of short assurances.
- Generous, even section rhythm with one dense colour band (their stat band becomes the Green costs band; no statistics are invented).

## What is distinctive
- Layered flat roof bands at the logo's slope (one 43-degree constant, `src/geometry/roof.ts`) bleed off the hero edge behind a raised photo-slot card; on phones the roof stands over the slot like a house.
- The four promises sit in one raised panel that overlaps the hero's lower edge.
- Services lead with two cards and the card's own pictograms at 128 px; the costs band is full-bleed Green with gold figures up to 128 px and an M-shaped roofline (two roofs side by side) rising from its top edge.
- Grounds change every section: cream, green-50, Green, cream, Green. One-shot entrance motion only (token durations, none under reduced motion); no JavaScript ships.

## Brand rules that shaped it
F1, F5, F6 (purpose kicker, two-beat headline, plain voice); C2, C3, C4 (grounds, gold-700 only as large text, gold for the beat, stripe and key figures); T1, T2, T9 (Montserrat 720 tagline weight, tabular figures; four sizes per section); S1, S3, S4 (scale steps, 16 and 24 px radii, `shadow-md` on light grounds only); I1, I4, I5, I6, I7, I8, I10 (line icons in tiles, pictograms for services, badges, decorative icons hidden from assistive tech); M1, M2, M3, M6 (roof form, pattern in the slot only, flat bands, solid caption band); L4, L5 (195 px lockup, 24 px clear); A5, A6, S8, S9.

## Imagery strategy
Icon-led. One photo slot (D14): 3:4 on desktop, 4:3 on phones; white mount, M2 roof-pattern field, tonal roof planes and the mark's four-square window, solid Green caption band "Photograph to come (D14)". Everything else is type, icons, pictograms and roof bands.

## Deliberate bends
- A6, M4: no separate gold rule under the hero headline; C2 (Avoid three accent areas in a view) is kept, because the headline's gold second beat and the roof band's gold stripe are already there.
- A5: input borders use `slate-500`, not `border.default`, so the control boundary reaches 3 to 1 (C3, WCAG 1.4.11).
- S2: 24 px page margin on phones (not 16) so the lockup keeps its L4 clear space; the header button is hidden below 360 px for the same reason.

## Placeholders
Photograph (D14); "Phone number to be added"; "Email address to be added". The contact form is a design only: its button sends nothing. The postal address is the only real contact fact.

## New copy for the owner to approve
"Tell us about your building" (button and Contact title); overlines "Services", "Costs", "Contact"; "One team for the rent, the repairs and the bills."; "We charge two fees, and nothing else."; tile lines "For every room with a tenant." / "We take 15% of the rent." / "With 30 days' notice." / "One statement a month."; the six service sentences (from BM1, BM2, BM18); cost labels "Our fee", "To start", "Repairs", the figure "None" and the three cost sentences (BM2, BM4, P7); the two assurances; form labels and "Send".

## Run
`pnpm dev --port 4408 --host 127.0.0.1`, or `pnpm build && pnpm preview --port 4408 --host 127.0.0.1`.
