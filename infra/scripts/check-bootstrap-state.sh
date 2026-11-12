#!/usr/bin/env bash
# Fails if the state committed to git is anything but the bootstrap units' own, or if one of those
# holds a resource that carries a secret.
#
# The bootstrap units keep their state in git (infra/live/_bootstrap/*/tfstate/terraform.tfstate),
# because a backend cannot hold the state of the thing that creates it. Everyone with the repository can
# read it, so it may hold no IAM user, access key, password, secret value or private key. A backend
# needs none of them, and this is what keeps one from arriving.
#
#   infra/scripts/check-bootstrap-state.sh
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

secret_types='aws_iam_user|aws_iam_access_key|aws_iam_user_login_profile|aws_secretsmanager_secret_version|aws_ssm_parameter|random_password|tls_private_key'
failures=0

# The only state files allowed in version control are the bootstrap units' own.
while IFS= read -r file; do
  case "$file" in
    infra/live/_bootstrap/*/tfstate/terraform.tfstate) ;;
    *)
      echo "::error::$file is state, and only the bootstrap units' own state may be committed"
      failures=$((failures + 1))
      ;;
  esac
done < <(git ls-files '*.tfstate' '*.tfstate.*')

found=0
while IFS= read -r file; do
  found=$((found + 1))
  if grep -En "\"type\"[[:space:]]*:[[:space:]]*\"($secret_types)\"" "$file"; then
    echo "::error::$file holds a resource with a secret attribute"
    failures=$((failures + 1))
  fi
done < <(git ls-files 'infra/live/_bootstrap/*/tfstate/terraform.tfstate')

if [ "$found" -eq 0 ]; then
  echo "no bootstrap state is committed yet"
fi

if [ "$failures" -gt 0 ]; then
  exit 1
fi
echo "committed state is only the bootstrap units' own, and holds no secret-bearing resource"
