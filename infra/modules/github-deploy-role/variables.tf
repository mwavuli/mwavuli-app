variable "github_org" {
  type        = string
  description = "The GitHub organization or user that owns the repository."
}

variable "repository" {
  type        = string
  description = "The repository whose deploy workflow may assume the role."
}

variable "github_owner_id" {
  type        = string
  description = "The numeric id of the owner. GitHub puts it in the OIDC subject, and it survives a rename or a transfer."

  validation {
    condition     = can(regex("^[0-9]+$", var.github_owner_id))
    error_message = "github_owner_id is the owner's numeric id."
  }
}

variable "github_repo_id" {
  type        = string
  description = "The repository's numeric id. GitHub puts it in the OIDC subject."

  validation {
    condition     = can(regex("^[0-9]+$", var.github_repo_id))
    error_message = "github_repo_id is the repository's numeric id."
  }
}

variable "environments" {
  type        = list(string)
  default     = ["production"]
  description = "GitHub environments whose jobs may assume the role. An environment can carry an approval gate; a branch cannot."

  validation {
    condition     = length(var.environments) > 0
    error_message = "At least one environment must be allowed, or the role can never be assumed."
  }
}

variable "role_name" {
  type        = string
  default     = null
  description = "The role's name. Defaults to <repository>-deploy."
}

variable "site_bucket_name" {
  type        = string
  description = "The bucket the deploy publishes into. The role can write to this bucket and no other."
}

variable "tags" {
  type        = map(string)
  default     = {}
  description = "Resource tags."
}
