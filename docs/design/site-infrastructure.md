# Site infrastructure

**Intent**: how the Mwavuli site is hosted, published and served, and what must be decided and done
before the first apply. It follows the shape of `nyange-site` (a private S3 bucket behind CloudFront,
published from GitHub Actions over OIDC, infrastructure in OpenTofu through Terragrunt) and the
conventions of `nyange-org`, and says where it differs and why.

| | |
|---|---|
| This repository owns | the bucket `mwavuli-site-prod-us-east-1`, the CloudFront distribution that serves it, and the workflow that publishes to it |
| State | `nyange-tfstate-automation-us-east-1`, key `mwavuli-site/shared-services/us-east-1/site/tofu.tfstate` |
| Vended by `nyange-org` | the deploy role, the state-prefix grant, and (later) the DNS delegation |
| Status | written and validated offline; **nothing is applied** |

Decisions are numbered `M1…` and are the record of *why*. A decision that stops being true is
replaced, not renumbered.

---

## 1. Decisions that need the owner

### M3 — Where the site's resources live (open)

**Recommended: `shared-services-prod`**, where `nyange-site`'s bucket already lives, with a scoped
deploy role. `nyange-site` S1 made the same call for its bucket: rather than invent an account for one
bucket, a platform account may host a workload's deploy role. A new account for one bucket and one
distribution is scaffolding for a need that does not exist yet. `infra/live/shared-services/…` and
`infra/catalog/org.yaml` are written that way.

The alternative is a new application account (`mwavuli-prod`) in `nyange-org`'s `catalog/accounts.yaml`.
It separates the cost centre and the blast radius of a different business's site from the platform's,
at the price of an account baseline, a budget and SSO assignments. Moving later is not free either:
the bucket name is global, and a recreated distribution gets a new `*.cloudfront.net` name.

What the recommendation gives up: every resource tag reads `CostCenter = ENG-PLATFORM`, because the
tags come from the account's contract, so the site's cost is not separable in cost allocation.

### M12 — The domain (open, brand D4)

The site serves on the distribution's own `*.cloudfront.net` name until the domain exists. That is
enough to review the real site, and it is where the deploy workflow checks it. Canonical URLs and the
`og:image` address already follow `site` in `astro.config.mjs`, which stays the reserved `.example`
placeholder until then.

Adding the domain is two changes, neither written yet because neither can be until the name is known:

1. In this repository: `aliases` and `certificate_arn` on the `site` unit, with an ACM certificate in
   `us-east-1` (a new unit that validates it through DNS).
2. In `nyange-org`: a hosted zone for the domain in `dns-prod` (`catalog/dns.yaml` holds only
   `nyange.app`), a delegation role for this workload (`dns_delegation: true`, a `dns_scope`), and the
   registrar's nameservers pointed at the zone. Registration can stay at the registrar, as for
   `nyange.app`.

### M5 and M6 — Registering the workload in `nyange-org` (open, another repository)

The backend and the deploy role are `nyange-org`'s to vend ("that repository cannot create the
credential its own CI must already hold"). Nothing in this repository can apply until that change
exists. A draft, not applied and not opened as a pull request:

`catalog/workloads.yaml`:

```yaml
  mwavuli-site:
    account:      shared-services-prod
    state_prefix: mwavuli-site
    github_owner_id: "314008686"
    github_repo_id:  "1451231111"   # gh api /repos/nyange-app/mwavuli-site --jq .id
    environments: [production]
    permissions: scoped
    dns_delegation: false           # true, with a dns_scope, once M12 adds a domain
```

