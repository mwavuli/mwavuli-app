# The credential the deploy workflow holds: GitHub's OIDC provider in this account and one role that a
# job in one repository, running in one environment, can assume. No stored key exists anywhere.
#
# The role publishes the built site and invalidates its distribution, and can change nothing else. A
# person applies infrastructure, with their own credentials.
#
# One OIDC provider per account: applying this where the account already has GitHub's provider fails
# with EntityAlreadyExists, and the provider should then be imported.

data "aws_caller_identity" "current" {}

data "aws_partition" "current" {}

locals {
  role_name = coalesce(var.role_name, "${var.repository}-deploy")

  # Both forms of the subject, for each allowed environment. GitHub puts the numeric owner and
  # repository ids into the subject when asked to, and then the classic repo:<owner>/<repo> form is no
  # longer sent: a role that trusted only that one could not be assumed at all.
  subjects = flatten([
    for e in var.environments : [
      "repo:${var.github_org}/${var.repository}:environment:${e}",
      "repo:${var.github_org}@${var.github_owner_id}/${var.repository}@${var.github_repo_id}:environment:${e}",
    ]
  ])

  bucket_arn = "arn:${data.aws_partition.current.partition}:s3:::${var.site_bucket_name}"
}

# No thumbprint: AWS verifies GitHub's certificate chain itself, and a pinned thumbprint is an outage
# waiting for a rotation date nobody has in a calendar.
resource "aws_iam_openid_connect_provider" "github" {
  url            = "https://token.actions.githubusercontent.com"
  client_id_list = ["sts.amazonaws.com"]
  tags           = var.tags
}

data "aws_iam_policy_document" "trust" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    # StringEquals on the whole subject, never StringLike with a wildcard: a wildcard is how a fork, or an
    # unrelated branch of the same owner, acquires the credentials.
    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values   = local.subjects
    }
  }
}

resource "aws_iam_role" "deploy" {
  name                 = local.role_name
  description          = "Publishes ${var.repository}. Assumed by GitHub Actions in ${join(", ", var.environments)}."
  max_session_duration = 3600
  assume_role_policy   = data.aws_iam_policy_document.trust.json
  tags                 = var.tags
}

data "aws_iam_policy_document" "deploy" {
  statement {
    sid       = "PublishToTheSiteBucket"
    actions   = ["s3:ListBucket", "s3:GetObject", "s3:PutObject"]
    resources = [local.bucket_arn, "${local.bucket_arn}/*"]
  }

  # Every distribution in this account: the account exists for this site, and a distribution cannot be
  # named before it is created.
  statement {
    sid       = "InvalidateTheSiteDistribution"
    actions   = ["cloudfront:GetDistribution", "cloudfront:CreateInvalidation", "cloudfront:GetInvalidation"]
    resources = ["arn:${data.aws_partition.current.partition}:cloudfront::${data.aws_caller_identity.current.account_id}:distribution/*"]
  }

  # A list operation has no resource to scope to. The workflow uses it to find the distribution by its
  # origin, so recreating the distribution does not leave it invalidating a stale id.
  statement {
    sid       = "FindTheSiteDistribution"
    actions   = ["cloudfront:ListDistributions"]
    resources = ["*"]
  }
}

resource "aws_iam_role_policy" "deploy" {
  name   = "publish-the-site"
  role   = aws_iam_role.deploy.id
  policy = data.aws_iam_policy_document.deploy.json
}
