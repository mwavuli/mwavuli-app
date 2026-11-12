# The AWS organization: its feature set, the services it trusts, the policy types enabled at its root,
# who administers which service for it, and centralized root access.
#
# The organization already exists, so the unit imports it on the first plan. Nothing here creates an
# account, an OU or a policy: the accounts and the service control policies the organization already has
# are not this code's, and stay as they are.

resource "aws_organizations_organization" "this" {
  # What Identity Center, service control policies and centralized root access all need.
  feature_set                   = "ALL"
  aws_service_access_principals = var.service_access_principals
  enabled_policy_types          = var.enabled_policy_types

  # Deleting an organization means removing every member account first. A plan that wants to is a mistake.
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_organizations_delegated_administrator" "this" {
  for_each = var.delegated_administrators

  account_id        = each.value
  service_principal = each.key

  depends_on = [aws_organizations_organization.this]
}

# Centralized root access: the management account can remove a member account's root credentials and take
# a short root session for the rare task that needs one, so no member account has to keep a root password.
resource "aws_iam_organizations_features" "this" {
  enabled_features = ["RootCredentialsManagement", "RootSessions"]

  depends_on = [aws_organizations_organization.this]
}
