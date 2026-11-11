# Prototype 14: Audience nav (SNT-38)

The navigation is the audiences. Owners, Tenants and Businesses each get their own hero, chosen with CSS radios and `:has()`.

## References and the moves borrowed
- Avenue5: the nav items are the audiences, each with a bold bar (a stub at rest, full width when chosen); a giant headline with one accent colour; a corner flag top right, here a roof-cut flag at 43 degrees (M3).
- FirstService Residential: three white cards straddling the hero's bottom edge, here the three plain facts of the chosen audience.
- Both: one plain sentence and one action in the hero; the audience decides the page.

## Distinctive
- The switch is pure CSS and keyboard-operable (arrow keys). Script only opens `/#tenants` links and fades the page in. Without `:has()` all three pages show.
- Three roof compositions tied to their copy: layers of cover (Owners), one roof over one space with an open doorway (Tenants), identical windows for every unit (Businesses). The mark's window grid is scaled up as a composition element.
- The services band is the business-card back: tagline, one gold divider, six big gold pictograms. Oversize numerals (1st, 15%, 30 days) overlap the hero edge.

## Brand rules that shaped it
F5/F6 Title Case, second beat gold; L4/L5 lockup 195 px with 24 px clear space; C3/C4 every pair from the table, gold only large or as marks; T2 weight 750; T5 tracked caps for overlines only; T9 tabular figures; S3/S4 radii, `shadow-md`; S5/M4 one gold rule per view; S8 48 px targets, gold ring on Green; S9 motion tokens, reduced motion; I7 big pictograms; I8 badges; M1/M3 roofs and flag (gold under a fifth); M2 pattern on cream only; A1 card-back band. Skeleton defects fixed: lockups h-12, buttons `rounded-md` at 48 px.

## Imagery
No photographs (D14) and no photo slots. Flat roof-form art built from one slope constant (`src/art/roof.ts`), brand colours only, no gradients.

## Deliberate bends
- S2: phone margins are 24 px, not 16, so the lockup keeps its L4 clear space from the screen edge.
- A5: field borders are slate-500, not border.default, to reach 3:1 (WCAG 1.4.11; C3 and G4 outrank).
- A6: the header floats on the Green hero and carries the tabs instead of a Green call to action; no photograph (D14) and no short gold rule under the headline (the second beat and the flag edge carry the gold).
- T3: the statement and services views use more than four sizes (data and labels). F8: statement titles keep the model's own "1st April".

## Placeholders
Phone and email lines, and what a business tenant can expect, are labelled placeholders. The form is design only: no `<form>`, the button goes to `#contact`. Statements are the model's own examples, labelled "Illustration, not a quote".

## New copy for the owner to approve
Headlines "Rent Paid to You on the 1st.", "Pay Only Mwavuli.", "Shops and Offices. Same Terms."; the Tenants and Businesses leads; card titles (Your deposit, No lock-outs, Repairs); detail headings and overlines; "What we look after"; the six one-line service texts; "Contact us", "Write to us", "Send us a message, or write to us by post.", "Send message".

## Run
`pnpm dev --port 4414 --host 127.0.0.1`, then `/#tenants` and `/#businesses` for the other pages. Or `pnpm build` and `pnpm preview --port 4414 --host 127.0.0.1`. Images: `desktop.jpg`, `mobile.jpg`, `desktop-tenants.jpg`, `desktop-businesses.jpg`.
