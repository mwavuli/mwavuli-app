# mwavuli-site

The **Mwavuli Property Management** site: a static [Astro](https://astro.build) build on the same stack and
structure as [nyange-site](https://github.com/nyange-app/nyange-site). The repository also holds the brand and
design language ([`brand/`](brand/README.md)) and the business documents (`business/`).

## Stack

| Concern  | Choice                                                                                              |
|----------|-----------------------------------------------------------------------------------------------------|
| Framework | Astro 5, static output, TypeScript strict                                                          |
| Styling  | Tailwind CSS v4 through `@tailwindcss/vite` and `@tailwindcss/typography`                           |
| Brand    | Tokens, logos and icons are read from `brand/` in place; `src/styles/global.css` bridges the tokens to the Tailwind theme and resets Tailwind's default palette, fonts, radii and shadows |
| Content  | Pages in `.astro`; legal documents as an MDX content collection in `src/content/legal/`             |
| Fonts    | Montserrat Variable and Inter Variable, self-hosted through Fontsource (brand T8)                   |
| Node/PM  | Node 22, pnpm (pinned in `packageManager`; `vite@^6` pinned so `@tailwindcss/vite` binds to Astro's Vite) |

## Local development

```bash
pnpm install
pnpm dev        # dev server on :4321
pnpm build      # astro check + astro build → dist/
pnpm preview    # serve dist/ locally
```

## Layout

```
brand/               brand and design language: spec, tokens, logos, icons
business/            business model and agreements
src/
  components/        Header, Footer, Hero, AudienceHero, AudienceChips, RuledList, ContactBlock, Button,
                     Lockup (the horizontal lockup, inlined), RoofBands
  content/legal/     legal documents (MDX); schema in src/content.config.ts
  layouts/Layout.astro
  pages/             home, owners, tenants, businesses, 404, legal/[slug]
  styles/global.css  brand tokens bridged to the Tailwind theme, then the site's type and motion
  audiences.ts       the three audiences: labels, paths, and the home page's proof lines
  config.ts          site-wide constants
```

## Design

The home page is type-led: an oversize Montserrat headline on a Green first screen with a layered roof-form
accent, the offer as three full-bleed bands with oversize figures, the six services as one ruled list, and contact. The
Owners, Tenants and Businesses chips change the proof line with CSS only (radios and `:has()`); without `:has()` all
three lines show. It has no photographs and nothing that needs JavaScript.

The Owners, Tenants and Businesses pages share the home page's first screen (`Hero`): the same giant two-beat
headline, chips that link between the three pages, a proof card and the roof art. Below it each page is full-bleed
bands, ruled lists and oversize figures, with a gold rule under the first content heading. Owners is the longest: its
figures come from the model's worked example (BM18). Tenants follows the tenancy form's own headings. Businesses is
short because the model has little beyond BM9, BM10 and P10. The header carries the audience links from 768 px; below
that the chips and the footer do.

Deliberate brand deviations, recorded as brand 09-governance asks:

- **T3** (Default): display sizes above the scale's top step (hero up to 160 px, figures 192 px on the home page and
  96 px on the audience pages, closing line 118 px) with tighter tracking; four sizes or fewer in each section.
- **S2** (Default): a 24 px page margin on phones, not 16 px, so the 195 px lockup keeps its L4 clear space.
- **A6** (Default): the header sits on Green with the reversed lockup to join the first screen. There is no photograph
  (D14), and the gold roof band stands in for the gold rule under the headline.

## Before launch

Open, and not for the code to decide:

- **Domain (brand D4).** `site` in `astro.config.mjs` is the reserved `.example` placeholder.
- **Contact.** Phone and email read "to be added". There is no contact form: it needs a destination that can receive it.
- **Photography (D14).** The design uses none.
- **Legal text.** `src/content/legal/privacy.mdx` is a placeholder pending counsel.
- **Social image** (1200 × 630) and PNG favicon fallbacks.
- **Deploy, infrastructure and analytics.**
- **Commercial tenancies.** The model has no commercial tenancy form yet (BM9 counsel note), so the Businesses page
  describes the landlord's side and points to the Owners and Tenants pages instead of describing a shop tenant's terms.
- **Luganda.** The Owners page repeats the agreement's English-and-Luganda promise (BM11); the Luganda text is not in
  the repository yet.

Copy the owner has not yet approved. On the home page (`src/pages/index.astro`):

- The Tenants proof line "Tell us what is broken. We arrange a trusted contractor." (tenancy form, clause 6) and the
  Businesses proof line "We manage shops and offices as well as homes." (BM9).
- Labels: "The offer in three lines", "What we look after for you.", "Services", "Contact us", "Contact" and the card
  links "More for owners", "More for tenants" and "More for businesses".
- The offer statements split BM18 at its commas; the six one-line service descriptions come from BM18 and BM2.

On the audience pages (`owners.astro`, `tenants.astro`, `businesses.astro`), where a sentence is not word for word
from the model or the tenancy form:

- New labels: "How we start.", "Your papers.", "What we ask of you.", "10% on repair quotes.", "Utilities at cost." and
  "Read next", with one-line summaries of the Owners and Tenants pages.
- Owners: the ledger shows BM18's statement with a "UGX" prefix and a true minus; "It is charged on rent only…" is BM4
  with "The 15%" as "It"; "There is no sign-up fee, no letting fee and no yearly fee." joins BM18 and P7; the
  chasing and court rows combine BM18's example with BM5.
- Tenants: the headline "Great spaces, happy tenants." is the People-Centric pillar (F2), backed by the repair line;
  "Your rent is due on the day written in your tenancy form.", "Any late fee is written in your tenancy form." and the
  early-leaver line (P13, "with no fee on them") adapt clauses 2, 4 and 5 where the form leaves a term open; "this
  tenancy" is "your tenancy" in the deposit text.
- Businesses: the headline "Shops and offices. Same terms." compresses BM9 and BM10 (the hero's last two lines must
  stay short, or they run under the card); "That is the rent minus our 15%…" is BM10's example reworded.
