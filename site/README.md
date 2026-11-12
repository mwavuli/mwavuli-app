# site

The **Mwavuli Property Management** site: a static [Astro](https://astro.build) build, and the `site` project of the
workspace (see the [root README](../README.md)).

## Stack

| Concern  | Choice                                                                                              |
|----------|-----------------------------------------------------------------------------------------------------|
| Framework | Astro 5, static output, TypeScript strict                                                          |
| Styling  | Tailwind CSS v4 through `@tailwindcss/vite` and `@tailwindcss/typography`                           |
| Brand    | Tokens, logos and icons come from [`@mwavuli/brand`](../brand/README.md); the Tailwind theme that bridges the tokens and resets Tailwind's default palette, fonts, radii and shadows is [`@mwavuli/theme`](../packages/theme/theme.css), shared with the web app. `src/styles/global.css` imports it and adds the site's type and motion |
| Content  | Pages in `.astro`; legal documents as an MDX content collection in `src/content/legal/`             |
| Fonts    | Montserrat Variable and Inter Variable, self-hosted through Fontsource (brand T8)                   |
| Icons    | The tab icon is the brand's SVG app icon; `favicon.ico` and the iOS icon are rendered from it at build time with `sharp` (brand G3) |
| Infra    | OpenTofu through Terragrunt in [`infra/`](../infra): the account's own state backend, the site and its deploy role; standalone, written and not applied |
| Deploy   | GitHub Actions over OIDC: staged S3 sync, CloudFront invalidation, smoke checks                     |
| Node/PM  | Node 22 and pnpm (pinned at the repository root); `vite@^6` pinned so `@tailwindcss/vite` binds to Astro's Vite |

## Local development

From the repository root:

```bash
pnpm install
pnpm nx dev site         # dev server on :4321
pnpm nx build site       # astro check + astro build → site/dist/
pnpm nx preview site     # serve site/dist/ locally
pnpm nx lint site        # shellcheck on scripts/
```

The social image is committed, like the agreement PDFs. After changing `scripts/social-image/card.html` or the brand,
rebuild it with `pnpm nx run site:social-image`. It needs Playwright with Chromium (`npm install playwright`, or
point `PLAYWRIGHT_DIR` at an existing install).

## Layout

```
public/              files served as they are: social.png
scripts/             smoke.sh (checks a deployed copy) and social-image/ (card.html and build.mjs for public/social.png)
src/
  components/        Header, Footer, Hero, AudienceHero, AudienceChips, RuledList, ContactBlock, Button,
                     Lockup (the horizontal lockup, inlined), RoofBands
  content/legal/     legal documents (MDX); schema in src/content.config.ts
  layouts/Layout.astro
  pages/             home, owners, tenants, businesses, 404, legal/[slug], and the generated
                     favicon.ico and apple-touch-icon.png
  styles/global.css  brand tokens bridged to the Tailwind theme, then the site's type and motion
  audiences.ts       the three audiences: labels, paths, and the home page's proof lines
  config.ts          site-wide constants
  icons.ts           renders favicon.ico and apple-touch-icon.png from brand/logo/app-icon.svg
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

The social image (`public/social.png`, 1200 × 630, brand A6) is the reversed lockup on Green with the campaign
headline "Managed Properties. Better Living." in white and gold (F6 sets that line for social) and the roof bands cut
off by the edge. Every page's `og:image` and large Twitter card point at it through `Layout.astro` and `SOCIAL_IMAGE`
in `src/config.ts`. The card reads the brand tokens and the site's Montserrat, so it follows the brand. The lockup is
400 px wide, so it stays above the 180 px screen minimum (L5) when a feed shows the card at 45 percent, and the text
stays 40 px inside the top and bottom edges for the 1.91:1 and 2:1 crops.

The tab icon is the brand's SVG app icon. `favicon.ico` (the tile at 32 and 48 px) and `apple-touch-icon.png` (180 px)
are generated from the same file when the site is built, because a platform that needs a fixed filename gets a
generated file, not a copy (G3). iOS rounds its icon and paints transparency black, so the iOS icon puts the tile on a
full-bleed square of its own gold, with the mark unchanged at 59 percent of the width (L7, "Bend when").

Deliberate brand deviations, recorded as brand 09-governance asks:

- **T3** (Default): display sizes above the scale's top step (hero up to 160 px, figures 192 px on the home page and
  96 px on the audience pages, closing line 118 px) with tighter tracking; four sizes or fewer in each section.
- **S2** (Default): a 24 px page margin on phones, not 16 px, so the 195 px lockup keeps its L4 clear space.
- **A6** (Default): the header sits on Green with the reversed lockup to join the first screen. There is no photograph
  (D14), and the gold roof band stands in for the gold rule under the headline.
- **G3** (Default): `public/social.png` is a committed PNG export of artwork that can be regenerated, because rendering
  the card in the site's Montserrat needs Chromium, which the build does not have. Its source is
  `scripts/social-image/card.html`; the favicon files, which `sharp` can render, are generated in the build.

## Deploy

The site is static files in a private S3 bucket behind CloudFront, in the prod account of Mwavuli's own AWS
organization. The infrastructure is standalone: `infra/` holds the organization, Identity Center, the state backends, the
site and the deploy role, and depends on no account, organization or repository outside Mwavuli's. It is OpenTofu through
Terragrunt, applied by a person, and `.github/workflows/deploy.yml` publishes `site/dist/` on a push to `main` that
touches the site, the brand or the theme, or by hand. The decisions, and what the owner must do before the first apply,
are in [`docs/design/aws-organization.md`](../docs/design/aws-organization.md) and
[`docs/design/site-infrastructure.md`](../docs/design/site-infrastructure.md). **Nothing is applied yet.**

| Files | `Cache-Control` |
|---|---|
| `_astro/*` (hashed) | `public, max-age=31536000, immutable` |
| `*.html` | `public, max-age=300, s-maxage=86400` |
| other statics | `public, max-age=86400` |

The upload is staged (hashed assets, other statics, then HTML) with no `--delete`. Every deploy invalidates `/*` and
then runs `site/scripts/smoke.sh` against the distribution. It needs two repository variables, `AWS_DEPLOY_ROLE_ARN` and
`SITE_BUCKET`, and fails before it builds if either is missing. `gh variable set DEPLOY_ENABLED --body false` freezes it.

Checks that need no AWS credentials:

```bash
pnpm nx run-many -t lint test check --projects=infra   # OpenTofu fmt, validate and mocked tests; Terragrunt fmt; committed state
site/scripts/smoke.sh https://<domain>           # after `pnpm nx build site`, against a deployed copy
```

## Before launch

Open, and not for the code to decide:

- **Domain (brand D4).** `site` in `astro.config.mjs` is the reserved `.example` placeholder. Canonical URLs and the
  `og:image` address follow it, so link previews work only once the domain is set.
- **Contact.** Phone and email read "to be added". There is no contact form: it needs a destination that can receive it.
- **Photography (D14).** The design uses none.
- **Legal text.** `src/content/legal/privacy.mdx` is a placeholder pending counsel.
- **Web manifest** with 192 and 512 px icons, only if the site should be installable.
- **Deploy.** The infrastructure and the workflow are written and not applied. The owner applies the organization and
  Identity Center code and signs in through it, then bootstraps the prod state backend, and decides the domain: see
  [`docs/design/aws-organization.md`](../docs/design/aws-organization.md), section 4, then
  [`docs/design/site-infrastructure.md`](../docs/design/site-infrastructure.md), section 3.
- **Analytics.**
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
