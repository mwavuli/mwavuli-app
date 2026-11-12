# Settings shared by every unit in the management account. A unit reads them with
#
#   read_terragrunt_config(find_in_parent_folders("account.hcl")).locals
#
# This account owns the organization and Identity Center, and runs no workload: the site lives in prod.
# Its units are applied by a person signed in here, the first time with the root-key profile
# (docs/design/aws-organization.md).

locals {
  org_name     = "mwavuli"
  account_name = "management"

  # The repository's name (github.com/mwavuli/<repo>): the prefix of every state key and the Repo tag.
  repo = "mwavuli-app"

  # The 12-digit id of the account. The generated provider refuses any other account, so a shell signed
  # in somewhere else fails at plan and creates nothing.
  aws_account_id = "020784398387"

  # The state backend lives in the home region, and its bucket is replicated to the second one.
  # Organizations is global and answers in us-east-1, and so does the Identity Center instance.
  home_region    = "us-east-1"
  replica_region = "us-west-2"

  # <org>-tfstate-<account>-<region>. The bootstrap unit creates both buckets, and every other unit's
  # backend points at the first.
  state_bucket         = "${local.org_name}-tfstate-${local.account_name}-${local.home_region}"
  state_replica_bucket = "${local.org_name}-tfstate-${local.account_name}-${local.replica_region}"

  common_tags = {
    ManagedBy   = "opentofu"
    Repo        = local.repo
    Project     = local.org_name
    Environment = local.account_name
  }
}
