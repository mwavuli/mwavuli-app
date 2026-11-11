# Phone statement (SNT-38, prototype 11)

The monthly statement is the hero: a flat phone shows "Your statement for 1st April" as a message from Mwavuli Property Management.

## References and moves borrowed
- Roofstock: the headline at the left and one large visual of the product's output (the phone, not a photo).
- Roofstock: a row of oversize numerals under the visual, here the BM18 lines (the 1st, 15%, 30 days), not statistics.
- Roofstock: rounded white cards with a bold title on a tinted band (the three steps); rhythm by alternating grounds.
- Mynd: a calm two-beat promise with one call to action ("Talk to us"); a Green band with big icons (six services).

## Distinctive
- The statement is real text in the phone: the BM18 worked example, labelled "Example"; each step card repeats its own line.
- Layered flat roof bands at 43 degrees bleed off the Green hero; the phone and the step cards overhang the next band.
- Grounds run Green, cream, green-50, Green, sage-100, Green; no two sections are built alike.

## Brand and imagery
Rules: F1, F6, F8, C2 to C4, L1, L4, L5, S2 to S5, S8, I1, I4, I7, I8, M1 to M4, T9, A5, A6, G4. No photograph, so no photo slot: the phone mock (the M2 roof pattern is its chat wallpaper), roof bands, pictograms and numerals carry the page.

## Deliberate bends
- S2: page margin 24 px below 640 px (not 16) so the 195 px header lockup keeps its 24 px clear space (L4).
- T3: H1 72 px, numerals 80 and 96 px, step numerals 128 px sit above display (56 px), as the brief allows; the hero shows more than four sizes because the phone carries its own text.
- C2: the hero has three gold elements (second beat, rule, roof band): F6 and M4 ask for the first two, M3 for the band.
- A5: input borders are slate-500, not border.default, so the field edge reaches 3 to 1 (C3, G4).
- A6: grounds go beyond cream and white (green-50, sage-100, Green) for a richer rhythm, as asked.

## Placeholders
"Phone number to be added" (no tel: link). The form is design only: unnamed fields, a button that goes nowhere. No email.

## New copy for the owner to approve
"Talk to us"; "No sign-up fee. No letting fee." (BM18); "The offer in three lines"; "Step by step"; "How your month works"; "One payment and one statement each month, so you can check your month at a glance." (BM4); "On your statement"; the step and service sentences (BM2, BM4, BM18, P1); "What we look after"; "Give us your building"; "Tell us about your building"; field labels; "Send"; "Postal address"; nav labels.
Phone mock: "SMS or WhatsApp", "1st April", "Example", "Message"; caption "One payment and one statement a month, by SMS or WhatsApp. Example: 10 rooms at UGX 400,000, 9 with tenants. Not a quote."

## Run
`pnpm install --frozen-lockfile --prefer-offline`, then `pnpm dev --port 4411 --host 127.0.0.1`, or `pnpm build` and `pnpm preview --port 4411 --host 127.0.0.1`. Screenshots: `desktop.jpg` (1440 wide), `mobile.jpg` (393 wide).
