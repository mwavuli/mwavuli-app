# Prototype 02: Enquiry card (SNT-38)
One white card that starts a conversation: "Tell us about your building", over a Green hero built from roof forms.

**References and moves borrowed**
- Greystar: one large soft-cornered white card is the hero; a quiet bar above; short heading then cards.
- Camden: the card overlaps the field's lower edge so it reads as anchored; big figures; split by hairlines.
- Strutt & Parker: the headline sits straight on the field with one prominent set of inputs beneath it.
- Strutt & Parker and Greystar: tinted tiles with a tone-on-tone pattern; a text panel beside a framed image.

**Distinctive**
The wide card straddles the Green hero under a house built like the mark (outline, four-square window, gold roof
bar); the contact card repeats the move over the footer. No two sections alike: giant figures, steps beside a
photo slot, a "card back" band with big gold pictograms, a bento of tiles.

**Brand rules that shaped it**: F1, F5, F6, M1 to M4, M6, L1, L4, L5, C2 to C4, T1 to T3, S2 to S4, S8, S9, I1, I5, I7, I8, A5, A6, G4.

**Imagery (D14)**: no photography. Flat roof planes at 43 degrees (M3) in the hero; one art-directed photo slot
(layered planes, M2 pattern, Green caption band); line icons on M2 panels; the six pictograms at 144 px.

**Deliberate bends**
- A5 Default: field borders are slate-500 (3.7 to 1), not border.default (1.5 to 1), to meet WCAG 1.4.11 (C3 Always).
- T3 Default: type scaled up (hero 40 to 64 px fluid, pull statement to 72 px, figures to 136 px, weight 750 per
  T2); more than four sizes in the first view (T3 Avoid) because the form needs title, label and body sizes.
- C2 Avoid: the hero has three gold elements (second beat, rule, roof bar); gold stays under 5 percent of its area.
- I5 Default: one decorative tone-on-tone line icon at 352 to 416 px (owners tile), scaled from the SVG.
- S1 Default: the art strip heights and the 128 px card overlap are layout sizes, not gaps on the 4 px scale.
- A5: a white-fill, Green-text button for Green grounds (A5 defines only the light-ground pair).

**Placeholders**: "Phone number to be added", "Email address to be added", the photo slot, the privacy page.
The form is design only: no field has a name, `method="dialog"`, and the button only moves to #contact.

**New copy for the owner to approve**
- Nav: How it works, Services, Who we serve, Contact, Talk to us. Card labels, placeholders and unit ranges.
- Headings: The offer in brief, Three things to remember, For property owners, Step 1 to 3, What we look after,
  Who we serve, For people and businesses, Contact, Talk to us. Step 1 text: "This comes first. We take photos as we go."
- Tiles: Give us your building., Pay only Mwavuli, Shops and offices, Contact us. Hero line "Homes and business
  premises in Kampala and its surroundings." Everything else is quoted from business/model.md and brand F1, F6.

**Run**: `pnpm dev --port 4402 --host 127.0.0.1`, or `pnpm build && pnpm preview --port 4402 --host 127.0.0.1`.
