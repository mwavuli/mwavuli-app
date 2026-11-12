# Checks how a zone and its records are built, against a mocked provider, so it runs without AWS credentials:
#
#   tofu test        (from infra/modules/dns-zone)
#
# Every run is a plan. The zone is protected from destroy, which the clean-up after an apply would trip over,
# and everything asserted here is known at plan time.

mock_provider "aws" {}

variables {
  zone_name = "example.com"

  records = {
    redirect = { name = "@", type = "A", values = ["192.0.2.10"] }
    www      = { name = "www", type = "CNAME", values = ["parking.example.net."] }
    mail     = { name = "@", type = "MX", ttl = 300, values = ["1 mx1.mail.example.net.", "5 mx2.mail.example.net."] }
    text     = { name = "@", type = "TXT", values = ["verification=abc123", "v=spf1 include:spf.mail.example.net -all"] }
    dkim     = { name = "sel1._domainkey", type = "TXT", values = [format("v=DKIM1; k=rsa; p=%s", join("", [for i in range(400) : "A"]))] }
  }
}

run "a_name_is_relative_to_the_zone_and_the_apex_is_the_zone" {
  command = plan

  assert {
    condition     = aws_route53_zone.this.name == "example.com"
    error_message = "The zone must be the domain given."
  }

  assert {
    condition = (
      aws_route53_record.this["redirect"].name == "example.com"
      && aws_route53_record.this["mail"].name == "example.com"
      && aws_route53_record.this["www"].name == "www.example.com"
      && aws_route53_record.this["dkim"].name == "sel1._domainkey.example.com"
    )
    error_message = "A record's name must be its relative name under the zone, and @ must be the apex itself."
  }

  assert {
    condition     = alltrue([for key, record in aws_route53_record.this : record.zone_id == aws_route53_zone.this.zone_id])
    error_message = "Every record must be in the zone."
  }
}

run "the_ttl_is_half_an_hour_unless_one_is_given" {
  command = plan

  assert {
    condition = (
      aws_route53_record.this["mail"].ttl == 300
      && aws_route53_record.this["redirect"].ttl == 1800
      && aws_route53_record.this["www"].ttl == 1800
    )
    error_message = "A record keeps the TTL it is given, and 1800 seconds when it is given none."
  }
}

run "a_txt_value_is_plain_text_and_a_long_one_is_cut_into_255_character_strings" {
  command = plan

  assert {
    condition = aws_route53_record.this["text"].records == toset([
      "verification=abc123",
      "v=spf1 include:spf.mail.example.net -all",
    ])
    error_message = "A short TXT value must reach the provider as it is: the provider adds the quotation marks, and a second pair makes Route 53 refuse the record."
  }

  assert {
    condition = (
      length(aws_route53_record.this["dkim"].records) == 1
      && length(split("\"\"", one(aws_route53_record.this["dkim"].records))) == 2
      && alltrue([for part in split("\"\"", one(aws_route53_record.this["dkim"].records)) : length(part) <= 255])
    )
    error_message = "A long TXT value must be cut into strings of at most 255 characters, joined by two quotes, which is how the provider takes them."
  }

  assert {
    condition     = join("", split("\"\"", one(aws_route53_record.this["dkim"].records))) == var.records["dkim"].values[0]
    error_message = "The cut strings must join back into exactly the value given, or a DKIM key stops verifying."
  }
}

run "other_record_types_are_given_as_they_are" {
  command = plan

  assert {
    condition = (
      aws_route53_record.this["mail"].records == toset(["1 mx1.mail.example.net.", "5 mx2.mail.example.net."])
      && aws_route53_record.this["redirect"].records == toset(["192.0.2.10"])
      && aws_route53_record.this["www"].records == toset(["parking.example.net."])
    )
    error_message = "MX, A and CNAME values must pass through untouched: a quote in one would be wrong."
  }
}

run "a_zone_with_no_records_is_the_zone_alone" {
  command = plan

  variables {
    records = {}
  }

  assert {
    condition     = length(aws_route53_record.this) == 0 && aws_route53_zone.this.name == "example.com"
    error_message = "With no records there is only the zone."
  }
}

run "ns_and_soa_records_are_route_53s_own" {
  command = plan

  variables {
    records = { ns = { name = "sub", type = "NS", values = ["ns.example.net."] } }
  }

  expect_failures = [var.records]
}

run "a_cname_cannot_be_at_the_apex" {
  command = plan

  variables {
    records = { apex = { name = "@", type = "CNAME", values = ["target.example.net."] } }
  }

  expect_failures = [var.records]
}

run "a_cname_has_one_value" {
  command = plan

  variables {
    records = { www = { name = "www", type = "CNAME", values = ["a.example.net.", "b.example.net."] } }
  }

  expect_failures = [var.records]
}

run "a_name_with_a_cname_carries_nothing_else" {
  command = plan

  variables {
    records = {
      www  = { name = "www", type = "CNAME", values = ["parking.example.net."] }
      text = { name = "www", type = "TXT", values = ["hello"] }
    }
  }

  expect_failures = [var.records]
}

run "two_records_cannot_share_a_name_and_a_type" {
  command = plan

  variables {
    records = {
      one = { name = "@", type = "A", values = ["192.0.2.1"] }
      two = { name = "@", type = "A", values = ["192.0.2.2"] }
    }
  }

  expect_failures = [var.records]
}

run "a_txt_value_cannot_hold_a_quote_or_a_backslash" {
  command = plan

  variables {
    records = { text = { name = "@", type = "TXT", values = ["say \"hi\""] } }
  }

  expect_failures = [var.records]
}

run "a_record_needs_a_value" {
  command = plan

  variables {
    records = { mail = { name = "@", type = "MX", values = [] } }
  }

  expect_failures = [var.records]
}

run "the_zone_name_is_lowercase_and_has_no_trailing_dot" {
  command = plan

  variables {
    zone_name = "Example.com."
    records   = {}
  }

  expect_failures = [var.zone_name]
}
