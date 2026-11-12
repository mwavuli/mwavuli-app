variable "zone_name" {
  description = "The domain the hosted zone serves, lowercase and without a trailing dot."
  type        = string

  validation {
    condition     = can(regex("^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$", var.zone_name))
    error_message = "zone_name must be a lowercase domain name such as example.com, without a trailing dot."
  }
}

variable "records" {
  description = "The zone's records, each under a key of the caller's choosing. `name` is relative to the zone, and `@` is the zone's apex. A TXT value is plain text, and the module cuts a long one into the 255-character strings Route 53 takes. Route 53 owns the zone's NS and SOA records, so they are not accepted."
  type = map(object({
    name   = string
    type   = string
    ttl    = optional(number, 1800)
    values = list(string)
  }))
  default = {}

  validation {
    condition     = alltrue([for r in values(var.records) : contains(["A", "AAAA", "CAA", "CNAME", "MX", "SRV", "TXT"], r.type)])
    error_message = "A record's type must be A, AAAA, CAA, CNAME, MX, SRV or TXT. Route 53 owns the zone's NS and SOA records."
  }

  validation {
    condition     = alltrue([for r in values(var.records) : length(r.values) > 0])
    error_message = "A record needs at least one value."
  }

  validation {
    condition = alltrue([
      for r in values(var.records) : r.type != "CNAME" || (length(r.values) == 1 && r.name != "@")
    ])
    error_message = "A CNAME has exactly one value and cannot be at the apex."
  }

  validation {
    condition = alltrue([
      for r in values(var.records) : r.type != "TXT" || alltrue([for v in r.values : !can(regex("[\"\\\\]", v))])
    ])
    error_message = "A TXT value cannot contain a double quote or a backslash."
  }

  validation {
    condition     = length(distinct([for r in values(var.records) : "${r.name}/${r.type}"])) == length(var.records)
    error_message = "Two records cannot share a name and a type: give one record several values instead."
  }

  validation {
    condition = alltrue([
      for r in values(var.records) : r.type != "CNAME" || length([for o in values(var.records) : o if o.name == r.name]) == 1
    ])
    error_message = "A name with a CNAME cannot carry any other record."
  }
}

variable "tags" {
  description = "Tags for the hosted zone."
  type        = map(string)
  default     = {}
}
