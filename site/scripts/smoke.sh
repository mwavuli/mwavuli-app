#!/usr/bin/env bash
# Checks a deployed copy of the site: every page answers, with and without its trailing slash, the
# icons and the social image are served as images, a hashed asset is cached for good, a missing page
# is a 404 carrying the site's own 404 page, and the security headers are on.
#
#   site/scripts/smoke.sh https://d1234abcd.cloudfront.net
#
# Run it from anywhere after `pnpm nx build site`: a hashed asset is picked from site/dist/_astro to
# check its caching. The deploy workflow runs it against the distribution's own *.cloudfront.net
# name, and it works as well against the real domain once there is one.
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
base="${1:?usage: site/scripts/smoke.sh <base-url>}"
base="${base%/}"

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
failures=0

fail() {
  echo "::error::$*"
  failures=$((failures + 1))
}

# fetch <path>: sets $status, leaves the response headers in $tmp/headers and the body in $tmp/body.
fetch() {
  status="$(curl -sS --max-time 20 -o "$tmp/body" -D "$tmp/headers" -w '%{http_code}' "$base$1")"
}

# header <name>: the last value of that response header from the last fetch, lower-cased; empty if absent.
header() {
  { grep -i "^$1:" "$tmp/headers" || true; } | tail -n 1 | cut -d: -f2- | tr -d '\r' | sed 's/^ *//' | tr '[:upper:]' '[:lower:]'
}

# expect <path> <content-type fragment>: a 200 of that type.
expect() {
  fetch "$1"
  if [ "$status" != 200 ]; then
    fail "$1 answered $status, expected 200"
  elif [[ "$(header content-type)" != *"$2"* ]]; then
    fail "$1 is served as '$(header content-type)', expected '$2'"
  else
    echo "ok   $1"
  fi
}

for page in / /owners/ /tenants/ /businesses/ /legal/privacy/ /owners /tenants /businesses; do
  expect "$page" text/html
done

# The headers are set by the distribution, so one page proves them for all.
fetch /
[ -n "$(header strict-transport-security)" ] || fail "/ has no Strict-Transport-Security header"
[[ "$(header cache-control)" == *s-maxage=86400* ]] || fail "/ lost its Cache-Control header: '$(header cache-control)'"

expect /favicon.ico icon
expect /apple-touch-icon.png image/png
expect /social.png image/png
expect /sitemap-index.xml xml

asset="$(cd "$here/../dist" 2>/dev/null && find _astro -type f -name '*.woff2' | head -n 1 || true)"
if [ -n "$asset" ]; then
  expect "/$asset" font/woff2
  [[ "$(header cache-control)" == *immutable* ]] || fail "/$asset is not cached as immutable: '$(header cache-control)'"
else
  echo "skip hashed asset: no site/dist/_astro here"
fi

fetch /a-page-that-does-not-exist
if [ "$status" != 404 ]; then
  fail "a missing page answered $status, expected 404"
elif ! grep -q 'Page not found' "$tmp/body"; then
  fail "a missing page does not carry the site's own 404 page"
else
  echo "ok   a missing page is a 404 with the site's own page"
fi

if [ "$failures" -gt 0 ]; then
  echo "$failures check(s) failed against $base"
  exit 1
fi
echo "all checks passed against $base"
