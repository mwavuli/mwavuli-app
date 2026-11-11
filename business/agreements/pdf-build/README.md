# Agreement PDFs

Builds the print-ready PDFs in `../pdf/` from the markdown documents in `..`.

```
PLAYWRIGHT_DIR=/path/to/node_modules/playwright node business/agreements/pdf-build/build.mjs
node business/agreements/pdf-build/build.mjs landlord-agreement   # one document
```

- **The PDFs are committed.** Rebuild them whenever a document changes.
- **Needs:** `pandoc` on the PATH, and Playwright with Chromium (`npm install playwright`, or point `PLAYWRIGHT_DIR` at
  an existing install).
- **What it prints:** everything above each file's "Drafting notes" heading, except the first paragraph after the title,
  which is drafting meta. The meta paragraph gives the version for the footer.
- **How fields print:** `[ ]` becomes a checkbox, and `[hint]` becomes a blank line with the hint in gray. Put the real
  value in the markdown (for example the phone number) and rebuild.
- **Headed pages:** every page carries the Mwavuli horizontal lockup at the top left and the company name and P.O. Box
  at the top right. `logo-horizontal-slate.svg` is `logo/logo-horizontal.svg` from the brand docs (SNT-24) with both
  fills set to Slate, the brand's replacement for black (rule L3). Read the lockup from `brand/` and delete this copy
  once SNT-24 has merged.
- **Palette:** one ink, the brand's Slate `#2F3437` with its tints, plus white. It is set in `print.css`, and the header
  and footer in `build.mjs` repeat the values.
- **Fonts:** Montserrat for headings, labels and tables, and Charter for the text. The brand sets text in Inter, which
  is not installed on the build machine. Where a font is missing the PDF falls back to Helvetica or Georgia, and the
  line breaks may move.
