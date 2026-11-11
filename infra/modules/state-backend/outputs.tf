output "bucket_name" {
  description = "The state bucket every other unit's backend points at."
  value       = aws_s3_bucket.state.id
}

output "bucket_arn" {
  description = "The state bucket's ARN."
  value       = aws_s3_bucket.state.arn
}

output "replica_bucket_name" {
  description = "The replica bucket in the second region."
  value       = aws_s3_bucket.replica.id
}

output "kms_key_arn" {
  description = "The key state is encrypted with."
  value       = aws_kms_key.state.arn
}

output "kms_alias_arn" {
  description = "The alias the backend configuration names, so a rotated key needs no change there."
  value       = aws_kms_alias.state.arn
}

output "replica_kms_key_arn" {
  description = "The key replicas are encrypted with."
  value       = aws_kms_key.replica.arn
}