A deploy-role unit beside `live/shared-services/global/deploy-role`, with `repo = "mwavuli-site"` and
this scoped policy. It lets CI publish and invalidate and nothing else, because a person applies
infrastructure (M7):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    { "Sid": "PublishToItsOwnBucket", "Effect": "Allow",
      "Action": ["s3:ListBucket", "s3:GetObject", "s3:PutObject"],
      "Resource": ["arn:aws:s3:::mwavuli-site-prod-us-east-1", "arn:aws:s3:::mwavuli-site-prod-us-east-1/*"] },
    { "Sid": "InvalidateItsDistribution", "Effect": "Allow",
      "Action": ["cloudfront:GetDistribution", "cloudfront:CreateInvalidation", "cloudfront:GetInvalidation"],
      "Resource": "arn:aws:cloudfront::947247293289:distribution/*" },
    { "Sid": "FindItsDistribution", "Effect": "Allow",
      "Action": "cloudfront:ListDistributions", "Resource": "*" }
  ]
}
```

`ListDistributions` cannot be scoped to a resource, and it is what lets the workflow find the
distribution by its origin instead of pinning an id (`nyange-site` S11).

### M7 — The first apply (open: a live change)

Applying creates a bucket, a distribution, an origin access control and a function in
`shared-services-prod`, and costs pennies a month. It waits for the owner's go-ahead, and a person
runs it with credentials in that account:

```bash
cd infra/live/shared-services/us-east-1/site
terragrunt plan     # read it: one bucket, its policy and public-access block, one distribution
terragrunt apply
```

CI does not apply. The plan and apply workflows of `nyange-site`, `nyange-org` and `nyange-infra-modules`
sit parked in `.github.bak/`, and this repository adds no plan or apply workflow for a single unit.

---

## 2. Decisions taken here

### M1 — A private bucket behind CloudFront

The site is static files, so there is no server to run, patch or pay for while it idles. The bucket is
never public: CloudFront reads it through an origin access control, and the bucket policy admits that one
distribution and denies plain HTTP. The same shape as `nyange-site`, and the one the estate already
knows how to operate.

### M2 — The site brings its own distribution

`nyange-site` borrows `api-prod`'s distribution because it is served on the apex that distribution owns.
This site has its own domain, so it has its own distribution. That also makes the bucket policy
single-account: it names this distribution's ARN, not an account, and invalidation needs no cross-account
role.

### M4 — The module is local for now

`infra/modules/static-site` lives in this repository. The estate's rule is that a module referenced by a
`live/` unit belongs in `nyange-infra-modules`, pinned by tag, which makes an application change two pull
requests and a tag. With one consumer and nothing applied, that is cost without benefit, and a local
module keeps the first apply free of cross-repository changes. The module has no `nyange` specifics, so
moving it is a copy and a tag when a second consumer or the owner asks for it.

It is checked without AWS: `tofu validate`, `tflint`, and `tofu test` against a mocked provider, which
asserts that the bucket blocks public access, that the policy admits only this distribution's ARN and
denies plain HTTP, and that aliases without a certificate are refused. Two deliberate breakages
(public access allowed, the policy admitting any source) each failed the tests.

### M8 — The caching strategy is nyange-site's

| Files | `Cache-Control` | How a change shows |
|---|---|---|
| `_astro/*` (hashed) | `public, max-age=31536000, immutable` | new hash, new URL |
| `*.html` | `public, max-age=300, s-maxage=86400` | `/*` invalidation per deploy |
| other statics (icons, social image, sitemap) | `public, max-age=86400` | `/*` invalidation per deploy |

The upload is staged, assets first and HTML last, with no `--delete`, so HTML held at the edge never
points at an asset that is gone. The cost is that a page removed from the site stays in the bucket until
someone deletes it. Each deploy invalidates `/*`, one path of the thousand a month that are free, and
waits for it before the smoke checks run.

### M9 — Headers, and no CSP yet

The managed security-headers policy sets HSTS, `nosniff`, a frame policy and a referrer policy. There is
no `Content-Security-Policy`: the site ships no script, and a policy written now would be rewritten
against whatever analytics adds. Add it with the first script.

### M10 — Directory URLs

An S3 REST origin does not serve index documents, and Astro builds `/owners/` as `owners/index.html`. A
viewer-request function maps `/owners/` and `/owners` onto it, leaving any URL with a dot in its last
segment alone. It resolves every page the site builds, with and without the trailing slash. A missing
page is the site's own `404.html` with a 404 status; a 403 is deliberately not mapped, because it would
mean the access control is broken and should not hide behind a friendly page.

### M11 — Edge locations

`PriceClass_200` adds the African edge locations. The audience is in Uganda, and `PriceClass_100` would
serve Kampala from Europe. For a few megabytes of static files the price difference is pennies.

### M13 — The deploy fails closed

`SITE_BUCKET` and `AWS_DEPLOY_ROLE_ARN` have no defaults, and the workflow checks them before it builds:
an unset variable is a named failure, never a publish that lands somewhere wrong and reports success.
`DEPLOY_ENABLED=false` freezes the job without a code change.

---

## 3. Before the first deploy

1. **Decide** M3 (where) and M12 (the domain, or deploy on `cloudfront.net` first).
2. **`nyange-org`**: register the workload and vend the deploy role (M5, M6). Another repository, so it
   needs the owner's go-ahead and its own review.
3. **Apply** `infra/live/shared-services/us-east-1/site` (M7). Check the plan first.
4. **GitHub**: set the repository variables from the apply's outputs, with the `production` environment
   the role trusts.
   ```bash
   gh variable set SITE_BUCKET --body "$(terragrunt output -raw bucket_name)"
   gh variable set AWS_DEPLOY_ROLE_ARN --body "<NyangeDeploy-mwavuli-site role arn>"
   ```
5. **Deploy**: run the `deploy` workflow. It publishes, invalidates, and runs `scripts/smoke.sh` against
   the distribution's own name. The ticket is done when that is green and the live site has been looked at.

## 4. What is verified, and what is not

Verified offline: the module (`validate`, `fmt`, `tflint`, four mocked tests, two mutation checks); the
Terragrunt unit resolves the intended state key, provider account guard and tags (rendered against a
stubbed account contract); the workflows (`actionlint`, with `shellcheck` on their shell); the URL mapping
against every page the site builds; and `scripts/smoke.sh` against a local stand-in for S3 and CloudFront,
healthy and with four faults injected, each of which it caught.

Not verified, because there is no AWS access from here: `terragrunt plan` against the real account, the
real distribution's behaviour, the OIDC trust, and the `aws s3 sync` and invalidation steps. The first
plan and the first deploy are where they are verified.
