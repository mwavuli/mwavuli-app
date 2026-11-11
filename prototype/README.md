# Prototype 07: Owner worries (SNT-38)

Trust through naming the owner's frustration and answering it plainly: one question, then the model's own statements.

## References and moves borrowed (Northpoint)
- Hero: a two-tone question headline with the accent on the frustration, one action, one reassurance line, a floating white navigation bar on the field.
- A strip under the hero that scrolls slowly with a Pause control; plain model statements stand in for the testimonials.
- "Goals" section (headline, copy, one image slot, then the goals) and a dark three-step concierge block with an "example, not a quote" line.
- A "Before you choose a property manager" question set and a closing dark band: message left, how to reach us right.

## What is distinctive
- The proof line is a poster: a giant "1st" card over layered flat roof planes (two tonal planes, one gold band at the logo's slope, the mark's window grid tone on tone) that bleed off the edges. The strip cards straddle the hero's edge.
- "Three things to remember": the pitch's only figures (1st, 15%, 30 days) as oversize numerals; the repair steps climb at the pace of a roof; a roofline "M" stands on the closing band.
- Grounds change every section (Green, cream, sage, white, dark green, cream, Green); no two neighbours are built alike. The page is 4.7 screens at 1440.

## Brand
F1, F5, F6, F8, L1, L3 to L5, C2 to C4, T1 to T3, T5, T9, S1 to S5, S8, I1, I7, I8, I10, M1 to M4, A5, A6. Tokens only (no hex, rgb, gradient or pill); buttons 48 px, rounded-md; lockups 195 px (h-12) with L4 clear space; gold text only at large sizes.

## Imagery
No photograph. One slot (goals section, bleeds off the left edge): Mist Cream field, M2 roof pattern, three flat tonal roof planes with window grids, crop marks and the caption "Photograph to come (D14)" on a solid chip.

## Deliberate bends
- S9 (Avoid looping animation): the strip moves at about 12 px a second, only with JavaScript on and motion allowed; it has Pause/Play, pauses on hover and is a static grid otherwise. No motion token covers a loop (they stop at 320 ms).
- T3 (Default scale; Avoid more than four sizes in a view): the hero display is fluid to 68 px and the numerals run 80 to 160 px.
- C2 (Avoid three or more gold areas in a view): the hero has the gold phrase, rule and one thin roof band (under a fifth of the motif).
- F6 and A6 (Prefer a two-beat headline; photograph in the hero): the hero is the question the brief asks for; the two-beat tagline closes the page.
- L4 (Default clear space): below 400 px the header drops its button, so the lockup keeps its space.

## Placeholders
"Phone number to be added", "Email address to be added". The only contact fact is the P.O. Box. No forms.

## New copy for the owner to approve
- Hero "Want your rent on the 1st, without the chasing?"; "Talk to us"; nav "What we do", "Repairs", "Questions"; "No sign-up fee and no letting fee." (model wording).
- Strip: "In plain words", Pause/Play and the six worries ("When..." style questions above each statement).
- "Three things to remember"; "What do you want from your building?"; goals "Be paid on the 1st", "Keep your rooms let", "Keep the building in good repair".
- "Worried about repair bills?", "We ask you before any big repair.", steps "We bring you the price", "We wait for your YES", "We tell you the same day", "Example, not a quote".
- "Four questions, answered in plain words."; the four question wordings; "Reach us".

## Run
`pnpm dev --port 4407 --host 127.0.0.1`, or `pnpm build` then `pnpm preview --port 4407 --host 127.0.0.1`.
