# Identity Center access, as groups: a permission set is assigned to a group in an account, never to a
# person, so who may do what is one list and joining or leaving is a change of membership.
#
# Two things happen outside this code. The organization instance is enabled once, in the console (the API
# cannot create one in the management account), and permission sets are enabled on it with one CLI call the
# provider has no resource for (docs/design/aws-organization.md, section 4). Until then creating a
# permission set fails with "Permission Sets are not enabled for this IAM Identity Center instance".

data "aws_ssoadmin_instances" "this" {
  lifecycle {
    postcondition {
      condition     = length(self.arns) == 1
      error_message = "IAM Identity Center is not enabled in this account and region. Enable it in the console first."
    }
  }
}

locals {
  instance_arn      = one(data.aws_ssoadmin_instances.this.arns)
  identity_store_id = one(data.aws_ssoadmin_instances.this.identity_store_ids)

  # One group, and one assignment, for each permission set granted in each account.
  grants = merge([
    for account, names in var.access : {
      for name in names : "${var.accounts[account]}-${name}" => {
        account        = account
        permission_set = name
      }
    }
  ]...)

  member_pairs = {
    for pair in flatten([
      for group, users in var.memberships : [for user in users : { group = group, user = user }]
    ]) : "${pair.group}/${pair.user}" => pair
  }
}

resource "aws_ssoadmin_permission_set" "this" {
  for_each = var.permission_sets

  name             = each.key
  description      = each.value.description
  instance_arn     = local.instance_arn
  session_duration = each.value.session_duration
}

resource "aws_ssoadmin_managed_policy_attachment" "this" {
  for_each = {
    for pair in flatten([
      for name, permission_set in var.permission_sets : [
        for arn in permission_set.managed_policy_arns : { permission_set = name, arn = arn }
      ]
    ]) : "${pair.permission_set}/${pair.arn}" => pair
  }

  instance_arn       = local.instance_arn
  managed_policy_arn = each.value.arn
  permission_set_arn = aws_ssoadmin_permission_set.this[each.value.permission_set].arn

  # Removing an attachment re-provisions its permission set in every account it is assigned to, so it
  # goes before the assignments do.
  depends_on = [aws_ssoadmin_account_assignment.this]
}

resource "aws_identitystore_group" "this" {
  for_each = local.grants

  identity_store_id = local.identity_store_id
  display_name      = each.key
  description       = "${each.value.permission_set} in ${each.value.account} (${var.accounts[each.value.account]})"
}

resource "aws_ssoadmin_account_assignment" "this" {
  for_each = local.grants

  instance_arn       = local.instance_arn
  permission_set_arn = aws_ssoadmin_permission_set.this[each.value.permission_set].arn

  principal_id   = aws_identitystore_group.this[each.key].group_id
  principal_type = "GROUP"

  target_id   = var.accounts[each.value.account]
  target_type = "AWS_ACCOUNT"
}

# The users exist already, made in the console or by an identity provider: they are looked up by name.
data "aws_identitystore_user" "member" {
  for_each = toset([for pair in local.member_pairs : pair.user])

  identity_store_id = local.identity_store_id

  alternate_identifier {
    unique_attribute {
      attribute_path  = "UserName"
      attribute_value = each.key
    }
  }
}

resource "aws_identitystore_group_membership" "this" {
  for_each = local.member_pairs

  identity_store_id = local.identity_store_id
  group_id          = aws_identitystore_group.this[each.value.group].group_id
  member_id         = data.aws_identitystore_user.member[each.value.user].user_id
}
