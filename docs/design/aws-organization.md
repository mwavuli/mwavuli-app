# AWS organization and Identity Center

**Intent**: how Mwavuli's AWS organization and IAM Identity Center are kept as code, what already existed when
they were adopted, and the order a person applies them in. The site's own infrastructure is in
[`site-infrastructure.md`](site-infrastructure.md).

| | |
|---|---|
| This repository owns | the organization's settings (trusted services, policy types, delegated administrators, centralized root access); Identity Center permission sets, access groups, their assignments and their members; one state backend per account that holds units |
| Adopted, not created | the organization, its three accounts, the Identity Center instance and two access groups |
| Not in code | the Identity Center instance itself (console), enabling permission sets on it (one CLI call), the users (console or an identity provider), the organization's existing service control policies, the accounts |
| Status | **applied** on 2026-11-12 and re-planning clean; the management account's root access keys are not retired yet (section 4) |

Decisions are numbered `O1…` and are the record of _why_. A decision that stops being true is replaced, not
renumbered.

---

## 1. What exists

Read from the account with read-only calls when the code was written (2026-11-12). The code adopts all of it.

| | |
|---|---|
| Organization | `o-nx6i6nk36w`, all features, root `r-ufqt` with resource control policies enabled, no OUs. Service control policies were enabled too, until the owner disabled them (O10). |
| Accounts | `020784398387` Mwavuli Management Account (the management account), `341026626249` Primary and `038323433637` Mwavuli Identity Delegated Admin, the last two created in the organization |
| Trusted services | account-access, account, compute-optimizer, cost-optimization-hub, iam, notifications, sso |
| Delegated administrator | `038323433637`, for `sso.amazonaws.com` and `account-access.amazonaws.com` |
| Service control policies | Seven came with the organization: AWS's `FullAWSAccess`, a region restriction, a managed-account policy and four budget-limit policies. They remain as unattached objects. None is this code's. |
| Identity Center | instance `Mwavuli` (`ssoins-722393b28f056581`) in us-east-1, owned by the management account, active, with **permission sets not enabled**, so nobody can sign in to an account through it yet |
| Identity store | `d4e8e478-e051-70f9-d1ca-7ca4936212b1`: two groups, `341026626249-AdministratorAccess` and `038323433637-AdministratorAccess`, two users, no assignment |

## 2. Decisions

### O1 — Adopt what exists

An organization and its Identity Center instance cannot be recreated for the sake of the code: deleting them
means closing accounts. Each unit imported its resources on the first apply (`import` blocks the unit
generated, since deleted), so the plan showed what adoption would change before anything did.

### O2 — Three accounts, each with one job

- **Management** (`020784398387`) holds the organization, Identity Center and the state of both. It runs no
  workload, so a workload's mistake is never made in the account that can close the others.
- **Mwavuli Identity Delegated Admin** (`038323433637`) is registered as the delegated administrator and is
  left as it is: nothing here manages it or runs in it (O3).
- **Primary** (`341026626249`) is `prod`: the site, its deploy role and its state backend.

### O3 — Identity Center is administered from the management account

AWS recommends delegating Identity Center administration so the management account stays minimal. The
delegation exists, and the code does not use it. A delegated administrator cannot manage access to the
management account, or the permission sets assigned in it, so using it would take two Identity Center units and a
third state backend, for a team of one or two. Revisit when more people administer: move the units for the
member accounts into the delegated account and keep a small one here for the management account's own access.

### O4 — Access is granted to groups, one per account and permission set

A group is named `<account id>-<permission set>` and holds that permission set in that account, which is the
pattern the two existing groups already follow. Assignments go to groups and never to people, so who may do
what is one list and joining or leaving is a change of membership. It starts with `AdministratorAccess` in
the three accounts. Another level is a permission set and a name in the unit's `access`.

### O5 — People stay out of the repository

The repository is public, and a user name is usually an email address. The users are made in the console (an
invitation has to be sent from there anyway) or arrive from an identity provider. Group membership comes from a
gitignored file, `memberships.local.json` next to the unit (`memberships.example.json` shows the shape), read
when it exists. Without it, no membership is managed.

### O6 — Centralized root access

The organization enables root credentials management and root sessions. A member account then needs no root
password, no root MFA device and no root access key: the management account can remove them, and take a
short root session for the rare task that needs one. It does not touch the management account's own root
user, which keeps its credentials (step 7 of the runbook retires only its access keys).

### O7 — Trusted services and policy types are authoritative

The organization resource sets the whole list: a service left out of `service_access_principals` loses its
trusted access, and a policy type left out is disabled. The unit lists every service that was on when the
organization was adopted, and only the resource control policy type (O10), and the module refuses a list
without Identity Center or IAM.

### O8 — One state backend per account that holds units

The management account's units keep their state in its own bucket (`mwavuli-tfstate-management-us-east-1`,
replicated to us-west-2) and the prod account's in its own, each made by its own bootstrap unit with
committed local state (`00-tfstate-management`, `01-tfstate-prod`). Each backend costs about two dollars a
month, almost all of it its two KMS keys. Organizations and Identity Center cost nothing.

### O9 — What the code leaves alone

The policy objects the organization came with, OUs (there are none, and two workload accounts do not need
them yet) and the accounts themselves. An account is read, not managed: changing its name or email would
replace it, and nothing here needs to.

### O10 — Service control policies are off

