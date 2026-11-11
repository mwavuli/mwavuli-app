# The role the deploy workflow assumes, and GitHub's OIDC provider in this account.
#
# Created by a person with administrator credentials in the account, like everything under infra/live/:
# the workflow cannot create the credential it must already hold. Its output is the AWS_DEPLOY_ROLE_ARN
# repository variable.

include "root" { path = find_in_parent_folders("root.hcl") }

locals {
  account = read_terragrunt_config(find_in_parent_folders("account.hcl")).locals
}

terraform {
  source = "${get_repo_root()}/infra/modules/github-deploy-role"
}

inputs = {
  github_org = "nyange-app"
  repository = local.account.repo

  # Immutable: GitHub puts both ids in the OIDC subject, and they survive a rename or a transfer.
  #   gh api /users/nyange-app --jq .id
  #   gh api /repos/nyange-app/mwavuli-site --jq .id
  github_owner_id = "314008686"
  github_repo_id  = "1451231111"

  environments     = ["production"]
  site_bucket_name = local.account.site_bucket_name
}
