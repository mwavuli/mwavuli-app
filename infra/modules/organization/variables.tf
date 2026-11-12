variable "service_access_principals" {
  description = "The AWS services trusted by the organization. The set is authoritative: a service left out loses its access, so list every service that is on. Identity Center (sso.amazonaws.com) and IAM (iam.amazonaws.com, for centralized root access) are required."
  type        = set(string)

  validation {
    condition     = contains(var.service_access_principals, "sso.amazonaws.com") && contains(var.service_access_principals, "iam.amazonaws.com")
    error_message = "sso.amazonaws.com (Identity Center) and iam.amazonaws.com (centralized root access) must be trusted services."
  }
}

variable "enabled_policy_types" {
  description = "The policy types enabled at the organization root. Authoritative, like the services: a type left out is disabled."
  type        = set(string)
}

variable "delegated_administrators" {
  description = "The account each service's administration is delegated to, by service principal. Each service must also be in service_access_principals."
  type        = map(string)
  default     = {}

  validation {
    condition     = alltrue([for account_id in values(var.delegated_administrators) : can(regex("^[0-9]{12}$", account_id))])
    error_message = "Each delegated administrator must be a 12-digit account id."
  }

  validation {
    condition     = alltrue([for service in keys(var.delegated_administrators) : contains(var.service_access_principals, service)])
    error_message = "A service must be trusted by the organization (service_access_principals) before its administration can be delegated."
  }
}
