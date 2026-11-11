# Root Terragrunt configuration. Every unit includes this.
#
#   include "root" { path = find_in_parent_folders("root.hcl") }
#
# Follows nyange-site/infra/root.hcl, so a reader moving between the two repositories learns one
# convention. The one difference is that the module lives in this repository (infra/modules/), so
# there is no module version catalog.

locals {
  org = yamldecode(file("${get_repo_root()}/infra/catalog/org.yaml"))

  # Path-derived identity: infra/live/<account-alias>/<region>/<unit>/...
  relative_path = path_relative_to_include()
  all_parts     = compact(split("/", local.relative_path))
  path_parts    = local.all_parts[0] == "live" ? slice(local.all_parts, 1, length(local.all_parts)) : local.all_parts
  account_alias = local.path_parts[0]
  region_part   = length(local.path_parts) > 1 ? local.path_parts[1] : "global"
  region        = local.region_part == "global" ? local.org.home_region : local.region_part

  # State layout is derived from the directory path and never hand-written. The <repo> segment is why
  # repositories share one backend, and the backend's grant names this repository's deploy role, so the
  # prefix is a boundary and not only a convention.
  state_bucket = "${local.org.org_name}-tfstate-${local.org.state_account_alias}-${local.org.home_region}"
  state_key    = "${local.org.repo}/${join("/", local.path_parts)}/tofu.tfstate"

  # The account contract carries the governance facts nyange-org already holds in catalog/accounts.yaml,
  # so they are read here and not restated. The tag policy and cost allocation both key on them.
  _account = jsondecode(run_cmd(
    "--terragrunt-quiet", "aws", "ssm", "get-parameter",
    "--name", "/nyange/platform/account",
    "--query", "Parameter.Value", "--output", "text",
  ))

  common_tags = {
    ManagedBy          = "opentofu"
    Repo               = local.org.repo
    Owner              = local._account.owning_department
    OwningDepartment   = local._account.owning_department
    CostCenter         = local._account.cost_center
    Environment        = local._account.environment
    Scope              = local._account.scope
    ScopeType          = local._account.scope_type
    DataClassification = local._account.data_classification
  }
}

# S3 with native locking: no DynamoDB table (use_lockfile needs OpenTofu >= 1.10).
remote_state {
  backend = "s3"
  generate = {
    path      = "backend.tf"
    if_exists = "overwrite"
  }
  config = {
    bucket       = local.state_bucket
    key          = local.state_key
    region       = local.org.home_region
    encrypt      = true
    use_lockfile = true
    kms_key_id   = local.org.state_kms_key_arn
  }
}

# No assume_role and no profile, locally or in CI: whoever runs this arrives with credentials already
# in the account. One path, deliberately, because the account contract above is read with run_cmd,
# which uses ambient credentials, and a provider that hopped into another account would disagree with
# it about which account it was in.
generate "provider" {
  path      = "provider_generated.tf"
  if_exists = "overwrite"
  contents  = <<-EOT
    provider "aws" {
      region              = "${local.region}"
      allowed_account_ids = ["${local.org.account_ids[local.account_alias]}"]

      default_tags {
        tags = ${jsonencode(local.common_tags)}
      }
    }
  EOT
}
