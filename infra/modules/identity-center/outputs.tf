output "permission_set_arns" {
  description = "The permission sets' ARNs, by name."
  value       = { for name, permission_set in aws_ssoadmin_permission_set.this : name => permission_set.arn }
}

output "group_ids" {
  description = "The access groups' ids, by group name (<account id>-<permission set>)."
  value       = { for name, group in aws_identitystore_group.this : name => group.group_id }
}
