output "zone_id" {
  description = "The hosted zone's id."
  value       = aws_route53_zone.this.zone_id
}

output "name_servers" {
  description = "The zone's four nameservers: what the registrar is given."
  value       = aws_route53_zone.this.name_servers
}
