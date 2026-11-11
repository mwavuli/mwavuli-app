# AGENTS.md

Operating guide for AI agents and contributors in this repository.

## `.scratch/`

`.scratch/` holds working files: do not read or search them unless explicitly
requested or genuinely required to proceed. They are version-controlled all the
same — stage and commit `.scratch/` like any other path (e.g. under "commit
all"); never add it to `.gitignore` or exclude it from a commit.

Nothing under `.scratch/` is authoritative. A decision belongs in `brand/` or
`business/`, or for infrastructure in `docs/design/`, where it can be found.

## Brand

Site code uses the brand and design language in `brand/`: colours, fonts, radii
and shadows come from the tokens through the theme in `src/styles/global.css`,
and logos and icons from `brand/logo/` and `brand/icons/`. The theme resets
Tailwind's default palette, so an off-brand utility such as `bg-blue-500`
generates nothing. Deviations follow `brand/09-governance.md`.
