# The site: its private bucket and the CloudFront distribution that serves it.
#
# Until the production domain exists (brand D4) the site answers on the distribution's own
# *.cloudfront.net name, which is also where the deploy workflow checks it. Adding the domain adds
# `aliases` and `certificate_arn` here, and the DNS records in their own unit.

include "root" { path = find_in_parent_folders("root.hcl") }

terraform {
  source = "${get_repo_root()}/infra/modules/static-site"
}

inputs = {
  name = "mwavuli-site"

  # Global, and it outlives the account, so it carries no account id: nyange-site's bucket is named
  # the same way.
  bucket_name = "mwavuli-site-prod-us-east-1"

  # Pre-launch the bucket holds a site that rebuilds from git, but one that empties itself on
  # destroy is a footgun the moment it holds anything else. Teardown flips this deliberately.
  force_destroy = false

  tags = { Component = "site" }
}
