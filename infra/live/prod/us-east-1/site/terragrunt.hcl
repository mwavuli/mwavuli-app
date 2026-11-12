# The site: its private bucket and the CloudFront distribution that serves it.
#
# Until the production domain exists (brand D4) the site answers on the distribution's own
# *.cloudfront.net name, which is also where the deploy workflow checks it. Adding the domain adds
# `aliases` and `certificate_arn` here, with the DNS records and the certificate in units of their own.

include "root" { path = find_in_parent_folders("root.hcl") }

locals {
  account = read_terragrunt_config(find_in_parent_folders("account.hcl")).locals
}

terraform {
  source = "${get_repo_root()}/infra/modules/static-site"
}

inputs = {
  name        = local.account.site_name
  bucket_name = local.account.site_bucket_name

  # Pre-launch the bucket holds a site that rebuilds from git, but one that empties itself on
  # destroy is a footgun the moment it holds anything else. Teardown flips this deliberately.
  force_destroy = false

  tags = { Component = "site" }
}
