# Public DNS for the domain, in Route 53: the hosted zone and every record the domain had at Namecheap when its DNS
# moved here. Namecheap's Advanced DNS page was the authoritative list, and each record below is one of its entries.
#
# The zone answers nothing the world asks until the registrar's nameservers are this zone's own (the `name_servers`
# output). Namecheap keeps its own copy of the records, so switching its nameservers back restores the old DNS.
# docs/design/site-infrastructure.md (M13) has the cutover and the rollback.

include "root" { path = find_in_parent_folders("root.hcl") }

locals {
  account = read_terragrunt_config(find_in_parent_folders("account.hcl")).locals
}

terraform {
  source = "${get_repo_root()}/infra/modules/dns-zone"
}

inputs = {
  zone_name = local.account.domain_name
  tags      = local.account.common_tags

  records = {
    # What the site answers with until it is on the domain. Namecheap's "URL Redirect Record" is this A record, served
    # by Namecheap's redirect servers (the apex to http://www.mwavuli.co/), and the www CNAME is its parking page.
    apex-redirect = { name = "@", type = "A", values = ["162.255.119.218"] }
    www-parking   = { name = "www", type = "CNAME", values = ["parkingpage.namecheap.com."] }

    # Email is Lark's. The MX priorities are Lark's (lowest is tried first), the first TXT value proves the domain to
    # Lark, the second is the SPF policy, and the DKIM key signs outgoing mail under Lark's selector.
    mail = {
      name   = "@"
      type   = "MX"
      values = ["1 mx1.larksuite.com.", "5 mx2.larksuite.com.", "10 mx3.larksuite.com."]
    }
    apex-text = {
      name   = "@"
      type   = "TXT"
      values = ["verification-code-site-App_lark=RU8jZprUVliObCmbfhup", "v=spf1 +include:spf.onlarksuite.com -all"]
    }
    lark-dkim = {
      name   = "lark2611112352._domainkey"
      type   = "TXT"
      values = ["v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo/pTZ2HpdUXCora+ygeOF4kt3hkNUl8js5i3LNvouONE8Rq0FCVwCYgfOMoV9o6ImY/IS53Km5Ug1jX5QYFxp5dAzLmuEOgXpC+jgO/cz3NP9GlSOV08zTJA5LH2T66YVpHw+ZeEBRIHvJb4/4HMpWOLlFXf9sqXOozfrm5zRWWx1HCC6DK5Vo9AbKcsUKO/TpR/YrAgwFkjsBVkopy/gvlUMou4WkLM1iXi8gx8ILeN59Yovr3cT79qrcf+LAmsL+/5drGzwYC/HoB3mcm2KPZn6pNExRSw6UGbEvZPdRcg4Ye0w+UK1wHlS+b6njFf8K1FRFxWU8VI+Z1W3NQfrwIDAQAB"]
    }
  }
}
