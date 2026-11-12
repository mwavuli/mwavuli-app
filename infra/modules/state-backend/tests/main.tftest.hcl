# Checks the backend's invariants against mocked providers, so they run without AWS credentials:
#
#   tofu test        (from infra/modules/state-backend)
#
# A mock apply invents ids, and the AWS provider's own data sources (the IAM policy documents) are
# mocked too, so those are checked through the statements they are configured with.

mock_provider "aws" {
  mock_data "aws_region" {
    defaults = { region = "us-east-1" }
  }

  # The role and its policy refuse a document that is not JSON.
  mock_data "aws_iam_policy_document" {
    defaults = { json = "{\"Version\":\"2012-10-17\",\"Statement\":[]}" }
  }
}

mock_provider "aws" {
  alias = "replica"

  mock_data "aws_region" {
    defaults = { region = "us-west-2" }
  }
}

# The provider rejects an invented value that is not shaped like an ARN, and the two buckets and keys
# must be told apart, so each gets its own.
override_resource {
  target = aws_s3_bucket.state
  values = { arn = "arn:aws:s3:::example-tfstate-prod-us-east-1" }
}

override_resource {
  target = aws_s3_bucket.replica
  values = { arn = "arn:aws:s3:::example-tfstate-prod-us-west-2" }
}

override_resource {
  target = aws_kms_key.state
  values = { arn = "arn:aws:kms:us-east-1:111111111111:key/11111111-1111-1111-1111-111111111111" }
}

override_resource {
  target = aws_kms_key.replica
  values = { arn = "arn:aws:kms:us-west-2:111111111111:key/22222222-2222-2222-2222-222222222222" }
}

override_resource {
  target = aws_iam_role.replication
  values = { arn = "arn:aws:iam::111111111111:role/example-tfstate-prod-us-east-1-replication" }
}

variables {
  bucket_name         = "example-tfstate-prod-us-east-1"
  replica_bucket_name = "example-tfstate-prod-us-west-2"
}

run "both_buckets_are_versioned_private_and_encrypted_with_their_own_key" {
  command = apply

  assert {
    condition = alltrue([
      aws_s3_bucket_versioning.state.versioning_configuration[0].status == "Enabled",
      aws_s3_bucket_versioning.replica.versioning_configuration[0].status == "Enabled",
    ])
    error_message = "Both buckets must be versioned: it is the way back from a bad apply, and replication needs it."
  }

  assert {
    condition = alltrue(flatten([
      for b in [aws_s3_bucket_public_access_block.state, aws_s3_bucket_public_access_block.replica] : [
        b.block_public_acls, b.block_public_policy, b.ignore_public_acls, b.restrict_public_buckets,
      ]
    ]))
    error_message = "Both buckets must block every form of public access."
  }

  assert {
    condition = (
      one(aws_s3_bucket_server_side_encryption_configuration.state.rule).apply_server_side_encryption_by_default[0].sse_algorithm == "aws:kms"
      && one(aws_s3_bucket_server_side_encryption_configuration.state.rule).apply_server_side_encryption_by_default[0].kms_master_key_id == aws_kms_key.state.arn
    )
    error_message = "The state bucket must be encrypted with its own KMS key."
  }

  assert {
    condition = (
      one(aws_s3_bucket_server_side_encryption_configuration.replica.rule).apply_server_side_encryption_by_default[0].sse_algorithm == "aws:kms"
      && one(aws_s3_bucket_server_side_encryption_configuration.replica.rule).apply_server_side_encryption_by_default[0].kms_master_key_id == aws_kms_key.replica.arn
    )
    error_message = "The replica must be encrypted with the key in its own region."
  }

  assert {
    condition     = aws_kms_key.state.enable_key_rotation && aws_kms_key.replica.enable_key_rotation
    error_message = "Both keys must rotate."
  }
}

run "state_is_replicated_to_the_second_region" {
  command = apply

  assert {
    condition = (
      aws_s3_bucket_replication_configuration.state.bucket == aws_s3_bucket.state.id
      && one(aws_s3_bucket_replication_configuration.state.rule).status == "Enabled"
      && one(aws_s3_bucket_replication_configuration.state.rule).destination[0].bucket == aws_s3_bucket.replica.arn
      && one(aws_s3_bucket_replication_configuration.state.rule).destination[0].encryption_configuration[0].replica_kms_key_id == aws_kms_key.replica.arn
    )
    error_message = "The state bucket must replicate, encrypted, into the replica bucket."
  }

  assert {
    condition     = one(aws_s3_bucket_replication_configuration.state.rule).source_selection_criteria[0].sse_kms_encrypted_objects[0].status == "Enabled"
    error_message = "The rule must select KMS-encrypted objects, which is every object in this bucket."
  }

  assert {
    condition     = one(aws_s3_bucket_replication_configuration.state.rule).delete_marker_replication[0].status == "Disabled"
    error_message = "A delete in the home region must not delete the replica."
  }
}

