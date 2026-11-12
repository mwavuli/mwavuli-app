# Site infrastructure

**Intent**: how the Mwavuli site is hosted, published and served, and what the owner must supply before
the first apply. It is standalone: the site has its own AWS account, its own state backend, and its own
OIDC provider and deploy role, all created by this repository. Nothing here reads from, registers with
or depends on any other account, organization or repository.

| | |
|---|---|
| This repository owns | the state backend (a bucket, two KMS keys and a replica), the site (a bucket and a CloudFront distribution), the deploy role, and the workflow that publishes |
| The owner supplies | an AWS account of Mwavuli's own with an administrator identity, its 12-digit id in `infra/live/prod/account.hcl`, and later the domain |
| Status | written and validated offline; **nothing is applied** |

Decisions are numbered `M1…` and are the record of *why*. A decision that stops being true is replaced,
not renumbered.

---

## 1. Decisions that need the owner

### M1 — The AWS account (open)

The infrastructure needs an AWS account that is Mwavuli's own, created by the owner, with an
administrator identity for whoever applies. The IaC creates no IAM user and no access key, so securing
the root user and choosing how a person signs in (IAM Identity Center, or a role behind MFA) are the
owner's.

The account's 12-digit id goes in `infra/live/prod/account.hcl`, where it ships as `unset`. Terragrunt
refuses to run until it is replaced, and the generated provider then refuses any other account, so a shell
logged in somewhere else fails at plan and creates nothing.

The account is `prod` (the directory under `infra/live/`), the home region is `us-east-1` and the state
replica's is `us-west-2`; each is one line in `account.hcl` or `region.hcl`. `us-east-1` is where CloudFront
wants its certificates.

### M2 — The domain (open, brand D4)

The site serves on the distribution's own `*.cloudfront.net` name until the domain exists. That is enough
to review the real site, and it is where the deploy workflow checks it. Canonical URLs and the `og:image`
address follow `site` in `site/astro.config.mjs`, which stays the reserved `.example` placeholder until then.

Adding the domain is three changes in this repository, none written yet because none can be until the
name is known: `aliases` and `certificate_arn` on the `site` unit; an ACM certificate in `us-east-1`
validated through DNS; and a Route 53 hosted zone in this account, with the registrar's nameservers
pointed at it by the owner. A `www` redirect then joins the viewer-request function.

### M3 — The first apply (open: a live change)

Applying creates, in the owner's account, a state bucket with its replica, two KMS keys, a bucket and a
CloudFront distribution for the site, and an OIDC provider with a role. It costs about two dollars a
month, almost all of it the two KMS keys. It waits for the owner's go-ahead, and a person runs it with
administrator credentials in that account. Section 3 has the order.

---

## 2. Decisions taken here

### M4 — This repository owns everything it runs on

A site that can be billed, handed over and shut down on its own needs no one else's account, state
bucket, key, role or registry. The cost is that this repository carries a backend module and a deploy-role
module of its own, where a shared estate would lend them. All three modules are local: each has one
consumer, and nothing is applied that would justify a package registry.

### M5 — The state backend

The conventions are the owner's for any repository that owns remote state, and this one does:

- **Bootstrapped once, in code, with committed local state.** `infra/live/_bootstrap/00-tfstate-backend`
  creates only the backend and keeps its own state in git (`tfstate/terraform.tfstate`), because a backend
  cannot hold the state of the thing that creates it. A person runs it, reviewed; CI never does. Its
  `exclude` block keeps `run --all` away from it. `terragrunt backend bootstrap` is not used, because it
  leaves the bucket's own configuration out of code.
- **Nothing secret in it.** That state file is public to everyone with the repository, so the unit creates
  no IAM user, access key, password, secret value or private key. `infra/scripts/check-bootstrap-state.sh` fails
  CI if a committed bootstrap state holds one, or if any other state file is committed.
- **S3 with native locking**, `use_lockfile = true`, no DynamoDB table.
- **Names derived, never hand-written**: the bucket is `<org>-tfstate-<account-alias>-<region>` and a
  unit's key is `<repo>/<account-alias>/<region>/<unit-path>/tofu.tfstate`, from `account.hcl` and the
  directory path. For this site: `mwavuli-tfstate-prod-us-east-1` and `mwavuli-app/prod/us-east-1/site/tofu.tfstate`.
- **The bucket**: versioned, encrypted with its own KMS key, public access blocked, plain HTTP denied,
  replicated to a second region. Replaced versions are kept for a year, and the lifecycle rule also clears
  the delete markers that native locking leaves behind. Delete markers are not replicated on purpose: the
  replica is the copy that survives somebody deleting state at home.

### M6 — A private bucket behind CloudFront

The site is static files, so there is no server to run, patch or pay for while it idles. The bucket is
never public: CloudFront reads it through an origin access control, and the bucket policy admits that one
distribution and denies plain HTTP. Bucket and distribution are in one account and one state, so the
policy names the distribution's ARN and invalidation needs no cross-account role.

