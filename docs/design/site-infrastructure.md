# Site infrastructure

**Intent**: how the Mwavuli site is hosted, published and served, and what the owner must do before
the first apply. It is standalone: the site has its own AWS account (`prod`, in Mwavuli's own organization,
see [`aws-organization.md`](aws-organization.md)), its own state backend, and its own OIDC provider and
deploy role, all created by this repository. Nothing here reads from, registers with or depends on any
account, organization or repository outside Mwavuli's.

| | |
|---|---|
| This repository owns | the prod account's state backend (a bucket, two KMS keys and a replica), the site (a bucket, a CloudFront distribution, and its place on the domain: a certificate and the records), the deploy role, the workflow that publishes, and the DNS of `mwavuli.co` (a Route 53 hosted zone) |
| The owner supplies | administrator access to the prod account through Identity Center ([`aws-organization.md`](aws-organization.md)), and the domain, registered at Namecheap |
| Status | **applied** on 2026-11-12: the prod state backend, the site, the deploy role, the domain's DNS zone, and the site on `www.mwavuli.co`. The first deploy ran green, the domain's nameservers are the zone's (M13), and the bare domain redirects to `www` (M14). |

Decisions are numbered `M1…` and are the record of *why*. A decision that stops being true is replaced,
not renumbered.

---

## 1. Decisions that need the owner

### M1 — The AWS account (taken)

The site's account is `prod`: Primary, `341026626249`, a member of Mwavuli's own AWS organization, whose
structure, Identity Center and sign-in are in [`aws-organization.md`](aws-organization.md). The IaC creates no
IAM user and no access key: a person applies with an Identity Center session that holds administrator
access to this account.

The id is in `infra/live/prod/account.hcl`, and the generated provider refuses any other account, so a
shell signed in somewhere else fails at plan and creates nothing.

The account is `prod` (the directory under `infra/live/`), the home region is `us-east-1` and the state
replica's is `us-west-2`; each is one line in `account.hcl` or `region.hcl`. `us-east-1` is where CloudFront
wants its certificates.

### M2 — The domain (taken)

The domain is `mwavuli.co`, registered at Namecheap, and its public DNS, email included, is Route 53's in this
account (M13). The site answers on `www.mwavuli.co`, and the bare domain redirects to it (M14). The distribution's
own `*.cloudfront.net` name keeps answering too, and it is where the deploy workflow checks a publish. Canonical
URLs, the sitemap and the `og:image` address follow `site` in `site/astro.config.mjs`, which is the real address.
Brand decision D4, the address printed on the applications, is the owner's to close in `brand/`.

### M3 — The first apply (taken)

The first apply created, in the prod account, a state bucket with its replica, two KMS keys, a bucket and a
CloudFront distribution for the site, and an OIDC provider with a role. It costs about two dollars a
month, almost all of it the two KMS keys. It ran on 2026-11-12 with the owner's go-ahead and an Identity
Center administrator session in that account, each plan read first. Section 3 has the order, and
[`aws-organization.md`](aws-organization.md) (O10) the organization policy that refused the first attempt.

---

## 2. Decisions taken here

### M4 — This repository owns everything it runs on

A site that can be billed, handed over and shut down on its own needs no one else's account, state
bucket, key, role or registry. The cost is that this repository carries a backend module and a deploy-role
module of its own, where a shared estate would lend them. All three modules are local: each has one
consumer, and nothing is applied that would justify a package registry.

### M5 — The state backend

The conventions are the owner's for any repository that owns remote state, and this one does:

- **Bootstrapped once, in code, with committed local state.** `infra/live/_bootstrap/01-tfstate-prod`
  creates only the backend and keeps its own state in git (`tfstate/terraform.tfstate`), because a backend
  cannot hold the state of the thing that creates it. Each account that holds units has its own, so the
  management account's is `00-tfstate-management` ([`aws-organization.md`](aws-organization.md)). A person runs it, reviewed; CI never does. Its
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

### M13 — Route 53 serves the domain's DNS, email included

The `dns` unit (`infra/live/prod/us-east-1/dns`, on the `dns-zone` module) creates the public hosted zone for
`mwavuli.co` and holds the records of the domain's email in code. The records that point at the site are the
`site` unit's (M14), so changing the site never touches mail. Namecheap stays the registrar: it keeps the
registration and the privacy on its contacts, and only the nameservers moved. The domain's page at Namecheap
names, under Custom DNS, the zone's four, which the unit outputs as `name_servers`: `ns-1248.awsdns-28.org`,
`ns-1617.awsdns-10.co.uk`, `ns-209.awsdns-26.com` and `ns-715.awsdns-25.net`.

