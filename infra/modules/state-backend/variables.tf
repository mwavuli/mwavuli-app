variable "bucket_name" {
  type        = string
  description = "The state bucket, in the default provider's region: <org>-tfstate-<account-alias>-<region>."
}

variable "replica_bucket_name" {
  type        = string
  description = "The replica bucket, in the aws.replica provider's region: <org>-tfstate-<account-alias>-<region>."
}

variable "noncurrent_version_days" {
  type        = number
  default     = 365
  description = "How long a replaced version of a state file is kept. The versions are the way back from a bad apply."

  validation {
    condition     = var.noncurrent_version_days >= 30
    error_message = "Keep replaced state versions for at least 30 days."
  }
}

variable "tags" {
  type        = map(string)
  default     = {}
  description = "Resource tags."
}
