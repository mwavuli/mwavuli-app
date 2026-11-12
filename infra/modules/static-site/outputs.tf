output "bucket_name" {
  description = "The bucket the deploy publishes dist/ into."
  value       = aws_s3_bucket.site.id
}

output "distribution_id" {
  description = "The distribution to invalidate after a publish."
  value       = aws_cloudfront_distribution.site.id
}

output "distribution_arn" {
  description = "The distribution's ARN, the only principal the bucket admits."
  value       = aws_cloudfront_distribution.site.arn
}

output "distribution_domain_name" {
  description = "The *.cloudfront.net name the site always answers on, and the only one before it has a domain."
  value       = aws_cloudfront_distribution.site.domain_name
}

output "url" {
  description = "Where the site is: its canonical name when it has a domain, its *.cloudfront.net name when it has none."
  value       = "https://${var.domain == null ? aws_cloudfront_distribution.site.domain_name : var.domain.canonical}"
}
