# infra

The Mwavuli AWS infrastructure: OpenTofu modules and Terragrunt units, **applied** on 2026-11-12 with the owner's
go-ahead. CI only validates them, and applying is never a CI step. The organization and Identity Center, which
existed already and were adopted by import, are in
[`docs/design/aws-organization.md`](../docs/design/aws-organization.md), with the order to apply them in. The site, the
state backend and the deploy role are in [`docs/design/site-infrastructure.md`](../docs/design/site-infrastructure.md).

```
modules/                      OpenTofu modules: organization, identity-center, state-backend, static-site, github-deploy-role
live/_bootstrap/              one state backend per account, bootstrapped once by a person, local state committed:
                              00-tfstate-management, 01-tfstate-prod
live/management/              the management account (020784398387): account.hcl, then us-east-1/ with region.hcl and the
                              units organization and identity-center
live/prod/                    the prod account (Primary, 341026626249): account.hcl, then us-east-1/ with region.hcl and the
                              units site and deploy-role
root.hcl                      state backend, provider and tags for every unit under live/<account>/<region>/
scripts/                      test-modules.sh, check-bootstrap-state.sh
```

The infrastructure is standalone: its own AWS organization, state backends, Identity Center, OIDC provider and deploy
role. Nothing reads from or registers with an account, organization or repository outside Mwavuli's.

## Checks

CI and a laptop run the same things, without AWS credentials:

```bash
pnpm nx run-many -t lint test check --projects=infra
```

`lint` is `tofu fmt`, `terragrunt hcl fmt --check` and `shellcheck`. `test` runs, for each module, `tofu init -backend=false`
in readonly-lock mode, `fmt`, `validate` and `tofu test` against mocked providers. `check` (`nx run-many -t check`) confirms
that the only state in git is a bootstrap unit's own and holds nothing secret-bearing; it reads git, not just this
folder, so Nx never caches it. It needs OpenTofu 1.13, Terragrunt 1.1 and shellcheck.

Applying is not an Nx target and never runs from CI. Section 4 of the organization record gives the order from the
first apply to Identity Center sign-in, and section 3 of the site record the order after it.