The organization came with service control policies, among them a region policy that allowed S3, KMS and
most other services in us-east-2 only for every member account. The first apply of the prod state backend
in us-east-1 was refused by an explicit deny in that policy, and a replica in us-west-2 could not have
been made either. The owner disabled service control policies on the root rather than move prod, and the
apply then went through. What that gives up: nothing now stops a member account leaving the organization
or using a region, and the managed-account policy that protected the managed roles is off with the rest.
Turning them back on is a change made here (`SERVICE_CONTROL_POLICY` in the unit's `enabled_policy_types`),
with policies written to suit prod's regions: us-east-1 for CloudFront's certificates and us-west-2 for the
state replica.

## 3. What a person should know first

- **Enabling permission sets cannot be undone.** After the `update-instance` call, permission sets stay
  enabled. Nothing is assigned until the Identity Center unit applies, so it changes no one's access.
- **The first applies run as the management account's root user**, because it is the only access there is
  until Identity Center works. Steps 1 to 4 use it and step 7 retires it. Root cannot assume a role, so the
  prod account is reached through an Identity Center session instead.
- **A plan is read before every apply.** The first plans are where an import that does not match shows up, for
  example the description of an adopted group, which updated in place.
- **Access follows group membership.** `AdministratorAccess` in an account reaches exactly the members of that
  account's group, so a user who is in the prod group and not in the management group has no access to the
  management account.

## 4. The order, and where it stands

Each unit is applied from its own directory, with the owner's go-ahead and each plan read first, never from
CI. Steps 1 to 6 were applied on 2026-11-12.

0. **Secure the root user** in the console (MFA), and sign in with its credentials. Not verified: whether the
   root user has MFA.
   ```bash
   export AWS_PROFILE=<the profile holding the root keys> AWS_REGION=us-east-1
   aws sts get-caller-identity        # the management account, 020784398387, as :root
   ```
1. **Bootstrap the management state backend** (done, 21 resources), then commit the state it wrote:
   ```bash
   cd infra/live/_bootstrap/00-tfstate-management
   terragrunt apply
   git add tfstate/terraform.tfstate
   ```
2. **Apply the organization** (done: three imports and one resource added, nothing changed). The unit's import
   blocks are deleted.
   ```bash
   cd infra/live/management/us-east-1/organization
   terragrunt plan && terragrunt apply
   ```
3. **Enable permission sets on the instance** (done), once, irreversibly (section 3):
   ```bash
   aws sso-admin update-instance \
     --instance-arn arn:aws:sso:::instance/ssoins-722393b28f056581 --permission-sets-enabled
   ```
4. **Apply Identity Center** (done: two imports, seven resources added, two changed). The Identity Center user
   names go in `memberships.local.json` first, and the import blocks are deleted afterwards.
   ```bash
   cd infra/live/management/us-east-1/identity-center
   cp memberships.example.json memberships.local.json     # then edit it
   terragrunt plan && terragrunt apply
   ```
5. **Sign in through Identity Center** (done for the prod account). Each administrator accepts the invitation
   and registers an MFA device, and MFA is required at every sign-in in the Identity Center settings. A profile
   for each account goes in `~/.aws/config`, and `aws sso login` gives the CLI a session:
   ```ini
   [sso-session mwavuli]
   sso_start_url = https://ssoins-722393b28f056581.portal.us-east-1.app.aws
   sso_region = us-east-1
   sso_registration_scopes = sso:account:access

   [profile mwavuli-prod-admin]
   sso_session = mwavuli
   sso_account_id = 341026626249
   sso_role_name = AdministratorAccess
   region = us-east-1
   ```
   ```bash
   aws sso login --sso-session mwavuli      # add --use-device-code --no-browser away from the machine's browser
   aws sts get-caller-identity --profile mwavuli-prod-admin     # an assumed role in that account
   ```
   The management account takes the same profile with `sso_account_id = 020784398387`, for a user in its group.
6. **Bootstrap the prod state backend, then apply the site and the deploy role** (done: 21, 8 and 3 resources),
   with the prod profile, committing the backend's state. Section 3 of
   [`site-infrastructure.md`](site-infrastructure.md) has the rest. The first attempt was refused by a service
   control policy until the owner disabled them (O10).
   ```bash
   cd infra/live/_bootstrap/01-tfstate-prod
   terragrunt apply
   git add tfstate/terraform.tfstate
   ```
7. **Retire the root access keys** (not done). In the console, as the root user, delete the management
   account's access keys, keep its password and MFA device somewhere safe and offline, and remove the profile
   from `~/.aws/credentials`. Nothing in this repository needs the root user after step 4.
8. **Optional: remove the member accounts' root credentials** (not done) from the IAM console's root access
   management page, which O6 makes possible.

## 5. What is verified, and what is not

Verified offline: both new modules (`validate`, `fmt` and seventeen mocked-provider tests, with nineteen
deliberate breakages that each failed them), and the units rendered the intended state bucket and key, KMS alias,
account guard, tags, imports and inputs (`terragrunt render`).

Verified against AWS: every plan was read before its apply and showed what the order above says. The
organization and Identity Center units then re-planned with no changes, and the prod account's sign-in
through Identity Center produced an `AdministratorAccess` session in Primary. State replication was verified
there too: it failed on every object at first, and the fix is described in section 4 of
[`site-infrastructure.md`](site-infrastructure.md). What section 1 records was read from the live account with
read-only calls.

Not verified: a sign-in to the management account through Identity Center (the user who signed in to prod is not
in its group), MFA for the Identity Center users and for the root user, and the account with service control
policies back on.
