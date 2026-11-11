# 09 · Governance

Who decides, how the language changes, where the assets live and how accessibility is held. A language that cannot
change is a rulebook; one that changes without a trail is not a language.

## Ownership and change

### G1 · Ownership and approval

*Strength: Always · Source: Proposed*

**Rules**

- **Always** treat the Mwavuli owner as the approver of this language. Only the owner can change a rule tagged Board,
  and only the owner can approve a rule tagged Card or Proposed. _(Proposed)_
- **Always** list every Proposed item in the inventory's open decisions until the owner approves, rejects or changes it.
  _(Proposed)_
- **Default** to approving decisions by ID ("approve D5 to D8"), as the inventory is indexed for that. _(Proposed)_

**Why** The board and the card are the owner's declared choices. The rest is extrapolation, which is useful only while
it is visibly separate.

**Example** "Approve D5, D6 and D7; change D9 to Green at the next reprint; leave D14 open."

**Bend when** Never for Board rules. A Proposed rule that blocks urgent work may be used provisionally with the decision
ID noted in the pull request.

**Prior art** Decision records (ADRs) and owner sign-off in design-system governance.

### G2 · Versioning and change

*Strength: Always · Source: Proposed*

**Rules**

- **Always** version the language with semantic versions: a new major when a Board rule or a token value changes
  meaning, a minor when a concern or token is added, a patch for wording. _(Proposed)_
- **Always** change tokens in `tokens/mwavuli.tokens.json` and regenerate the CSS; never edit the CSS by hand.
  _(Proposed)_
- **Always** land each document change as its own commit, and update the inventory in the same change. _(Proposed)_
- **Always** run `tools/check_docs.py` before merging; it checks the inventory against headings, links, fences, tables
  and width. _(Proposed)_
- **Default** to a changelog entry in the README for every minor or major version. _(Proposed)_

**Why** Tokens reach production code, so their changes need a visible trail. One commit per document keeps review small.

**Example** Adding the `parking` icon: new SVG, new catalog row, minor version, one commit for the SVG and catalog, one
for the README changelog.

**Bend when** An emergency fix to a broken asset: patch it, note it, and review afterwards.

**Prior art** Semantic Versioning 2.0.0 and the W3C Design Tokens Community Group format for the token file.

### G3 · Asset locations and names

*Strength: Default · Source: Proposed*

**Rules**

- **Default** to this layout: `tokens/` for the JSON and CSS, `icons/line/` and `icons/pictogram/` for icons, `logo/`
  for lockups, `preview/` for generated sheets. _(Proposed)_
- **Always** name files in lowercase with hyphens, by meaning (I6), and reference assets by their catalog IDs in
  reviews. _(Proposed)_
- **Avoid** committing exports (PNG, PDF) of artwork that can be regenerated, except the preview sheets. _(Proposed)_

**Why** One place for each kind of asset means no one asks which logo is current.

**Example** The favicon is `logo/app-icon.svg`, referenced by the site's head; no copy lives in the site folder.

**Bend when** A platform needs a fixed filename or format (for example `favicon.ico`): generate it in the build.

**Prior art** The asset folder layouts of public design systems.

### G4 · Accessibility baseline

*Strength: Always · Source: Proposed*

**Rules**

- **Always** meet WCAG 2.2 level AA in every digital deliverable: contrast (C3), target size and focus (S8), icon
  alternatives (I10), reduced motion (S9) and text spacing. _(Proposed)_
- **Always** test with a keyboard and a screen reader on the key paths of a release. _(Proposed)_
- **Never** ship a color pair that is not in C3 without computing it. _(Proposed)_

**Why** A property manager's users include older tenants, people on low-end phones and people in bright sun.
Accessibility is also what makes the interface legible for everyone.

**Example** Release checklist: contrast of any new pair, tab order, focus visible, icon-only buttons named,
reduced-motion respected.

**Bend when** Never on screen. For print, the same ratios are guidance (C3).

**Prior art** WCAG 2.2 and the GOV.UK Service Manual's accessibility testing guidance.

### G5 · Deviations

*Strength: Default · Source: Proposed*

**Rules**

- **Default** to the "Bend when" condition under each concern as the only pre-approved deviation. _(Proposed)_
- **Always** record any other deviation as a new decision with an ID, the reason and an end date or a plan to fold it
  into the language. _(Proposed)_
- **Avoid** the same deviation twice; the second time, change the rule. _(Proposed)_

**Why** Every real system drifts. Writing the deviation down is the difference between flexibility and inconsistency.

**Example** D9: the job title on the printed card is gold on cream; recorded, approved for this print run, and planned
to move to Green at the next reprint.

**Bend when** Not applicable.

**Prior art** Design-system exception processes (a documented waiver with an expiry).

### G6 · Review cadence

*Strength: Consider · Source: Proposed*

**Rules**

- **Consider** a review every quarter in the first year and twice a year after, and after each of: the first real photo
  shoot, the first launch of the site, the first app release, the first signage install. _(Proposed)_
- **Consider** inviting a tenant and an owner to comment on the language's first applications. _(Proposed)_

**Why** The first applications will show what the language misses. Scheduled reviews fold those lessons back in.

**Example** After the site launch: review C2 proportions and T3 sizes against real pages; adjust tokens in a minor
version.

**Bend when** The brand changes materially (a rename or a new service line): review immediately.

**Prior art** Release retrospectives in design-system teams.

