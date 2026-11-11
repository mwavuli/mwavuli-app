output "role_arn" {
  description = "The role the deploy workflow assumes: the AWS_DEPLOY_ROLE_ARN repository variable."
  value       = aws_iam_role.deploy.arn
}

output "role_name" {
  description = "The role's name."
  value       = aws_iam_role.deploy.name
}

output "oidc_provider_arn" {
  description = "GitHub's OIDC provider in this account."
  value       = aws_iam_openid_connect_provider.github.arn
}
