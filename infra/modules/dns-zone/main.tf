# The public DNS of a domain: a Route 53 hosted zone and its records. The zone answers for the domain once the
# registrar's nameservers are the zone's own, and until then it answers nothing the world asks.

locals {
  fqdn = {
    for key, record in var.records : key => record.name == "@" ? var.zone_name : "${record.name}.${var.zone_name}"
  }

  # Route 53 takes a TXT value as strings of at most 255 characters, which a reader joins back into one. The
  # provider wraps a value in quotation marks itself and takes two quotes between strings (its documented way to
  # write a long value such as a DKIM key), so a long value is cut here and the caller gives it whole.
  values = {
    for key, record in var.records : key => record.type == "TXT" ? [
      for value in record.values : join("\"\"", regexall(".{1,255}", value))
    ] : record.values
  }
}

resource "aws_route53_zone" "this" {
  name    = var.zone_name
  comment = "Public DNS for ${var.zone_name}"
  tags    = var.tags

  # A deleted zone's replacement gets other nameservers, and the domain's DNS, email included, is down until the
  # registrar is told. A plan that wants to is a mistake.
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_route53_record" "this" {
  for_each = var.records

  zone_id = aws_route53_zone.this.zone_id
  name    = local.fqdn[each.key]
  type    = each.value.type
  ttl     = each.value.ttl
  records = local.values[each.key]
}
