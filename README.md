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
  components/        Header, Footer, Lockup (the horizontal lockup, inlined)
  content/legal/     legal documents (MDX); schema in src/content.config.ts
  layouts/Layout.astro
  pages/             home, 404, legal/[slug]
  styles/global.css  brand tokens bridged to the Tailwind theme
  config.ts          site-wide constants
```

## Not here yet

- Deploy and infrastructure.
- Analytics.
- The production domain (brand decision D4): `site` in `astro.config.mjs` is the reserved `.example` placeholder.
- The social image and PNG favicon fallbacks.
- Real content: legal text, photography (D14) and contact details beyond the postal address.
