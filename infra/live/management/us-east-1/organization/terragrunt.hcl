# The AWS organization: its trusted services, policy types, delegated administrators and centralized root
# access.
#
# Applied by a person signed in to the management account, like everything under infra/live/. The
# runbook is docs/design/aws-organization.md, section 4.

include "root" { path = find_in_parent_folders("root.hcl") }

locals {
  account = read_terragrunt_config(find_in_parent_folders("account.hcl")).locals

  # Mwavuli Identity Delegated Admin: the account Identity Center and account access are delegated to.
  identity_account_id = "038323433637"
}

terraform {
  source = "${get_repo_root()}/infra/modules/organization"
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

  # Service control policies are off: the owner disabled them on the root, so enabling them again is a change
  # made here.
  enabled_policy_types = ["RESOURCE_CONTROL_POLICY"]

  delegated_administrators = {
    "account-access.amazonaws.com" = local.identity_account_id
    "sso.amazonaws.com"            = local.identity_account_id
  }
}
