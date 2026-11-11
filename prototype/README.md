# Sticky Story (SNT-38, prototype 10)
A slow, premium story where the visual stays while the words change: four steps beside one house that never leaves the screen.

## References and moves borrowed
- Pam Golding: a full-bleed first screen with text-only navigation floating on it, no bar; one idea per screen, left words, right visual.
- Pam Golding: a Green sign-off footer with a two-beat line. Bozzuto: a giant stacked headline with one action under it.
- Bozzuto: a large rounded panel with its progress row ("02 / 04") under it; overline plus big headline openers; Green and light bands.

## Distinctive
- One sticky 4:5 panel swaps as the steps scroll (IntersectionObserver, about 20 lines, no scroll-jacking). Panels are opaque, so the shared house never flickers in the dissolve. Without scripting, or below 1024 px, the panels stack with their words.
- Layered tonal roof bands at the logo slope bleed off the edges. A cream key-figure card overlaps the gold roof line in the hero; the form card overlaps a light band.
- Grounds change every section (Green, white, Green, cream, Green). Big key figures (1st, 15%, 30 days) and 256 px pictograms.

## Brand
F1, F6 (two beats), L3 and L5 (reversed lockup, 195 px), C2 and C3 (gold about 8% of the hero bands), T1, S3, S4, S8, S9, I1 (one icon family per group), I5, I8, M1 to M4, A5, A6, G4.

## Imagery
No photograph and no photo slot. Flat compositions: a cream house at the roof slope with a gold roof line, the mark's window of four squares, Green pictograms and line icons. A photograph (D14) can later replace a panel in the same 4:5 frame.

## Deliberate bends
- S3: the progress dots are circles (step toggles, not controls). A5: field borders are slate-500, not border.default, to reach 3:1 (WCAG 1.4.11; G4 outranks the Default).
- T3: more than four type sizes in the hero and recap views; the poster headline and key figures are the concept. C2: the hero shows gold in the headline, the rule and the roof band.
- A6: the header floats over the hero with an outlined Contact button, not a Green one.

## Placeholders
"Phone number to be added". The form is design only: Send does nothing. The proof line is set as a three-line lockup. Photography waits on D14.

## New copy for the owner to approve
See how it works; How it works; Four steps, in plain words.; Step 1 of 4 (to 4); In three lines; Three things to remember.; Give us your building.; We walk it with you first.; Tell us about your building; Your name; Your phone number; Where is your building?; Send; Postal address; Phone. The four step chips restate BM18, BM11, BM4 and BM8; the tagline in the footer is F6.

## Run
`pnpm dev --port 4410 --host 127.0.0.1`, then `pnpm build` and `pnpm preview`. The stills are taken with scripting off (the stacked fallback), because one still cannot show four states of a sticky panel.
