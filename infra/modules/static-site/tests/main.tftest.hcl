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
      arn            = "arn:aws:cloudfront::111111111111:distribution/E1EXAMPLE"
      domain_name    = "d111111abcdef8.cloudfront.net"
      hosted_zone_id = "Z2FDTNDATAQYW2"
    }
  }

  mock_resource "aws_acm_certificate" {
    defaults = {
      arn = "arn:aws:acm:us-east-1:111111111111:certificate/00000000-0000-0000-0000-000000000000"
      domain_validation_options = [
        {
          domain_name           = "www.example.test"
          resource_record_name  = "_aaa.www.example.test."
          resource_record_type  = "CNAME"
          resource_record_value = "_bbb.acm-validations.aws."
        },
        {
          domain_name           = "example.test"
          resource_record_name  = "_ccc.example.test."
          resource_record_type  = "CNAME"
          resource_record_value = "_ddd.acm-validations.aws."
        },
      ]
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

run "without_a_domain_there_is_no_certificate_and_no_record" {
  command = apply

  assert {
    condition     = length(aws_acm_certificate.site) == 0 && length(aws_route53_record.alias) == 0 && length(aws_route53_record.validation) == 0
    error_message = "A site with no domain has no certificate and no DNS records."
  }

  assert {
    condition     = length(aws_cloudfront_distribution.site.aliases) == 0
    error_message = "A site with no domain answers on its *.cloudfront.net name only."
  }

  assert {
    condition     = startswith(aws_cloudfront_function.viewer_request.code, "var SITE = {\"canonical\":\"\",\"redirects\":[]};")
    error_message = "With no domain the function is told there is nothing to redirect."
  }

  assert {
    condition     = output.url == "https://d111111abcdef8.cloudfront.net"
    error_message = "With no domain the site is at its distribution name."
  }
}

run "a_domain_gets_a_certificate_aliases_and_records" {
  command = apply

  variables {
    domain = {
      zone_id   = "Z00000000000000000000"
      canonical = "www.example.test"
      redirects = ["example.test"]
    }
  }

  assert {
    condition = (
      aws_acm_certificate.site[0].domain_name == "www.example.test"
      && aws_acm_certificate.site[0].subject_alternative_names == toset(["example.test"])
      && aws_acm_certificate.site[0].validation_method == "DNS"
    )
    error_message = "One certificate covers the canonical name and the names that redirect to it, validated through DNS."
  }

  assert {
    condition = (
      toset(keys(aws_route53_record.validation)) == toset(["www.example.test", "example.test"])
      && alltrue([for record in aws_route53_record.validation : record.zone_id == "Z00000000000000000000" && record.type == "CNAME"])
      && aws_route53_record.validation["www.example.test"].name == "_aaa.www.example.test."
      && aws_route53_record.validation["example.test"].name == "_ccc.example.test."
    )
    error_message = "Each name's validation record is made in the zone, with the name and value ACM asked for that name."
  }

  assert {
    condition     = aws_cloudfront_distribution.site.aliases == toset(["www.example.test", "example.test"])
    error_message = "The distribution answers to every name."
  }

  assert {
    condition = (
      aws_cloudfront_distribution.site.viewer_certificate[0].acm_certificate_arn == aws_acm_certificate_validation.site[0].certificate_arn
      && !aws_cloudfront_distribution.site.viewer_certificate[0].cloudfront_default_certificate
      && aws_cloudfront_distribution.site.viewer_certificate[0].ssl_support_method == "sni-only"
      && aws_cloudfront_distribution.site.viewer_certificate[0].minimum_protocol_version == "TLSv1.2_2021"
    )
    error_message = "The distribution serves the validated certificate with SNI, and refuses anything older than TLS 1.2."
  }

  assert {
    condition = (
      toset(keys(aws_route53_record.alias)) == toset(["www.example.test/A", "www.example.test/AAAA", "example.test/A", "example.test/AAAA"])
      && alltrue([
        for record in aws_route53_record.alias :
        record.zone_id == "Z00000000000000000000"
        && record.alias[0].name == "d111111abcdef8.cloudfront.net"
        && record.alias[0].zone_id == "Z2FDTNDATAQYW2"
      ])
    )
    error_message = "Every name has an A and an AAAA alias record in the zone, pointing at the distribution."
  }

  assert {
    condition     = startswith(aws_cloudfront_function.viewer_request.code, "var SITE = {\"canonical\":\"www.example.test\",\"redirects\":[\"example.test\"]};")
    error_message = "The function is told which host is canonical and which redirect to it."
  }

  assert {
    condition     = output.url == "https://www.example.test"
    error_message = "With a domain the site is at its canonical name."
  }
}

run "a_domain_with_no_redirects_is_one_name" {
  command = apply

  variables {
    domain = {
      zone_id   = "Z00000000000000000000"
      canonical = "example.test"
    }
  }

  assert {
    condition     = aws_cloudfront_distribution.site.aliases == toset(["example.test"]) && length(aws_route53_record.alias) == 2
    error_message = "A canonical name alone is one alias, with an A and an AAAA record."
  }
}

run "the_canonical_name_cannot_redirect_to_itself" {
  command = plan

  variables {
    domain = {
      zone_id   = "Z00000000000000000000"
      canonical = "www.example.test"
      redirects = ["www.example.test"]
    }
  }

  expect_failures = [var.domain]
}

run "names_are_lowercase_without_a_trailing_dot" {
  command = plan

  variables {
    domain = {
      zone_id   = "Z00000000000000000000"
      canonical = "WWW.example.test."
    }
  }

  expect_failures = [var.domain]
}
