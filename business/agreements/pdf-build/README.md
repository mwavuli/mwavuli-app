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
  value in the markdown (for example the registration number) and rebuild.
- **Palette:** black, white and gray only, set in `print.css`.
- **Fonts:** Montserrat for headings, labels and tables, and Charter for the text. Where they are not installed the
  PDF falls back to Helvetica and Georgia, and the line breaks may move.
