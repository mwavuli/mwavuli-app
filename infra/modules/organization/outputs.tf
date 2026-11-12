output "organization_id" {
  description = "The organization's id (o-...)."
  value       = aws_organizations_organization.this.id
}

output "management_account_id" {
  description = "The 12-digit id of the management account."
  value       = aws_organizations_organization.this.master_account_id
}
