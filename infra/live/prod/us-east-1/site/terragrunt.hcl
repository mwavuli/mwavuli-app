# The site: its private bucket and the CloudFront distribution that serves it, on the account's domain.
#
# The site answers on www.<domain>, and the bare domain redirects there (M14 in
# docs/design/site-infrastructure.md). The module issues the certificate, validates it in the `dns` unit's
# zone and creates the records that point both names at the distribution, so the zone's email records stay
# in the `dns` unit and nothing here touches them. The distribution's own *.cloudfront.net name answers
# too, and is where the deploy workflow checks a publish.

include "root" { path = find_in_parent_folders("root.hcl") }

locals {
  account = read_terragrunt_config(find_in_parent_folders("account.hcl")).locals
}

terraform {
  source = "${get_repo_root()}/infra/modules/static-site"
}

dependency "dns" {
  config_path = "../dns"

  mock_outputs                            = { zone_id = "Z00000000000000000000" }
  mock_outputs_allowed_terraform_commands = ["init", "validate"]
}

inputs = {
  name        = local.account.site_name
  bucket_name = local.account.site_bucket_name

  domain = {
    zone_id   = dependency.dns.outputs.zone_id
    canonical = "www.${local.account.domain_name}"
    redirects = [local.account.domain_name]
  }

  # Pre-launch the bucket holds a site that rebuilds from git, but one that empties itself on
  # destroy is a footgun the moment it holds anything else. Teardown flips this deliberately.
  force_destroy = false

  tags = { Component = "site" }
}