| Record | Type | Value | What it is |
|---|---|---|---|
| `mwavuli.co` | MX | `1 mx1.`, `5 mx2.`, `10 mx3.larksuite.com.` | the domain's mail, which is Lark Suite's |
| `mwavuli.co` | TXT | Lark's domain-verification code, and `v=spf1 +include:spf.onlarksuite.com -all` | proof of the domain to Lark, and who may send as it |
| `lark2611112352._domainkey` | TXT | Lark's DKIM key | signs outgoing mail |

**Email is the constraint.** Mail already runs on Lark, and nothing here may interrupt it, so the zone had to
answer exactly as Namecheap's DNS did before any nameserver moved. The records were read from Namecheap's
Advanced DNS page, which is the only place a DKIM selector can be found, and the zone was compared with what the
domain answered publicly, record set by record set: five sets and eight values, the redirect and parking
records the zone began with among them, each matching (the zone's side read with `aws route53 test-dns-answer`,
which needs no DNS port). The module cuts a TXT value longer than 255 characters into the strings Route 53
takes, which the 410-character DKIM key needs, and a test proves the strings join back into the key.

**The cutover and the way back.** The move is one change at Namecheap: the domain's page, Nameservers, Custom
DNS, the four above. A resolver that cached Namecheap's nameservers keeps asking them until its cache expires
(Namecheap says up to 48 hours). Mail is the same from either side. The site's two names are not, because
Namecheap's copy still holds the old redirect and parking page, so a resolver still asking Namecheap sends a
visitor there until its cache expires. The way back is choosing Namecheap BasicDNS on the same page: that copy
is kept, and nothing in this repository edits it. It takes the site off the domain and leaves mail as it is.
Once the nameservers are the zone's, a change to a record is a change to a unit, never to Namecheap's Advanced
DNS, which no longer answers for the domain.

**The zone cannot be destroyed by a plan.** `prevent_destroy` is on: a deleted zone's replacement gets other
nameservers, and the domain's DNS, email with it, is down until the registrar is told.

**Mail depends on this unit.** The repository is pre-launch, but a record here is something real, so a change to
the `dns` unit is held to the live rules: read the plan first, keep every record mail uses, and know the way back
before applying.

**Not done here.** There is no DMARC record: none existed, and its policy and reporting mailbox are the owner's
to choose, as is DNSSEC.

### M14 — The site is at www, and the bare domain redirects there

The `site` unit serves `www.mwavuli.co` and redirects `mwavuli.co` to it. That is what the bare domain did at
Namecheap, and the address on the brand's board mock begins with `www`. The two names share one distribution and
one certificate. CloudFront turns plain HTTP into HTTPS first, and then the viewer-request function answers a
request for the bare domain with a 301 to the same path and query on `www`, cached for a day, so a canonical
name that changes later does not stay in browsers for good. The distribution's own `*.cloudfront.net` name is
not redirected, so the deploy's smoke checks run on it as before.

The `static-site` module does the rest from one input, `domain` (the zone's id, the canonical name and the names
that redirect to it): an ACM certificate for every name, validated by records the module creates in the zone and
not used by the distribution until ACM has issued it; the viewer certificate, with SNI and TLS 1.2 at least; and
an A and an AAAA alias record for each name, made once the distribution serves it. The certificate is made where
the module runs, and CloudFront reads certificates from `us-east-1` only, so the module runs there. The zone's id
is the one thing the unit reads from the `dns` unit. Making the bare domain the canonical one is a swap of
`canonical` and `redirects` in the unit and of `site` in `site/astro.config.mjs`.

---

## 3. The order, and where it stands

All of it ran on 2026-11-12.

1. **Sign in to the prod account** (M1) through Identity Center with administrator access, as section 4 of
   [`aws-organization.md`](aws-organization.md) sets it up.
2. **Bootstrap the backend** (M5), as an administrator in that account, then commit the state it wrote
   (21 resources):
   ```bash
   cd infra/live/_bootstrap/01-tfstate-prod
   terragrunt apply
   git add tfstate/terraform.tfstate
   ```
