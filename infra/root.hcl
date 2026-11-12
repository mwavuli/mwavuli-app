# Root Terragrunt configuration for every unit under infra/live/<account>/<region>/.
#
#   include "root" { path = find_in_parent_folders("root.hcl") }
#
# A unit's account and region come from the account.hcl and region.hcl above it. The bootstrap units
# under infra/live/_bootstrap/ do not include this file: they keep their own state and create the
# backend it points at.

locals {
  account = read_terragrunt_config(find_in_parent_folders("account.hcl")).locals
  region  = read_terragrunt_config(find_in_parent_folders("region.hcl")).locals

  # regex() fails on anything but 12 digits and puts the offending value in its message, so an unset or
  # mistyped id in account.hcl stops Terragrunt here.
  aws_account_id = regex("^[0-9]{12}$", local.account.aws_account_id)

  # The state key is derived from the directory path and never hand-written:
  # <repo>/<account>/<region>/<unit>/tofu.tfstate.
  all_parts  = compact(split("/", path_relative_to_include()))
  path_parts = local.all_parts[0] == "live" ? slice(local.all_parts, 1, length(local.all_parts)) : local.all_parts
  state_key  = "${local.account.repo}/${join("/", local.path_parts)}/tofu.tfstate"
}

# S3 with native locking: no DynamoDB table (use_lockfile needs OpenTofu 1.10 or later). The bucket and
# its key are created by the account's unit under infra/live/_bootstrap/. The key is named by its alias,
# so a rotated key needs no change here.
remote_state {
  backend = "s3"
  generate = {
    path      = "backend.tf"
    if_exists = "overwrite"
  }
  config = {
    bucket       = local.account.state_bucket
    key          = local.state_key
    region       = local.account.home_region
    encrypt      = true
    use_lockfile = true
    kms_key_id   = "arn:aws:kms:${local.account.home_region}:${local.aws_account_id}:alias/${local.account.state_bucket}"
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
      region              = "${local.region.aws_region}"
      allowed_account_ids = ["${local.aws_account_id}"]

      default_tags {
        tags = ${jsonencode(local.account.common_tags)}
      }
    }
  EOT
}
