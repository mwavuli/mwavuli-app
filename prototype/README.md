# Prototype 09: shelter-character (SNT-38)

**Shelter Character.** The roof is the brand's character: roofs of every size whose window squares light up gold.

**References and moves borrowed**
- Nest DC: a brand character as the face of the hero (the bird becomes the roof) and repeated to the footer; a big
  brand-colour field with one friendly line; oversize numerals on flat fields; tiles with a brand-colour glyph.
- Get Living: a heavy typographic hero with one button; a white card overlapping a framed image; colour-block rhythm
  (Green, cream, sage-100, white, green-50); short human headings in the F-voice.

**Distinctive**
- Nested roofs at the logo's slope (L2 geometry, a gold band along the roof, M3) bleed off the edge. The mark's window
  grid lights up on load and on scroll; each room warms on hover. Without JavaScript or with reduced motion: all lit.
- "Six services. One roof.": a roof-shaped container, the headline under the peak, six rooms with pictogram badges.
- The page ends under a Green house that stands on the footer.

**Brand rules that shaped it** M1, M2 (slot only), M3, M6, L2, L4, L5, C2, C3 (new pairs computed), C4, F5, F6, I7, S1,
S3, S4, S8, S9, T5, T9. Skeleton defects fixed: lockups h-12, buttons rounded-md and min-h-12. Roofs are the roof form
built to L2 geometry, never the logo file.

**Imagery** Flat roof-form compositions (solid tones, no gradients), Green pictograms on badges, one photo slot (D14):
square crop, layered tonal planes, M2 pattern on its light field, caption on a solid Green band (M6).

**Deliberate bends**
- S3 (Default): the two house containers have square corners. They are roof forms, and M1 (Always) asks for straight edges.
- M4 (Avoid): the first view shows the headline's gold rule and the gold band along the big roof (M3).
- T3 (Default): hero, closing line and numerals are set above the `display` token, same line-to-size ratio, with clamp.

**Placeholders** The photo slot; "Phone number to be added"; "Email address to be added". The form is design only: Send is
`type="button"` and sends nothing.

**New copy for the owner to approve** Hero overline "For property owners in Kampala" and button "Talk to us about your
building"; labels "Our promise", "Rent day", "Our fee", "Leaving", "Who we are", "Who we serve", "How to reach us"; headings
"Three things to remember.", "Six services. One roof.", "Big roof or small. The same terms."; the six service lines (from
BM1, BM2, BM18); the unit chips (BM9); form labels, "Send" and "Design only. This form does not send anything yet."

**Run** `pnpm dev --port 4409 --host 127.0.0.1`, `pnpm build`, `pnpm preview --port 4409 --host 127.0.0.1`.
Screenshots: `prototype/desktop.jpg` (1440 wide) and `prototype/mobile.jpg` (393 wide), taken from the build.
