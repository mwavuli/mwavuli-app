# The remote state backend every other unit stores its state in: a versioned bucket encrypted with its
# own KMS key, replicated to a second region, with public access blocked and plain HTTP denied.
#
# Created, once per account, by the units under infra/live/_bootstrap/, which keep their OWN state in
# git, because a backend cannot hold the state of the thing that creates it. That state file is committed, so nothing
# here may carry a secret: no IAM user, access key, password or secret version, ever.

data "aws_region" "home" {}

data "aws_region" "replica" {
  provider = aws.replica
}

locals {
  home_region    = data.aws_region.home.region
  replica_region = data.aws_region.replica.region
}

# --- Keys ---------------------------------------------------------------------------------------------

# One key per region, because a replica is encrypted with a key in its own region. Rotation is on, and
# the default key policy delegates to IAM, so whoever may use the backend is granted it there. Deleting
# a key waits 30 days, which is the window to notice that state has become unreadable.
resource "aws_kms_key" "state" {
  description             = "Encrypts the infrastructure state in ${var.bucket_name}."
  enable_key_rotation     = true
  deletion_window_in_days = 30
  tags                    = var.tags
}

resource "aws_kms_alias" "state" {
  name          = "alias/${var.bucket_name}"
  target_key_id = aws_kms_key.state.key_id
}

resource "aws_kms_key" "replica" {
  provider = aws.replica

  description             = "Encrypts the replica of the infrastructure state in ${var.replica_bucket_name}."
  enable_key_rotation     = true
  deletion_window_in_days = 30
  tags                    = var.tags
}

resource "aws_kms_alias" "replica" {
  provider = aws.replica

  name          = "alias/${var.replica_bucket_name}"
  target_key_id = aws_kms_key.replica.key_id
}

# --- The state bucket -----------------------------------------------------------------------------------

resource "aws_s3_bucket" "state" {
  bucket = var.bucket_name
  tags   = var.tags
}

# Versioning is the way back from a bad apply, and replication requires it.
resource "aws_s3_bucket_versioning" "state" {
  bucket = aws_s3_bucket.state.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_public_access_block" "state" {
  bucket = aws_s3_bucket.state.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_ownership_controls" "state" {
  bucket = aws_s3_bucket.state.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "state" {
  bucket = aws_s3_bucket.state.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm     = "aws:kms"
      kms_master_key_id = aws_kms_key.state.arn
    }
    bucket_key_enabled = true
  }
}

# Native locking writes and deletes a lock object on every operation, which leaves a delete marker each
# time. The second action is what clears them, and the first expires replaced versions.
resource "aws_s3_bucket_lifecycle_configuration" "state" {
  bucket = aws_s3_bucket.state.id

  rule {
    id     = "expire-replaced-versions"
    status = "Enabled"

    filter {}

    noncurrent_version_expiration {
      noncurrent_days = var.noncurrent_version_days
    }

    expiration {
      expired_object_delete_marker = true
    }

    abort_incomplete_multipart_upload {
      days_after_initiation = 7
    }
  }

  depends_on = [aws_s3_bucket_versioning.state]
}

resource "aws_s3_bucket_policy" "state" {
  bucket = aws_s3_bucket.state.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid       = "DenyInsecureTransport"
      Effect    = "Deny"
      Principal = "*"
      Action    = "s3:*"
      Resource  = [aws_s3_bucket.state.arn, "${aws_s3_bucket.state.arn}/*"]
      Condition = { Bool = { "aws:SecureTransport" = "false" } }
    }]
  })

  depends_on = [aws_s3_bucket_public_access_block.state]
}

# --- The replica ----------------------------------------------------------------------------------------

resource "aws_s3_bucket" "replica" {
  provider = aws.replica

  bucket = var.replica_bucket_name
  tags   = var.tags
}

