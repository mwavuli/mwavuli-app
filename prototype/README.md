# Prototype 05: Split Friendly (SNT-38)

A warm, people-first split hero: a big stacked headline on a sage ground against a photo slot that sits over nested roof bands, then big numerals, a services bento, a people band and a contact card.

## References and moves borrowed
- Get Living: the split hero (huge headline on a tinted ground, a large frame at the right, one button); chunky navigation with one solid button; alternating split sections, flipped; a white card over a photo frame; a plain "you" voice.
- Grainger: a floating rounded nav bar on the tinted hero; a rounded frame offset over a coloured angular shape; a friendly card overlapping the frame; rounded cards on tinted panels.
- Rebuilt in Mwavuli terms: the Montserrat scale, flat brand fields and the roof form stand in for serif type and photography. Nothing is copied.

## What is distinctive
- Nested flat gables at 43 degrees (Green, gold, sage-300) behind the slot, cropped by the top, right and bottom edges; the same system, mirrored and recoloured, on the Green people band.
- A big-numerals band for the three numbers a landlord remembers: the 1st, 15% and 30 days (BM18).
- An asymmetric services bento (one Green tile with a 240 px gold pictogram, five rows) and a form card that overlaps the Green footer band.

## Brand rules that shaped it
F1, F2, F5 to F7 (copy); L1 to L6 (lockups at 195 px, 24 px clear); C1 to C4 (contrast computed, gold-700 for large text only); T1 to T3, T5, T9; S1, S3 to S5, S8, S9; M1 to M6; I1, I4, I7, I8, I10; A5, A6; G4.

## Imagery
No photography exists (D14). Two art-directed photo slots (6:5 and 4:3) show the final crop: a cream field with the M2 roof pattern on the light plane only, flat tonal planes at the roof slope, a four-square window grid after the mark, and the caption "Photograph to come (D14)" on a solid Green label. No people, no illustration.

## Deliberate bends
- A5: the input border is slate-500 (3.71 to 1), not border.default (1.5 to 1), because C3 (Always) needs 3 to 1 for control edges.
- A6: sections run sage-100, white, green-50, Green and sage-100 instead of cream and white, to vary the grounds as the round brief asks. Cream is the slot field.
- S1: offsets of 112 to 248 px clear the roof peaks under the 112 px header; the 72 px pictogram plate fits a 48 px pictogram with 12 px around it.
- T3: display type (hero 40 to 75 px, statements, numerals) runs at 1.0 to 1.15 line height, as the display token does (56/64); a hero view carries up to six sizes.
- M6: the caption sits on a solid Green label inset in the slot, not a full-width band, because a full band merged with the Green shape.

## Placeholders
"Phone number to be added" and "Email address to be added", shown as dashed chips, with no tel: or mailto: links. The contact form is design only: its button does nothing and a note says so. The only contact fact is P.O. Box 170886, Kampala, Uganda.

## New copy for the owner to approve
Overlines: The offer, What we do, People first, Contact. Headings: Three things to remember. / Six jobs we take off your hands. / Talk to us. / Tell us about your building. Tenant titles: One place to pay, Tell us when it breaks, Your deposit kept apart. Buttons and links: Talk to us, Send, Services, For tenants, Menu. Form: Your name, Phone or WhatsApp number, About your building, For example, where it is and how many rooms it has, Design preview: this form does not send anything yet. Slot labels (alt text) and the lines in the service tiles, the numbers and the tenant points restate business/model.md and the tenancy form.

## Run
`pnpm install --frozen-lockfile`, then `pnpm dev --port 4405 --host 127.0.0.1` or `pnpm build && pnpm preview --port 4405 --host 127.0.0.1`.