### M7 — The caching strategy

| Files | `Cache-Control` | How a change shows |
|---|---|---|
| `_astro/*` (hashed) | `public, max-age=31536000, immutable` | new hash, new URL |
| `*.html` | `public, max-age=300, s-maxage=86400` | `/*` invalidation per deploy |
| other statics (icons, social image, sitemap) | `public, max-age=86400` | `/*` invalidation per deploy |

The upload is staged, assets first and HTML last, with no `--delete`, so HTML held at the edge never
points at an asset that is gone. The cost is that a page removed from the site stays in the bucket until
someone deletes it. Each deploy invalidates `/*`, one path of the thousand a month that are free, and
waits for it before the smoke checks run.

### M8 — Headers, and no CSP yet

The managed security-headers policy sets HSTS, `nosniff`, a frame policy and a referrer policy. There is
no `Content-Security-Policy`: the site ships no script, and a policy written now would be rewritten
against whatever analytics adds. Add it with the first script.

### M9 — Directory URLs and the 404 page

An S3 REST origin does not serve index documents, and Astro builds `/owners/` as `owners/index.html`. A
viewer-request function maps `/owners/` and `/owners` onto it, leaving any URL with a dot in its last
segment alone, and it resolves every page the site builds. A missing page is the site's own `404.html`
with a 404 status. A 403 is deliberately not mapped: it would mean the access control is broken, and that
should not hide behind a friendly page.

### M10 — Edge locations

`PriceClass_200` adds the African edge locations. The audience is in Uganda, and `PriceClass_100` would
serve Kampala from Europe. For a few megabytes of static files the difference is pennies.

### M11 — The deploy identity

No stored key exists. GitHub's OIDC provider is created in the account, and one role trusts a job in this
repository, in the `production` environment, by exact match on the subject, in both forms GitHub sends
(with and without the numeric owner and repository ids). There is no wildcard. The role publishes to the
site bucket and invalidates distributions in the account, and can change nothing else: a person applies
infrastructure, with their own credentials. `ListDistributions` is the one statement on every resource,
because a list has no resource to scope to, and it is how the workflow finds the distribution by its
origin instead of pinning an id that a recreation would change.

CI does not apply, and this repository adds no plan or apply workflow.

### M12 — The deploy fails closed

`SITE_BUCKET` and `AWS_DEPLOY_ROLE_ARN` have no defaults, and the workflow checks them before it builds:
an unset variable is a named failure, never a publish that lands somewhere wrong and reports success.
`DEPLOY_ENABLED=false` freezes the job without a code change.

---

## 3. Before the first deploy

1. **Create the AWS account** (M1), and put its id in `infra/live/prod/account.hcl`.
2. **Bootstrap the backend** (M5), as an administrator in that account, then commit the state it wrote:
   ```bash
   cd infra/live/_bootstrap/00-tfstate-backend
   terragrunt apply
   git add tfstate/terraform.tfstate
   ```
3. **Apply the site and the deploy role**, reading each plan first:
   ```bash
   cd infra/live/prod/us-east-1/site && terragrunt plan && terragrunt apply
   cd ../deploy-role && terragrunt plan && terragrunt apply
   ```
4. **Set the repository variables** from their outputs:
   ```bash
   gh variable set AWS_DEPLOY_ROLE_ARN --body "$(terragrunt output -raw role_arn)"     # in deploy-role/
   gh variable set SITE_BUCKET --body "$(terragrunt output -raw bucket_name)"          # in site/
   ```
5. **Deploy**: run the `deploy` workflow. It publishes, invalidates, and runs `site/scripts/smoke.sh` against
   the distribution's own name. The ticket is done when that is green and the live site has been looked at.

## 4. What is verified, and what is not

Verified offline: the three modules (`validate`, `fmt`, `tflint`, and thirteen mocked-provider tests, with
twelve deliberate breakages that each failed them); the Terragrunt units render the intended state bucket
and key, KMS alias, account guard and tags, and the bootstrap unit renders its local backend, both
providers and its `exclude` block (all against a made-up account id in a scratch copy, and the shipped
`unset` stops Terragrunt); `infra/scripts/check-bootstrap-state.sh` against clean, secret-bearing, stray and
backup state; the workflows (`actionlint`, with `shellcheck` on their shell); the URL mapping against
every page the site builds; and `site/scripts/smoke.sh` against a local stand-in for S3 and CloudFront, healthy
and with four faults injected, each of which it caught.

Not verified, because nothing was run against AWS and the account does not exist yet: a plan or an apply,
S3 accepting the replication configuration (the role's policy can take a moment to propagate, and the
first apply may need a retry), the real distribution's behaviour, the OIDC trust, and the `aws s3 sync`
and invalidation steps. The first apply and the first deploy are where these are verified.
