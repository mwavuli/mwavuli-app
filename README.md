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
  components/        Header, Footer, Button, Lockup (the horizontal lockup, inlined), RoofBands
  content/legal/     legal documents (MDX); schema in src/content.config.ts
  layouts/Layout.astro
  pages/             home, 404, legal/[slug]
  styles/global.css  brand tokens bridged to the Tailwind theme, then the site's type and motion
  config.ts          site-wide constants
```

## Design

The home page is type-led: an oversize Montserrat headline on a Green first screen with a layered roof-form
accent, the offer as three full-bleed bands with oversize figures, the six services as one ruled list, and contact. The
Owners, Tenants and Businesses chips change the proof line with CSS only (radios and `:has()`); without `:has()` all
three lines show. It has no photographs and nothing that needs JavaScript.

Deliberate brand deviations, recorded as brand 09-governance asks:

- **T3** (Default): display sizes above the scale's top step (hero up to 160 px, figures 192 px, closing line 118 px)
  with tighter tracking; four sizes or fewer in each section.
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

Copy the owner has not yet approved, all in `src/pages/index.astro`:

- The Tenants proof line "Tell us what is broken. We arrange a trusted contractor." (tenancy form, clause 6) and the
  Businesses proof line "We manage shops and offices as well as homes." (BM9).
- Labels: "The offer in three lines", "What we look after for you.", "Services", "Contact us" and "Contact".
- The offer statements split BM18 at its commas; the six one-line service descriptions come from BM18 and BM2.
