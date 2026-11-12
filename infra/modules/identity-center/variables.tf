variable "accounts" {
  description = "The accounts access is granted in: the name `access` uses, to the account's 12-digit id."
  type        = map(string)

  validation {
    condition     = alltrue([for id in values(var.accounts) : can(regex("^[0-9]{12}$", id))])
    error_message = "Each account must be a 12-digit id."
  }
}

variable "permission_sets" {
  description = "The permission sets, by name. The name is part of the group names, so renaming a permission set replaces its groups."
  type = map(object({
    description         = string
    session_duration    = optional(string, "PT4H")
    managed_policy_arns = list(string)
  }))
}

variable "access" {
  description = "Where each permission set is granted: account name to permission set names. Every pair is a group named `<account id>-<permission set>`, assigned that permission set in that account."
  type        = map(set(string))

  validation {
    condition     = alltrue([for account in keys(var.access) : contains(keys(var.accounts), account)])
    error_message = "access names an account that is not in accounts."
  }

  validation {
    condition     = alltrue(flatten([for names in values(var.access) : [for name in names : contains(keys(var.permission_sets), name)]]))
    error_message = "access names a permission set that is not in permission_sets."
  }
}

variable "memberships" {
  description = "The members of the groups, by group name: Identity Center user names. The users themselves are created in the console or by an identity provider, and their names stay out of this repository, which is public."
  type        = map(set(string))
  default     = {}

  validation {
    condition = alltrue([
      for group in keys(var.memberships) :
      contains(flatten([for account, names in var.access : [for name in names : "${lookup(var.accounts, account, "")}-${name}"]]), group)
    ])
    error_message = "memberships names a group that access does not define. Groups are named <account id>-<permission set>."
  }
}
