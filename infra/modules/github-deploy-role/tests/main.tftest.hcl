# Checks the deploy role's invariants against a mocked provider, so they run without AWS credentials:
#
#   tofu test        (from infra/modules/github-deploy-role)
#
# The AWS provider's IAM policy documents are mocked too, so the policies are checked through the
# statements they are configured with.

mock_provider "aws" {
  mock_data "aws_caller_identity" {
    defaults = { account_id = "111111111111" }
  }

  mock_data "aws_partition" {
    defaults = { partition = "aws" }
  }

  # The role and its policy refuse a document that is not JSON.
  mock_data "aws_iam_policy_document" {
    defaults = { json = "{\"Version\":\"2012-10-17\",\"Statement\":[]}" }
  }
}

override_resource {
  target = aws_iam_openid_connect_provider.github
  values = { arn = "arn:aws:iam::111111111111:oidc-provider/token.actions.githubusercontent.com" }
}

variables {
  github_org       = "example-org"
  repository       = "example-site"
  github_owner_id  = "1234"
  github_repo_id   = "5678"
  site_bucket_name = "example-site-prod-us-east-1"
}

run "only_this_repository_in_the_production_environment_can_assume_it" {
  command = apply

  assert {
    condition = (
      length(data.aws_iam_policy_document.trust.statement) == 1
      && data.aws_iam_policy_document.trust.statement[0].actions == toset(["sts:AssumeRoleWithWebIdentity"])
    )
    error_message = "The trust policy allows web identity federation and nothing else."
  }

  assert {
    condition = alltrue([
      for c in data.aws_iam_policy_document.trust.statement[0].condition :
      c.test == "StringEquals"
    ])
    error_message = "Every trust condition must be an exact match: a wildcard is how a fork acquires the role."
  }

  assert {
    condition = anytrue([
      for c in data.aws_iam_policy_document.trust.statement[0].condition :
      c.variable == "token.actions.githubusercontent.com:aud" && toset(c.values) == toset(["sts.amazonaws.com"])
    ])
    error_message = "The token's audience must be sts.amazonaws.com."
  }

  assert {
    condition = anytrue([
      for c in data.aws_iam_policy_document.trust.statement[0].condition :
      c.variable == "token.actions.githubusercontent.com:sub" && toset(c.values) == toset([
        "repo:example-org/example-site:environment:production",
        "repo:example-org@1234/example-site@5678:environment:production",
      ])
    ])
    error_message = "Only the production environment of this repository, in both subject forms, may assume the role."
  }
}

run "the_role_can_publish_and_invalidate_and_nothing_else" {
  command = apply

  assert {
    condition = alltrue([
      for s in data.aws_iam_policy_document.deploy.statement :
      !anytrue([for a in s.actions : a == "*" || endswith(a, ":*")])
    ])
    error_message = "No statement may allow a wildcard action."
  }

  assert {
    condition = alltrue([
      for s in data.aws_iam_policy_document.deploy.statement :
      s.resources == toset(["*"]) ? s.actions == toset(["cloudfront:ListDistributions"]) : true
    ])
    error_message = "Only ListDistributions, which cannot be scoped, may name every resource."
  }

  assert {
    condition = anytrue([
      for s in data.aws_iam_policy_document.deploy.statement :
      s.sid == "PublishToTheSiteBucket" && s.resources == toset([
        "arn:aws:s3:::example-site-prod-us-east-1",
        "arn:aws:s3:::example-site-prod-us-east-1/*",
      ])
    ])
    error_message = "Publishing is limited to the site bucket."
  }

  assert {
    condition = !anytrue([
      for s in data.aws_iam_policy_document.deploy.statement :
      anytrue([for a in s.actions : a == "s3:DeleteObject" || startswith(a, "iam:") || startswith(a, "cloudfront:Update") || startswith(a, "cloudfront:Create") && a != "cloudfront:CreateInvalidation"])
    ])
    error_message = "The deploy role must not delete objects, touch IAM, or change a distribution."
  }

  assert {
    condition = anytrue([
      for s in data.aws_iam_policy_document.deploy.statement :
      s.sid == "InvalidateTheSiteDistribution" && s.resources == toset(["arn:aws:cloudfront::111111111111:distribution/*"])
    ])
    error_message = "Invalidation is limited to distributions in this account."
  }
}

run "an_environment_is_required" {
  command = plan

  variables {
    environments = []
  }

  expect_failures = [var.environments]
}

run "the_owner_and_repository_ids_must_be_numeric" {
  command = plan

  variables {
    github_repo_id = "not-a-number"
  }

  expect_failures = [var.github_repo_id]
}
