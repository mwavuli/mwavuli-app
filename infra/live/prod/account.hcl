# Settings shared by every unit in this account. A unit reads them with
#
#   read_terragrunt_config(find_in_parent_folders("account.hcl")).locals
#
# The account is Primary, a member of Mwavuli's own AWS organization (docs/design/aws-organization.md).
# Nothing here, and nothing in infra/, depends on an account, organization or repository outside
# Mwavuli's. Whoever applies signs in through Identity Center with administrator access to this account
# (docs/design/site-infrastructure.md).

locals {
  org_name     = "mwavuli"
  account_name = "prod"

  # The repository's name (github.com/mwavuli/<repo>): the prefix of every state key, the repository the
  # deploy role trusts, and the Repo tag.
  repo = "mwavuli-app"

  # What the site's own resources are called. The repository holds more than the site, so the site does not
  # borrow the repository's name.
  site_name = "mwavuli-site"

  # The 12-digit id of the account (Primary in the organization). The generated provider refuses any
  # other account, so a shell signed in somewhere else fails at plan and creates nothing.
  aws_account_id = "341026626249"

  # The state backend lives in the home region, and its bucket is replicated to the second one, so
  # losing the home region does not lose the infrastructure's memory.
  home_region    = "us-east-1"
  replica_region = "us-west-2"

  # <org>-tfstate-<account>-<region>. The bootstrap unit creates both buckets, and every other unit's
  # backend points at the first.
  state_bucket         = "${local.org_name}-tfstate-${local.account_name}-${local.home_region}"
  state_replica_bucket = "${local.org_name}-tfstate-${local.account_name}-${local.replica_region}"

  # The site's bucket, in the home region. Global, and it outlives the account, so it carries no account
  # id. The site unit creates it and the deploy role's policy names it.
  site_bucket_name = "${local.site_name}-${local.account_name}-${local.home_region}"

  common_tags = {
    ManagedBy   = "opentofu"
    Repo        = local.repo
    Project     = local.org_name
    Environment = local.account_name
  }
}