3. **Apply the site and the deploy role**, reading each plan first (8 and 3 resources):
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
   the distribution's own name. The first run was green, and the live site answers on the distribution's
   name (`d3g3tcova33n6t.cloudfront.net`).
6. **Apply the domain's zone and move the nameservers** (M13), reading the plan first (6 resources: the zone
   and the five record sets it began with). Then give Namecheap the four nameservers the unit outputs:
   ```bash
   cd infra/live/prod/us-east-1/dns && terragrunt plan && terragrunt apply
   terragrunt output name_servers
   ```
7. **Put the site on the domain** (M14), reading each plan first. The `dns` unit drops the two records that
   pointed at Namecheap's redirect and parking servers (2 destroyed). The `site` unit then issues and validates
   the certificate, updates the distribution and the function, and creates the records (8 created, 2 changed).
   The apex and `www` answer nothing between the two, about five minutes, because the second waits for ACM and
   for CloudFront to deploy the change. No mail record is touched.
   ```bash
   cd infra/live/prod/us-east-1/dns && terragrunt plan -out=tfplan && terragrunt apply tfplan
   cd ../site && terragrunt plan -out=tfplan && terragrunt apply tfplan
   ```
8. **Deploy**: merging republishes the site, because a push to `main` that touches `site/` runs the `deploy`
   workflow, and the build's canonical links, sitemap and social image now name the domain.

## 4. What is verified, and what is not

Verified offline: the four modules (`validate`, `fmt`, `tflint`, and their mocked-provider tests, with
deliberate breakages that each failed them); the Terragrunt units render the intended state bucket
and key, KMS alias, account guard and tags, and the bootstrap units render their local backends, both
providers and their `exclude` blocks (checked with `terragrunt render`);
`infra/scripts/check-bootstrap-state.sh` against clean, secret-bearing, stray and
backup state; the workflows (`actionlint`, with `shellcheck` on their shell); the URL mapping against
every page the site builds; and `site/scripts/smoke.sh` against a local stand-in for S3 and CloudFront, healthy
and with four faults injected, each of which it caught.

Verified against AWS: every plan was read before its apply, and the applied units re-plan with no changes.
The first deploy worked end to end: the OIDC trust, `aws s3 sync`, the invalidation and the smoke checks. The
distribution serves the home page, the three audience pages, the icons, the social image and the sitemap with
HSTS and `nosniff`, and answers a missing page with the site's own 404.

The domain's zone answered as Namecheap's DNS did before any nameserver moved: A, MX, both TXT values, the CNAME and
the DKIM key (five record sets, eight values), each read from the zone with `test-dns-answer` and from a public
resolver, matched, and the unit re-plans with no changes. The first apply stopped at the TXT records, because the
provider adds a TXT value's quotation marks itself and Route 53 refuses a second pair. The module now takes plain
text, and a test guards it. After the nameservers moved, Cloudflare and Google answered the zone's SOA from Route 53
and every record set matched again, `http://mwavuli.co/` still answered 302 to `http://www.mwavuli.co/`, and
`www` still answered 200.

The site on the domain: ACM issued the certificate within a minute of its validation records, and the distribution
deployed the aliases in under three minutes. Then `https://www.mwavuli.co/` served the site on a certificate that
covers both names, `https://mwavuli.co/` answered a 301 to it with the path and query kept, plain HTTP redirected to
HTTPS first, the zone answered A and AAAA for both names, and `site/scripts/smoke.sh` passed against the domain. The
mail records answered exactly as the `dns` unit declares from Cloudflare and Google, and the `dns`, `site` and
`deploy-role` units re-plan with no changes. The redirect has tests of its own (`functions/viewer-request.test.mjs`),
and each new module test was shown to fail when what it guards was broken: the aliases, the alias target's hosted
zone, and the AAAA records.

State replication did not work at first, and the offline tests could not show it: every object failed, because
both buckets use an S3 Bucket Key, so KMS sees the bucket's own ARN as the encryption context, and the
replication role's condition admitted only the bucket's objects. The module now admits both, a test guards it,
and the four state objects then replicated (`COMPLETED`, each encrypted with its own key, and again in the
replica with the replica's).

Not verified: a message delivered to the domain after the move (the mail records were compared, no mail was
sent); resolvers that still hold Namecheap's nameservers, which send a visitor to the old redirect and parking page
until their cache expires; the certificate's renewal, which ACM does by itself while the validation records stay in
the zone; and the deploy role's refusal of anything outside the site (its policy was read, and no request outside it
was tried).
