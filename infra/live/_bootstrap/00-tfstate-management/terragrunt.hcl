# Bootstrap unit 00: the state backend of the management account, where the organization and Identity
# Center units keep their state. The prod account's is unit 01; each account that holds units has its own
# backend.
#
# Local state, COMMITTED (tfstate/terraform.tfstate): a backend cannot hold the state of the thing that
# creates it. Human-run, once, reviewed. Never from CI, and never with `terragrunt backend bootstrap`,
# which would leave the bucket's own configuration out of code.
#
# Because that state file is in git, this unit creates only the backend and nothing that carries a
# secret: no IAM user, access key, password or secret version. infra/scripts/check-bootstrap-state.sh fails CI
# if a committed bootstrap state holds one.
#
# Run it with credentials in the management account: the first time, the root-key profile, as the runbook
# in docs/design/aws-organization.md (section 4) says.
#
#   cd infra/live/_bootstrap/00-tfstate-management && terragrunt apply
#   git add tfstate/terraform.tfstate     # then commit it
#
# A direct `terragrunt apply` in this directory runs. `run --all` skips it, because of the block below.

exclude {
  if      = true
  actions = ["all"]
}

locals {
  account        = read_terragrunt_config("${get_repo_root()}/infra/live/management/account.hcl").locals
  aws_account_id = regex("^[0-9]{12}$", local.account.aws_account_id)
}

terraform {
  source = "${get_repo_root()}/infra/modules/state-backend"
}

generate "backend" {
  path      = "backend_generated.tf"
  if_exists = "overwrite"
  contents  = <<-EOT
    terraform {
      backend "local" {
        path = "${get_terragrunt_dir()}/tfstate/terraform.tfstate"
      }
    }
  EOT
}

# The second provider is the replica's region. Both refuse any account but the one in account.hcl.
generate "provider" {
  path      = "provider_generated.tf"
  if_exists = "overwrite"
  contents  = <<-EOT
    provider "aws" {
      region              = "${local.account.home_region}"
      allowed_account_ids = ["${local.aws_account_id}"]

      default_tags {
        tags = ${jsonencode(local.account.common_tags)}
      }
    }

    provider "aws" {
      alias               = "replica"
      region              = "${local.account.replica_region}"
      allowed_account_ids = ["${local.aws_account_id}"]

      default_tags {
        tags = ${jsonencode(local.account.common_tags)}
      }
    }
  EOT
}

inputs = {
  bucket_name         = local.account.state_bucket
  replica_bucket_name = local.account.state_replica_bucket
  tags                = local.account.common_tags
}
