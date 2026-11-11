# The role the deploy workflow assumes, and GitHub's OIDC provider in this account.
#
# Created by a person with administrator credentials in the account, like everything under infra/live/:
# the workflow cannot create the credential it must already hold. Its output is the AWS_DEPLOY_ROLE_ARN
# repository variable.

include "root" { path = find_in_parent_folders("root.hcl") }

locals {
  cfg = yamldecode(file("${get_repo_root()}/infra/catalog/account.yaml"))
}

terraform {
  source = "${get_repo_root()}/infra/modules/github-deploy-role"
}

inputs = {
  github_org       = local.cfg.github_org
  repository       = local.cfg.repo
  github_owner_id  = local.cfg.github_owner_id
  github_repo_id   = local.cfg.github_repo_id
  environments     = ["production"]
  site_bucket_name = local.cfg.site_bucket_name
}
