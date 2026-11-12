# The static site: a private bucket and the CloudFront distribution that serves it, in one state.
#
# The bucket is never public: CloudFront reads it through an origin access control, and the origin's
# Cache-Control headers carry the caching strategy (the deploy workflow sets them). Bucket and
# distribution live in one account and one state, so the bucket policy names this distribution's ARN.
#
# Versioning is off on purpose. A build is reproducible from git, so rollback is deploying a previous
# ref rather than restoring an object version, and versions of a whole site written on every deploy
# pile up for a recovery path nobody uses.
#
# With a `domain` the site is also served on it: a certificate for its names, validated in the domain's
# hosted zone, an alias record for each name, and a redirect from every name but the canonical one.

locals {
  origin_id = "site"

  # The names the site answers on, its canonical one first.
  names = var.domain == null ? [] : concat([var.domain.canonical], var.domain.redirects)

  # Which hosts the viewer-request function redirects, and to what: it reads this ahead of its own code, so
  # the hosts live in this module's input alone, and the function stays a file that can be tested as it is.
  site = {
    canonical = var.domain == null ? "" : var.domain.canonical
    redirects = var.domain == null ? [] : var.domain.redirects
  }
}

resource "aws_s3_bucket" "site" {
  bucket        = var.bucket_name
  force_destroy = var.force_destroy
  tags          = var.tags
}

