# The AWS organization, adopted: it exists already, so the first plan imports it instead of creating it.
#
# Applied by a person signed in to the management account, like everything under infra/live/. The
# runbook is docs/design/aws-organization.md, section 4.

include "root" { path = find_in_parent_folders("root.hcl") }

locals {
  account = read_terragrunt_config(find_in_parent_folders("account.hcl")).locals

  organization_id = "o-nx6i6nk36w"

  # Mwavuli Identity Delegated Admin: the account Identity Center and account access are delegated to.
  identity_account_id = "038323433637"
}

terraform {
  source = "${get_repo_root()}/infra/modules/organization"
}

# The first plan adopts what exists. OpenTofu ignores an import whose address is already in state, so these
# are spent after the first apply: delete this block then.
generate "imports" {
  path      = "imports_generated.tf"
  if_exists = "overwrite"
  contents  = <<-EOT
    import {
      to = aws_organizations_organization.this
      id = "${local.organization_id}"
    }

    import {
      to = aws_organizations_delegated_administrator.this["account-access.amazonaws.com"]
      id = "${local.identity_account_id}/account-access.amazonaws.com"
    }

    import {
      to = aws_organizations_delegated_administrator.this["sso.amazonaws.com"]
      id = "${local.identity_account_id}/sso.amazonaws.com"
    }
  EOT
}

inputs = {
  # Authoritative: a service left out of this list loses its trusted access. These are the services that
  # were trusted when the organization was adopted.
  service_access_principals = [
    "account-access.amazonaws.com",
    "account.amazonaws.com",
    "compute-optimizer.amazonaws.com",
    "cost-optimization-hub.bcm.amazonaws.com",
    "iam.amazonaws.com",
    "notifications.amazonaws.com",
    "sso.amazonaws.com",
  ]

  enabled_policy_types = ["RESOURCE_CONTROL_POLICY", "SERVICE_CONTROL_POLICY"]

  delegated_administrators = {
    "account-access.amazonaws.com" = local.identity_account_id
    "sso.amazonaws.com"            = local.identity_account_id
  }
}
