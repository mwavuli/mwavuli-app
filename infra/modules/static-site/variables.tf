variable "name" {
  type        = string
  description = "Prefix for the names of the distribution's own objects: the origin access control and the viewer-request function."
}

variable "bucket_name" {
  type        = string
  description = "The private bucket holding the built site. Global, and it outlives the account, so it carries no account id."
}

variable "price_class" {
  type        = string
  default     = "PriceClass_200"
  description = <<-EOT
    Which edge locations serve the site. PriceClass_200 adds the African edge locations to
    North America and Europe: the audience is in Uganda, and PriceClass_100 would serve Kampala from Europe.
    The saving would be pennies, because the site is a few megabytes of static files.
  EOT

  validation {
    condition     = contains(["PriceClass_100", "PriceClass_200", "PriceClass_All"], var.price_class)
    error_message = "price_class is PriceClass_100, PriceClass_200 or PriceClass_All."
  }
}

variable "domain" {
  type = object({
    zone_id   = string
    canonical = string
    redirects = optional(list(string), [])
  })
  default     = null
  description = <<-EOT
    The domain the site is served on, or null to serve it on its *.cloudfront.net name only, which is how it is
    reviewed before it has one. `zone_id` is the Route 53 hosted zone that holds the names. `canonical` is the name
    the site answers on, and each of `redirects` answers with a permanent redirect to it. The module issues one
    certificate for all of them, validates it in the zone, and points an alias record at the distribution for each.
    The certificate is made in the region the module runs in and CloudFront reads certificates only from us-east-1,
    so the module runs there whenever there is a domain.
  EOT

  validation {
    condition = var.domain == null ? true : alltrue([
      for name in concat([var.domain.canonical], var.domain.redirects) :
      can(regex("^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$", name))
    ])
    error_message = "Every name in domain is a lowercase domain name such as www.example.com, without a trailing dot."
  }

  validation {
    condition     = var.domain == null ? true : !contains(var.domain.redirects, var.domain.canonical)
    error_message = "The canonical name cannot also be one of the names that redirect to it."
  }
}

variable "force_destroy" {
  type        = bool
  default     = false
  description = "Allow destroying the bucket with objects still in it. False: a bucket that empties itself on destroy is a footgun the moment it holds something."
}

variable "tags" {
  type        = map(string)
  default     = {}
  description = "Resource tags."
}
