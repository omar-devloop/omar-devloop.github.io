#!/usr/bin/env bash
set -euo pipefail

OWNER="omar-devloop"
REPO="portfolio"

cred=$(printf 'protocol=https\nhost=github.com\n\n' | git credential fill)
token=$(printf '%s\n' "$cred" | sed -n 's/^password=//p')

api() {
  local method="$1" path="$2" data="${3:-}"
  if [ -n "$data" ]; then
    curl -s -o /tmp/gh-response.json -w '%{http_code}' -X "$method" \
      -H "Authorization: Bearer $token" \
      -H "Accept: application/vnd.github+json" \
      -H "X-GitHub-Api-Version: 2022-11-28" \
      https://api.github.com"$path" -d "$data"
  else
    curl -s -o /tmp/gh-response.json -w '%{http_code}' -X "$method" \
      -H "Authorization: Bearer $token" \
      -H "Accept: application/vnd.github+json" \
      -H "X-GitHub-Api-Version: 2022-11-28" \
      https://api.github.com"$path"
  fi
}

echo "existing repo check: $(api GET "/repos/$OWNER/$REPO")"

status=$(api POST /user/repos "{
  \"name\": \"$REPO\",
  \"description\": \"Personal portfolio: projects and notes from a Flutter developer.\",
  \"homepage\": \"https://$OWNER.github.io/$REPO/\",
  \"private\": false,
  \"has_issues\": true,
  \"has_projects\": false,
  \"has_wiki\": false,
  \"auto_init\": false
}")
echo "create repo: $status"
node -e 'const j=require("/tmp/gh-response.json");console.log(j.html_url ? "created: "+j.html_url : "error: "+(j.message||JSON.stringify(j)))'
