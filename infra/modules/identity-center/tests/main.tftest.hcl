# Checks how access is granted against a mocked provider, so it runs without AWS credentials:
#
#   tofu test        (from infra/modules/identity-center)
#
# A mock apply invents ids, and the provider rejects one that is not shaped like an ARN or a UUID, so each
# permission set and group is given its own, to tell them apart.

mock_provider "aws" {
  mock_data "aws_ssoadmin_instances" {
    defaults = {
      arns               = ["arn:aws:sso:::instance/ssoins-1111111111111111"]
      identity_store_ids = ["d-1111111111"]
    }
  }

  mock_data "aws_identitystore_user" {
    defaults = { user_id = "99999999-9999-9999-9999-999999999999" }
  }
}

override_resource {
  target = aws_ssoadmin_permission_set.this["AdministratorAccess"]
  values = { arn = "arn:aws:sso:::permissionSet/ssoins-1111111111111111/ps-1111111111111111" }
}

override_resource {
  target = aws_ssoadmin_permission_set.this["ReadOnlyAccess"]
  values = { arn = "arn:aws:sso:::permissionSet/ssoins-1111111111111111/ps-2222222222222222" }
}

override_resource {
  target = aws_identitystore_group.this["111111111111-AdministratorAccess"]
  values = { group_id = "11111111-1111-1111-1111-111111111111" }
}

override_resource {
  target = aws_identitystore_group.this["222222222222-AdministratorAccess"]
  values = { group_id = "22222222-2222-2222-2222-222222222222" }
}

override_resource {
  target = aws_identitystore_group.this["333333333333-AdministratorAccess"]
  values = { group_id = "33333333-3333-3333-3333-333333333333" }
}

override_resource {
  target = aws_identitystore_group.this["333333333333-ReadOnlyAccess"]
  values = { group_id = "44444444-4444-4444-4444-444444444444" }
}

variables {
  accounts = {
    management = "111111111111"
    identity   = "222222222222"
    prod       = "333333333333"
  }

  permission_sets = {
    AdministratorAccess = {
      description         = "Full access to the account."
      session_duration    = "PT2H"
      managed_policy_arns = ["arn:aws:iam::aws:policy/AdministratorAccess"]
    }
    ReadOnlyAccess = {
      description         = "Read-only access to the account."
      managed_policy_arns = ["arn:aws:iam::aws:policy/ReadOnlyAccess"]
    }
  }

  access = {
    management = ["AdministratorAccess"]
    identity   = ["AdministratorAccess"]
    prod       = ["AdministratorAccess", "ReadOnlyAccess"]
  }

  memberships = {
    "333333333333-AdministratorAccess" = ["owner"]
    "333333333333-ReadOnlyAccess"      = ["owner", "reviewer"]
  }
}

run "each_permission_set_in_each_account_is_one_group_named_by_account_id" {
  command = apply

  assert {
    condition = toset([for group in aws_identitystore_group.this : group.display_name]) == toset([
      "111111111111-AdministratorAccess",
      "222222222222-AdministratorAccess",
      "333333333333-AdministratorAccess",
      "333333333333-ReadOnlyAccess",
    ])
    error_message = "There must be one group per (account, permission set), named <account id>-<permission set>."
  }
}

run "access_is_assigned_to_groups_never_to_people" {
  command = apply

  assert {
    condition = (
      length(aws_ssoadmin_account_assignment.this) == 4
      && alltrue([for assignment in aws_ssoadmin_account_assignment.this : assignment.principal_type == "GROUP" && assignment.target_type == "AWS_ACCOUNT"])
    )
    error_message = "Every assignment must give an account's permission set to a group."
  }

  assert {
    condition = alltrue([
      for name, assignment in aws_ssoadmin_account_assignment.this :
      assignment.principal_id == aws_identitystore_group.this[name].group_id
    ])
    error_message = "Each assignment must go to the group of the same name."
  }

  assert {
    condition = alltrue([
      for name, assignment in aws_ssoadmin_account_assignment.this :
      assignment.target_id == split("-", name)[0]
    ])
    error_message = "Each assignment must be in the account whose id starts its group's name."
  }

  assert {
    condition = alltrue([
      for name, assignment in aws_ssoadmin_account_assignment.this :
      assignment.permission_set_arn == aws_ssoadmin_permission_set.this[split("-", name)[1]].arn
    ])
    error_message = "Each assignment must give the permission set its group's name ends with."
  }
}

run "permission_sets_keep_their_session_length_and_their_managed_policies" {
  command = apply

  assert {
    condition = (
      aws_ssoadmin_permission_set.this["AdministratorAccess"].session_duration == "PT2H"
      && aws_ssoadmin_permission_set.this["ReadOnlyAccess"].session_duration == "PT4H"
    )
    error_message = "A session lasts what the permission set says, and four hours when it says nothing."
  }

  assert {
    condition = (
      length(aws_ssoadmin_managed_policy_attachment.this) == 2
      && aws_ssoadmin_managed_policy_attachment.this["AdministratorAccess/arn:aws:iam::aws:policy/AdministratorAccess"].permission_set_arn == aws_ssoadmin_permission_set.this["AdministratorAccess"].arn
      && aws_ssoadmin_managed_policy_attachment.this["ReadOnlyAccess/arn:aws:iam::aws:policy/ReadOnlyAccess"].permission_set_arn == aws_ssoadmin_permission_set.this["ReadOnlyAccess"].arn
    )
    error_message = "Each managed policy must be attached to the permission set that names it."
  }
}

run "members_are_looked_up_by_user_name_and_joined_to_their_group" {
  command = apply

  assert {
    condition = (
      length(aws_identitystore_group_membership.this) == 3
      && alltrue([for membership in aws_identitystore_group_membership.this : membership.member_id == "99999999-9999-9999-9999-999999999999"])
    )
    error_message = "Each named user must become a member of each group that lists them."
  }

  assert {
    condition = (
      aws_identitystore_group_membership.this["333333333333-ReadOnlyAccess/reviewer"].group_id == aws_identitystore_group.this["333333333333-ReadOnlyAccess"].group_id
      && aws_identitystore_group_membership.this["333333333333-AdministratorAccess/owner"].group_id == aws_identitystore_group.this["333333333333-AdministratorAccess"].group_id
    )
    error_message = "A member must join the group that lists them, and no other."
  }
}

run "memberships_are_optional" {
  command = apply

  variables {
    memberships = {}
  }

  assert {
    condition     = length(aws_identitystore_group_membership.this) == 0 && length(data.aws_identitystore_user.member) == 0
    error_message = "With no memberships, no user is looked up and no membership is managed."
  }
}

run "access_to_an_unknown_account_is_refused" {
  command = plan

  variables {
    access      = { staging = ["AdministratorAccess"] }
    memberships = {}
  }

  expect_failures = [var.access]
}

run "access_with_an_unknown_permission_set_is_refused" {
  command = plan

  variables {
    access      = { prod = ["BillingAccess"] }
    memberships = {}
  }

  expect_failures = [var.access]
}

run "a_membership_in_a_group_nothing_defines_is_refused" {
  command = plan

  variables {
    memberships = { "333333333333-PowerUserAccess" = ["owner"] }
  }

  expect_failures = [var.memberships]
}

run "an_account_is_a_twelve_digit_id" {
  command = plan

  variables {
    accounts    = { management = "1234", identity = "222222222222", prod = "333333333333" }
    memberships = {}
  }

  expect_failures = [var.accounts]
}