run "replication_may_use_each_key_only_through_s3_for_its_own_bucket" {
  command = apply

  assert {
    condition = alltrue([
      for s in data.aws_iam_policy_document.replication.statement :
      contains([for c in s.condition : c.variable], "kms:ViaService") && contains([for c in s.condition : c.variable], "kms:EncryptionContext:aws:s3:arn")
      if length([for a in s.actions : a if startswith(a, "kms:")]) > 0
    ])
    error_message = "Every KMS statement must be limited to S3 and to one bucket's objects."
  }

  assert {
    condition     = length([for s in data.aws_iam_policy_document.replication.statement : s if length([for a in s.actions : a if startswith(a, "kms:")]) > 0]) == 2
    error_message = "The role may decrypt with the source key and encrypt with the replica key, and use no other key."
  }

  assert {
    condition = (
      length(data.aws_iam_policy_document.replication_trust.statement[0].principals) == 1
      && alltrue([
        for p in data.aws_iam_policy_document.replication_trust.statement[0].principals :
        p.type == "Service" && p.identifiers == toset(["s3.amazonaws.com"])
      ])
    )
    error_message = "Only S3 may assume the replication role."
  }
}

# Both buckets use an S3 Bucket Key, and with one KMS sees the bucket's own ARN as the encryption context, not an
# object's. A condition on the objects alone made every replication fail, on the first real apply.
run "the_kms_conditions_admit_the_bucket_key_encryption_context" {
  command = apply

  assert {
    condition = (
      contains(flatten([for s in data.aws_iam_policy_document.replication.statement : [for c in s.condition : tolist(c.values) if c.variable == "kms:EncryptionContext:aws:s3:arn"] if s.sid == "DecryptSource"]), aws_s3_bucket.state.arn)
      && contains(flatten([for s in data.aws_iam_policy_document.replication.statement : [for c in s.condition : tolist(c.values) if c.variable == "kms:EncryptionContext:aws:s3:arn"] if s.sid == "DecryptSource"]), "${aws_s3_bucket.state.arn}/*")
    )
    error_message = "Decrypting at the source must be allowed for the state bucket's own ARN and for its objects."
  }

  assert {
    condition = (
      contains(flatten([for s in data.aws_iam_policy_document.replication.statement : [for c in s.condition : tolist(c.values) if c.variable == "kms:EncryptionContext:aws:s3:arn"] if s.sid == "EncryptReplicas"]), aws_s3_bucket.replica.arn)
      && contains(flatten([for s in data.aws_iam_policy_document.replication.statement : [for c in s.condition : tolist(c.values) if c.variable == "kms:EncryptionContext:aws:s3:arn"] if s.sid == "EncryptReplicas"]), "${aws_s3_bucket.replica.arn}/*")
    )
    error_message = "Encrypting a replica must be allowed for the replica bucket's own ARN and for its objects."
  }

  assert {
    condition     = one(aws_s3_bucket_server_side_encryption_configuration.state.rule).bucket_key_enabled && one(aws_s3_bucket_server_side_encryption_configuration.replica.rule).bucket_key_enabled
    error_message = "This test exists because both buckets use a bucket key. If that changes, so may the condition it guards."
  }
}

run "plain_http_is_denied_on_both_buckets" {
  command = apply

  assert {
    condition = alltrue([
      for p in [aws_s3_bucket_policy.state.policy, aws_s3_bucket_policy.replica.policy] :
      jsondecode(p).Statement[0].Effect == "Deny" && jsondecode(p).Statement[0].Condition.Bool["aws:SecureTransport"] == "false"
    ])
    error_message = "Both bucket policies must deny requests that are not TLS."
  }
}

run "replaced_versions_are_kept_for_at_least_a_month" {
  command = plan

  variables {
    noncurrent_version_days = 7
  }

  expect_failures = [var.noncurrent_version_days]
}
