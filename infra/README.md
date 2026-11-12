# infra

The Mwavuli AWS infrastructure: OpenTofu modules and Terragrunt units. **Nothing is applied**: the account does not
exist yet, and a person applies everything. Why each piece is the way it is, and what the owner must supply before the
first apply, is in [`docs/design/site-infrastructure.md`](../docs/design/site-infrastructure.md).

```
modules/                      OpenTofu modules: state-backend, static-site, github-deploy-role
live/_bootstrap/00-tfstate-backend/   the state backend, bootstrapped once by a person, local state committed
live/prod/account.hcl         the account's settings (its id ships as `unset`)
live/prod/us-east-1/          region.hcl, then one directory per unit: site, deploy-role
root.hcl                      state backend, provider and tags for every unit under live/<account>/<region>/
scripts/                      test-modules.sh, check-bootstrap-state.sh
```

The infrastructure is standalone: its own AWS account, state backend, OIDC provider and deploy role. Nothing reads from or
registers with any other account, organization or repository.

## Checks

CI and a laptop run the same things, without AWS credentials:

```bash
pnpm nx run-many -t lint test --projects=infra
```

`lint` is `tofu fmt`, `terragrunt hcl fmt --check` and `shellcheck`. `test` runs, for each module, `tofu init -backend=false`
in readonly-lock mode, `fmt`, `validate` and `tofu test` against mocked providers, then checks that the only state in git
is a bootstrap unit's own and holds nothing secret-bearing. It needs OpenTofu 1.13, Terragrunt 1.1 and shellcheck.

Applying is not an Nx target and never runs from CI. See section 3 of the design record for the order.
