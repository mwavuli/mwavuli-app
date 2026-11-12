# Checks the module's invariants against a mocked provider, so they run without AWS credentials:
#
#   tofu test        (from infra/modules/static-site)
#
# A mock apply invents ids and ARNs, which is enough to check that the pieces are wired to each other.
# The provider rejects an invented value that is not shaped like an ARN, so those are set here.

mock_provider "aws" {
  mock_resource "aws_s3_bucket" {
    defaults = {
      arn                         = "arn:aws:s3:::example-site-prod-us-east-1"
      bucket_regional_domain_name = "example-site-prod-us-east-1.s3.us-east-1.amazonaws.com"
    }
  }

  mock_resource "aws_cloudfront_function" {
    defaults = {
      arn = "arn:aws:cloudfront::111111111111:function/example-site-viewer-request"
    }
  }

  mock_resource "aws_cloudfront_distribution" {
    defaults = {
      arn = "arn:aws:cloudfront::111111111111:distribution/E1EXAMPLE"
    }
  }
}

variables {
  name        = "example-site"
  bucket_name = "example-site-prod-us-east-1"
}

run "private_bucket_served_through_cloudfront" {
  command = apply

  assert {
    condition = alltrue([
      aws_s3_bucket_public_access_block.site.block_public_acls,
      aws_s3_bucket_public_access_block.site.block_public_policy,
      aws_s3_bucket_public_access_block.site.ignore_public_acls,
      aws_s3_bucket_public_access_block.site.restrict_public_buckets,
    ])
    error_message = "The bucket must block every form of public access."
  }

  assert {
    condition     = aws_cloudfront_distribution.site.viewer_certificate[0].cloudfront_default_certificate
    error_message = "Without aliases the site is served on the default CloudFront certificate."
  }

  assert {
    condition     = aws_cloudfront_distribution.site.default_cache_behavior[0].viewer_protocol_policy == "redirect-to-https"
    error_message = "Plain HTTP must redirect to HTTPS."
  }

  assert {
    condition     = aws_cloudfront_distribution.site.price_class == "PriceClass_200"
    error_message = "The default price class includes the African edge locations."
  }
}

run "bucket_admits_only_this_distribution" {
  command = apply

  assert {
    condition = alltrue([
      for s in jsondecode(aws_s3_bucket_policy.site.policy).Statement :
      s.Condition.StringEquals["AWS:SourceArn"] == aws_cloudfront_distribution.site.arn
      if s.Effect == "Allow"
    ])
    error_message = "Every Allow statement must be conditioned on this distribution's ARN."
  }

  assert {
    condition     = length([for s in jsondecode(aws_s3_bucket_policy.site.policy).Statement : s if s.Effect == "Allow"]) == 2
    error_message = "The bucket allows reading objects and listing, and nothing else."
  }

  assert {
    condition     = length([for s in jsondecode(aws_s3_bucket_policy.site.policy).Statement : s if s.Sid == "DenyInsecureTransport"]) == 1
    error_message = "The bucket policy must deny plain-HTTP requests."
  }
}

run "aliases_need_a_certificate" {
  command = plan

  variables {
    aliases = ["example.test"]
  }

  expect_failures = [aws_cloudfront_distribution.site]
}

run "aliases_with_a_certificate" {
  command = plan

  variables {
    aliases         = ["example.test"]
    certificate_arn = "arn:aws:acm:us-east-1:111111111111:certificate/00000000-0000-0000-0000-000000000000"
  }

  assert {
    condition     = aws_cloudfront_distribution.site.viewer_certificate[0].ssl_support_method == "sni-only"
    error_message = "A custom certificate is served with SNI, which costs nothing."
  }

  assert {
    condition     = aws_cloudfront_distribution.site.viewer_certificate[0].minimum_protocol_version == "TLSv1.2_2021"
    error_message = "A custom certificate must refuse anything older than TLS 1.2."
  }
}
