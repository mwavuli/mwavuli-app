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
  description = "The *.cloudfront.net name the site answers on before it has a domain."
  value       = aws_cloudfront_distribution.site.domain_name
}
