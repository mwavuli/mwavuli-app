# Cinematic slides (prototype 04 of 15, SNT-38)
A full-viewport Green hero that plays like a short film: four slides, four roof-form scenes, one pass, then it rests.

**References and moves borrowed**
- Bozzuto: full-viewport hero, huge headline low-left, one thin control row (bar, `02 / 04`, pause), a card row past the container.
- Pam Golding: dark immersive ground and a slow staggered reveal, like a title card.
- Avenue5: one loud accent word per headline (Gold on Green), big plain navigation, planes at one fixed slope (the logo's 43 degrees).

**Distinctive.** The film plays once (9 s a slide), pauses, skips (picker, arrows, swipe), holds on keyboard focus and stops under
reduced motion. Each scene says its line: two roofs (M), rising courses, a roof with a Gold slab of exactly 15 percent, an open roof.
Then colour tiles with oversize numerals, cards straddling a Green band and a designed photo slot.

**Brand.** F6 (two beats), L2 (the mark's window grid), L4/L5 (h-12 lockup, 24 px clear), M1/M3 (flat bands at 43 degrees, cropped, Gold
under a fifth), M2 (pattern on light grounds only), M4, M6 (no text on art), C3/C4, S3/S4/S8, A5, I7, G4. New pairs computed: sage-500
on Green 3.19, white on sage-500 3.08, white on sage-700 5.71, slate-500 on white 3.71.

**Imagery.** Flat roof-form scenes (no photography yet, D14). The hero panel, tile corners, card panels and contact slot are the
frames a photograph will fill; text stays on solid Green (M6).

**Deliberate bends**
- S9 (avoid autoplay and looping; 120/200/320 ms): autoplay once, 640 and 960 ms (multiples of the slow token), pause, picker, arrows,
  swipe, stopped under reduced motion. Bend when: a one-off hero, skippable.
- S2: the services row runs past the container's right edge (aligned to it at both ends); the first screen uses 24 px margins, not 16,
  so the lockup keeps its L4 clear space.
- C2 (three accents in one view): the first screen has the Gold accent word (F6), rule (M4) and roof band (M3) in separate blocks.
- A5 inputs: slate-500 edge (3.7 to 1) instead of border.default (1.5 to 1), for WCAG 1.4.11.
- T3: line height 0.95 on the single-line oversize numerals (not headings).
- I6: no pause or play icon exists, so those controls are words; previous is `chevron-right` turned 180 degrees.

**Placeholders.** "Phone number to be added", "Email address to be added", "Photograph to come (D14)". The form is design only (its
button does nothing). "WhatsApp" is only the channel BM18 names: no link, no number.

**New copy for the owner to approve.** Overlines (Kampala, Uganda; Your rent; Our fee; Your choice); slide leads 2 to 4 and the six card
texts (from BM2, BM4, BM18); Talk to us, Services, Contact, Pause, Play, Replay, Previous slide, Next slide; The offer; Three numbers to
remember.; Six ways we look after your building.; Talk to us.; Tell us about your building. We start by walking it with you. (P4);
Your name, Your phone number, About your building, Send message; Design only. This form does not send yet.

**Checked.** `pnpm build` 0 errors, 0 warnings, 0 hints; 27 behaviour checks pass (autoplay once, pause, picker, keyboard hold, reduced
motion, no JS, services row); no overflow or console errors at 1440, 768 and 393.
**Run.** `pnpm dev --port 4404 --host 127.0.0.1`, then `pnpm build` and `pnpm preview --port 4404 --host 127.0.0.1`.
