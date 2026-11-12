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

variable "aliases" {
  type        = list(string)
  default     = []
  description = "Domain names the distribution answers to. Empty serves the site on its *.cloudfront.net name only, which is how it is reviewed before the domain exists (brand D4)."
}

variable "certificate_arn" {
  type        = string
  default     = null
  description = "ACM certificate covering `aliases`. It must be in us-east-1, whatever region this module runs in. Null uses the default CloudFront certificate."
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
