# Bootstrap unit 00: the state backend every other unit stores its state in.
#
# Local state, COMMITTED (tfstate/terraform.tfstate): a backend cannot hold the state of the thing that
# creates it. Human-run, once, reviewed. Never from CI, and never with `terragrunt backend bootstrap`,
# which would leave the bucket's own configuration out of code.
#
# Because that state file is in git, this unit creates only the backend and nothing that carries a
# secret: no IAM user, access key, password or secret version. scripts/check-bootstrap-state.sh fails CI
# if a committed bootstrap state holds one.
#
#   cd infra/live/_bootstrap/00-tfstate-backend && terragrunt apply
#   git add tfstate/terraform.tfstate     # then commit it
#
# A direct `terragrunt apply` in this directory runs. `run --all` skips it, because of the block below.

exclude {
  if      = true
  actions = ["all"]
}

locals {
  cfg        = yamldecode(file("${get_repo_root()}/infra/catalog/account.yaml"))
  account_id = regex("^[0-9]{12}$", local.cfg.account_id)

  bucket         = "${local.cfg.org_name}-tfstate-${local.cfg.account_alias}-${local.cfg.home_region}"
  replica_bucket = "${local.cfg.org_name}-tfstate-${local.cfg.account_alias}-${local.cfg.replica_region}"

  tags = {
    ManagedBy   = "opentofu"
    Repo        = local.cfg.repo
    Project     = local.cfg.org_name
    Environment = local.cfg.account_alias
  }
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

# The second provider is the replica's region. Both refuse any account but the catalog's.
generate "provider" {
  path      = "provider_generated.tf"
  if_exists = "overwrite"
  contents  = <<-EOT
    provider "aws" {
      region              = "${local.cfg.home_region}"
      allowed_account_ids = ["${local.account_id}"]

      default_tags {
        tags = ${jsonencode(local.tags)}
      }
    }

    provider "aws" {
      alias               = "replica"
      region              = "${local.cfg.replica_region}"
      allowed_account_ids = ["${local.account_id}"]

      default_tags {
        tags = ${jsonencode(local.tags)}
      }
    }
  EOT
}

inputs = {
  bucket_name         = local.bucket
  replica_bucket_name = local.replica_bucket
  tags                = local.tags
}