resource "aws_s3_bucket_public_access_block" "site" {
  bucket = aws_s3_bucket.site.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_ownership_controls" "site" {
  bucket = aws_s3_bucket.site.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

# SSE-S3: the content is public the moment it is served, so a KMS key would be a second thing to keep
# readable by CloudFront for no protection gained.
resource "aws_s3_bucket_server_side_encryption_configuration" "site" {
  bucket = aws_s3_bucket.site.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_cloudfront_origin_access_control" "site" {
  name                              = "${var.name}-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_function" "viewer_request" {
  name    = "${var.name}-viewer-request"
  runtime = "cloudfront-js-2.0"
  comment = "Redirects to the canonical host, and maps directory-style URIs onto their index.html object."
  publish = true
  code    = "var SITE = ${jsonencode(local.site)};\n\n${file("${path.module}/functions/viewer-request.js")}"
}

data "aws_cloudfront_cache_policy" "caching_optimized" {
  name = "Managed-CachingOptimized"
}

# HSTS, nosniff, frame-deny and a referrer policy. No Content-Security-Policy yet: the site ships no
# script, and a policy written now would have to be rewritten against whatever analytics adds.
data "aws_cloudfront_response_headers_policy" "security_headers" {
  name = "Managed-SecurityHeadersPolicy"
}

resource "aws_cloudfront_distribution" "site" {
  enabled         = true
  comment         = "${var.name} static site"
  price_class     = var.price_class
  http_version    = "http2and3"
  is_ipv6_enabled = true
  aliases         = local.names

  # The regional endpoint: a new bucket's global endpoint answers with redirects until DNS catches up.
  origin {
    origin_id                = local.origin_id
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
  }

  # CachingOptimized honours the origin's Cache-Control. No origin request policy: forwarding viewer
  # headers to an OAC origin would break the signature.
  default_cache_behavior {
    target_origin_id       = local.origin_id
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true

    cache_policy_id            = data.aws_cloudfront_cache_policy.caching_optimized.id
    response_headers_policy_id = data.aws_cloudfront_response_headers_policy.security_headers.id

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.viewer_request.arn
    }
  }

  # A missing page is a 404 with the site's own 404 page. Only 404, not 403: the bucket policy lets
  # CloudFront list the bucket, so S3 answers a missing key honestly, and a 403 would mean the
  # access control is broken, which should not hide behind a friendly page.
  custom_error_response {
    error_code            = 404
    response_code         = 404
    response_page_path    = "/404.html"
    error_caching_min_ttl = 10
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  # The certificate is the validated one: the distribution is not changed until ACM has issued it.
  viewer_certificate {
    cloudfront_default_certificate = var.domain == null
    acm_certificate_arn            = var.domain == null ? null : aws_acm_certificate_validation.site[0].certificate_arn
    ssl_support_method             = var.domain == null ? null : "sni-only"
    minimum_protocol_version       = var.domain == null ? null : "TLSv1.2_2021"
  }

  tags = var.tags
}

# The certificate for every name the site answers on. A new one is issued before the old one goes, so
# changing the names never leaves the distribution holding a certificate that is being deleted.
resource "aws_acm_certificate" "site" {
  count = var.domain == null ? 0 : 1

  domain_name               = var.domain.canonical
  subject_alternative_names = var.domain.redirects
  validation_method         = "DNS"
  tags                      = var.tags

  lifecycle {
    create_before_destroy = true
  }
}

# ACM asks for one CNAME per name. The records are looked up by name, so which ones there are is known when
# the plan is made, and what they hold when the certificate exists. ACM gives a name the same record on every
# request, so allow_overwrite adopts one an earlier certificate for the name left behind.
resource "aws_route53_record" "validation" {
  for_each = toset(local.names)

  zone_id         = var.domain.zone_id
  name            = one([for option in aws_acm_certificate.site[0].domain_validation_options : option.resource_record_name if option.domain_name == each.key])
  type            = one([for option in aws_acm_certificate.site[0].domain_validation_options : option.resource_record_type if option.domain_name == each.key])
  records         = [one([for option in aws_acm_certificate.site[0].domain_validation_options : option.resource_record_value if option.domain_name == each.key])]
  ttl             = 60
  allow_overwrite = true
}

# Waits until ACM has issued the certificate, which it does once it can read the records above.
resource "aws_acm_certificate_validation" "site" {
  count = var.domain == null ? 0 : 1

  certificate_arn         = aws_acm_certificate.site[0].arn
  validation_record_fqdns = [for record in aws_route53_record.validation : record.fqdn]
}

# Every name answers over IPv4 and IPv6. The records refer to the distribution, so they are made once it
# serves the names: a name that resolved before that would answer with an error.
resource "aws_route53_record" "alias" {
  for_each = { for pair in setproduct(local.names, ["A", "AAAA"]) : "${pair[0]}/${pair[1]}" => { name = pair[0], type = pair[1] } }

  zone_id = var.domain.zone_id
  name    = each.value.name
  type    = each.value.type

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}

# Read access for this distribution, and for nothing else.
#
# s3:ListBucket is granted on purpose: without it S3 answers 403 for a key that does not exist, and
# CloudFront passes the 403 on. With it the answer is an honest 404, which the distribution turns into
# the site's 404 page.
#
# The TLS-only statement is hygiene: CloudFront already speaks TLS to the bucket, so it costs nothing,
# and it closes the door on a plain-HTTP request from anything else that is ever given access.
resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "AllowCloudFrontOACRead"
        Effect    = "Allow"
        Principal = { Service = "cloudfront.amazonaws.com" }
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.site.arn}/*"
        Condition = { StringEquals = { "AWS:SourceArn" = aws_cloudfront_distribution.site.arn } }
      },
      {
        Sid       = "AllowCloudFrontOACList"
        Effect    = "Allow"
        Principal = { Service = "cloudfront.amazonaws.com" }
        Action    = "s3:ListBucket"
        Resource  = aws_s3_bucket.site.arn
        Condition = { StringEquals = { "AWS:SourceArn" = aws_cloudfront_distribution.site.arn } }
      },
      {
        Sid       = "DenyInsecureTransport"
        Effect    = "Deny"
        Principal = "*"
        Action    = "s3:*"
        Resource  = [aws_s3_bucket.site.arn, "${aws_s3_bucket.site.arn}/*"]
        Condition = { Bool = { "aws:SecureTransport" = "false" } }
      },
    ]
  })

  # The public access block must exist first, or PutBucketPolicy can be refused while the block is
  # still being created.
  depends_on = [aws_s3_bucket_public_access_block.site]
}
