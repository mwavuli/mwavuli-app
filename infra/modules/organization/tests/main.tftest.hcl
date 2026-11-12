# Checks the organization's invariants against a mocked provider, so they run without AWS credentials:
#
#   tofu test        (from infra/modules/organization)
#
# Every run is a plan. The organization is protected from destroy, which the clean-up after an apply would
# trip over, and everything asserted here is known at plan time.

mock_provider "aws" {}

variables {
  service_access_principals = ["account-access.amazonaws.com", "iam.amazonaws.com", "sso.amazonaws.com"]
  enabled_policy_types      = ["RESOURCE_CONTROL_POLICY", "SERVICE_CONTROL_POLICY"]

  delegated_administrators = {
    "account-access.amazonaws.com" = "222222222222"
    "sso.amazonaws.com"            = "222222222222"
  }
}

run "the_organization_has_every_feature_and_trusts_exactly_the_services_given" {
  command = plan

  assert {
    condition     = aws_organizations_organization.this.feature_set == "ALL"
    error_message = "Identity Center, service control policies and centralized root access need all features."
  }

  assert {
    condition     = aws_organizations_organization.this.aws_service_access_principals == toset(var.service_access_principals)
    error_message = "The trusted services are authoritative: exactly the set given, no more and no fewer."
  }

  assert {
    condition     = aws_organizations_organization.this.enabled_policy_types == toset(var.enabled_policy_types)
    error_message = "The policy types are authoritative: exactly the set given, no more and no fewer."
  }
}

run "each_delegation_names_its_service_and_its_account" {
  command = plan

  assert {
    condition = (
      length(aws_organizations_delegated_administrator.this) == 2
      && alltrue([
        for service, delegation in aws_organizations_delegated_administrator.this :
        delegation.service_principal == service && delegation.account_id == var.delegated_administrators[service]
      ])
    )
    error_message = "Each trusted service delegated to an account must be registered with that service and that account."
  }
}

run "no_delegation_is_needed" {
  command = plan

  variables {
    delegated_administrators = {}
  }

  assert {
    condition     = length(aws_organizations_delegated_administrator.this) == 0
    error_message = "An organization with no delegated administrator registers none."
  }
}

run "root_access_is_centralized" {
  command = plan

  assert {
    condition     = aws_iam_organizations_features.this.enabled_features == toset(["RootCredentialsManagement", "RootSessions"])
    error_message = "Member accounts must be able to lose their root credentials and be reached by a root session instead."
  }
}

run "a_delegated_service_must_be_trusted" {
  command = plan

  variables {
    delegated_administrators = { "config.amazonaws.com" = "222222222222" }
  }

  expect_failures = [var.delegated_administrators]
}

run "identity_center_must_be_trusted" {
  command = plan

  variables {
    service_access_principals = ["account-access.amazonaws.com", "iam.amazonaws.com"]
    delegated_administrators  = {}
  }

  expect_failures = [var.service_access_principals]
}

run "iam_must_be_trusted_for_centralized_root_access" {
  command = plan

  variables {
    service_access_principals = ["account-access.amazonaws.com", "sso.amazonaws.com"]
    delegated_administrators  = {}
  }

  expect_failures = [var.service_access_principals]
}

run "a_delegated_administrator_is_a_twelve_digit_account_id" {
  command = plan

  variables {
    delegated_administrators = { "sso.amazonaws.com" = "1234" }
  }

  expect_failures = [var.delegated_administrators]
}
