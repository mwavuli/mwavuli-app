#!/usr/bin/env bash
# Checks every module under infra/modules without AWS credentials: init with no backend (in readonly-lock
# mode, so a provider pin cannot quietly stop applying), fmt, validate, and the tests, which run against
# mocked providers and create nothing, then the tests of any function a module ships (functions/*.test.mjs).
#
#   infra/scripts/test-modules.sh
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

for module in "$root"/modules/*/; do
  echo "::group::infra/modules/$(basename "$module")"
  (
    cd "$module"
    tofu init -backend=false -input=false -lockfile=readonly
    tofu fmt -check -recursive
    tofu validate
    tofu test
    for function_test in functions/*.test.mjs; do
      [ -e "$function_test" ] || continue
      node --test "$function_test"
    done
  )
  echo "::endgroup::"
done