resource "aws_s3_bucket_versioning" "replica" {
  provider = aws.replica

  bucket = aws_s3_bucket.replica.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_public_access_block" "replica" {
  provider = aws.replica

  bucket = aws_s3_bucket.replica.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_ownership_controls" "replica" {
  provider = aws.replica

  bucket = aws_s3_bucket.replica.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "replica" {
  provider = aws.replica

  bucket = aws_s3_bucket.replica.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm     = "aws:kms"
      kms_master_key_id = aws_kms_key.replica.arn
    }
    bucket_key_enabled = true
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "replica" {
  provider = aws.replica

  bucket = aws_s3_bucket.replica.id

  rule {
    id     = "expire-replaced-versions"
    status = "Enabled"

    filter {}

    noncurrent_version_expiration {
      noncurrent_days = var.noncurrent_version_days
    }

    abort_incomplete_multipart_upload {
      days_after_initiation = 7
    }
  }

  depends_on = [aws_s3_bucket_versioning.replica]
}

resource "aws_s3_bucket_policy" "replica" {
  provider = aws.replica

  bucket = aws_s3_bucket.replica.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid       = "DenyInsecureTransport"
      Effect    = "Deny"
      Principal = "*"
      Action    = "s3:*"
      Resource  = [aws_s3_bucket.replica.arn, "${aws_s3_bucket.replica.arn}/*"]
      Condition = { Bool = { "aws:SecureTransport" = "false" } }
    }]
  })

  depends_on = [aws_s3_bucket_public_access_block.replica]
}

# --- Replication ----------------------------------------------------------------------------------------

data "aws_iam_policy_document" "replication_trust" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["s3.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "replication" {
  name               = "${var.bucket_name}-replication"
  assume_role_policy = data.aws_iam_policy_document.replication_trust.json
  tags               = var.tags
}

data "aws_iam_policy_document" "replication" {
  statement {
    sid       = "ReadTheReplicationConfiguration"
    actions   = ["s3:GetReplicationConfiguration", "s3:ListBucket"]
    resources = [aws_s3_bucket.state.arn]
  }

  statement {
    sid       = "ReadSourceVersions"
    actions   = ["s3:GetObjectVersionForReplication", "s3:GetObjectVersionAcl", "s3:GetObjectVersionTagging"]
    resources = ["${aws_s3_bucket.state.arn}/*"]
  }

  statement {
    sid       = "WriteReplicas"
    actions   = ["s3:ReplicateObject", "s3:ReplicateDelete", "s3:ReplicateTags"]
    resources = ["${aws_s3_bucket.replica.arn}/*"]
  }

  # Each key is usable only through S3 and only for this bucket's objects.
  statement {
    sid       = "DecryptSource"
    actions   = ["kms:Decrypt"]
    resources = [aws_kms_key.state.arn]

    condition {
      test     = "StringLike"
      variable = "kms:ViaService"
      values   = ["s3.${local.home_region}.amazonaws.com"]
    }

    condition {
      test     = "StringLike"
      variable = "kms:EncryptionContext:aws:s3:arn"
      values   = ["${aws_s3_bucket.state.arn}/*"]
    }
  }

  statement {
    sid       = "EncryptReplicas"
    actions   = ["kms:Encrypt", "kms:GenerateDataKey"]
    resources = [aws_kms_key.replica.arn]

    condition {
      test     = "StringLike"
      variable = "kms:ViaService"
      values   = ["s3.${local.replica_region}.amazonaws.com"]
    }

    condition {
      test     = "StringLike"
      variable = "kms:EncryptionContext:aws:s3:arn"
      values   = ["${aws_s3_bucket.replica.arn}/*"]
    }
  }
}

resource "aws_iam_role_policy" "replication" {
  name   = "replicate-state"
  role   = aws_iam_role.replication.id
  policy = data.aws_iam_policy_document.replication.json
}

# Delete markers are not replicated on purpose: the replica is the copy that survives somebody deleting
# state in the home region, and a replicated delete would delete it too.
resource "aws_s3_bucket_replication_configuration" "state" {
  bucket = aws_s3_bucket.state.id
  role   = aws_iam_role.replication.arn

  rule {
    id       = "state-to-replica"
    priority = 0
    status   = "Enabled"

    filter {}

    delete_marker_replication {
      status = "Disabled"
    }

    # Everything in this bucket is encrypted with the key above, and the rule must say so.
    source_selection_criteria {
      sse_kms_encrypted_objects {
        status = "Enabled"
      }
    }

    destination {
      bucket        = aws_s3_bucket.replica.arn
      storage_class = "STANDARD"

      encryption_configuration {
        replica_kms_key_id = aws_kms_key.replica.arn
      }
    }
  }

  depends_on = [
    aws_s3_bucket_versioning.state,
    aws_s3_bucket_versioning.replica,
    aws_iam_role_policy.replication,
  ]
}
