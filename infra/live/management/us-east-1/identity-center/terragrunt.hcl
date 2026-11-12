# IAM Identity Center access: permission sets, the groups that hold them, and their assignments to accounts.
#
# The instance exists (enabled in the console, in us-east-1), and so do two of the groups below, so the
# first plan imports those. Permission sets must be enabled on the instance before this applies, which only
# a CLI call can do. The runbook is docs/design/aws-organization.md, section 4.
#
# This runs in the management account, which can manage every account's access, its own included. The
# delegated administrator account could not manage the management account's.

include "root" { path = find_in_parent_folders("root.hcl") }

locals {
  account = read_terragrunt_config(find_in_parent_folders("account.hcl")).locals
  prod    = read_terragrunt_config("${get_repo_root()}/infra/live/prod/account.hcl").locals

  # Mwavuli Identity Delegated Admin: the account Identity Center administration is delegated to.
  identity_account_id = "038323433637"

  identity_store_id = "d4e8e478-e051-70f9-d1ca-7ca4936212b1"

  # The access groups that exist already, by name, with their ids in the identity store.
  existing_groups = {
    "${local.identity_account_id}-AdministratorAccess" = "44f86498-50a1-707e-9592-16b236eb03de"
    "${local.prod.aws_account_id}-AdministratorAccess" = "a4c81468-6081-7033-bb68-92832fb90df7"
  }

  # Who belongs to which group is kept out of this repository, which is public: a gitignored file of
  # group name to user names, optional. memberships.example.json shows its shape.
  memberships_file = "${get_terragrunt_dir()}/memberships.local.json"
}

terraform {
  source = "${get_repo_root()}/infra/modules/identity-center"
}

# The first plan adopts the groups that exist. OpenTofu ignores an import whose address is already in
# state, so these are spent after the first apply: delete this block then.
generate "imports" {
  path      = "imports_generated.tf"
  if_exists = "overwrite"
  contents = join("\n\n", [
    for name, id in local.existing_groups :
    "import {\n  to = aws_identitystore_group.this[\"${name}\"]\n  id = \"${local.identity_store_id}/${id}\"\n}"
  ])
}

inputs = {
  accounts = {
    management = local.account.aws_account_id
    identity   = local.identity_account_id
    prod       = local.prod.aws_account_id
  }

  permission_sets = {
    AdministratorAccess = {
      description         = "Full access to the account."
      session_duration    = "PT4H"
      managed_policy_arns = ["arn:aws:iam::aws:policy/AdministratorAccess"]
    }
  }

  # Each pair is a group, <account id>-<permission set>, holding that permission set in that account. Another
  # level of access is a permission set above and a name here.
  access = {
    management = ["AdministratorAccess"]
    identity   = ["AdministratorAccess"]
    prod       = ["AdministratorAccess"]
  }

  memberships = fileexists(local.memberships_file) ? jsondecode(file(local.memberships_file)) : {}
}
