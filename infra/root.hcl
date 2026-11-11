# Root Terragrunt configuration for every unit under infra/live/<account-alias>/<region>/.
#
#   include "root" { path = find_in_parent_folders("root.hcl") }
#
# The bootstrap units under infra/live/_bootstrap/ do not include it: they keep their own state and
# create the backend this file points at.

locals {
  cfg = yamldecode(file("${get_repo_root()}/infra/catalog/account.yaml"))

  # account_id ships unset. regex() fails on anything but 12 digits and puts the offending value in its
  # message, so Terragrunt stops here until infra/catalog/account.yaml names the account.
  account_id = regex("^[0-9]{12}$", local.cfg.account_id)

  # Path-derived identity: infra/live/<account-alias>/<region>/<unit>/...
  relative_path = path_relative_to_include()
  all_parts     = compact(split("/", local.relative_path))
  path_parts    = local.all_parts[0] == "live" ? slice(local.all_parts, 1, length(local.all_parts)) : local.all_parts
  region        = local.path_parts[1]

  # The state layout is derived and never hand-written: the bucket from the catalog, the key from the
  # directory path. The bucket and its key are created by infra/live/_bootstrap/00-tfstate-backend.
  state_bucket = "${local.cfg.org_name}-tfstate-${local.cfg.account_alias}-${local.cfg.home_region}"
  state_key    = "${local.cfg.repo}/${join("/", local.path_parts)}/tofu.tfstate"
  state_key_id = "arn:aws:kms:${local.cfg.home_region}:${local.account_id}:alias/${local.state_bucket}"

  common_tags = {
    ManagedBy   = "opentofu"
    Repo        = local.cfg.repo
    Project     = local.cfg.org_name
    Environment = local.cfg.account_alias
  }
}

# S3 with native locking: no DynamoDB table (use_lockfile needs OpenTofu 1.10 or later).
remote_state {
  backend = "s3"
  generate = {
    path      = "backend.tf"
    if_exists = "overwrite"
  }
  config = {
    bucket       = local.state_bucket
    key          = local.state_key
    region       = local.cfg.home_region
    encrypt      = true
    use_lockfile = true
    kms_key_id   = local.state_key_id
  }
}

# No assume_role and no profile: whoever applies arrives with credentials already in the account, and
# allowed_account_ids makes the provider refuse any other account, so a shell logged in somewhere else
# fails at plan and creates nothing.
generate "provider" {
  path      = "provider_generated.tf"
  if_exists = "overwrite"
  contents  = <<-EOT
    provider "aws" {
      region              = "${local.region}"
      allowed_account_ids = ["${local.account_id}"]

      default_tags {
        tags = ${jsonencode(local.common_tags)}
      }
    }
  EOT
}
