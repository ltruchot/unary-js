#!/usr/bin/env bash
# A version written twice must be the same twice: the pnpm of mise.toml (this
# machine) and the pnpm of devEngines in package.json (CI). A mismatch means a
# lockfile that one of the two cannot read.
set -euo pipefail
cd "$(dirname "$0")/.."

mise=$(sed -nE 's|^pnpm = "([0-9][0-9.]*)"|\1|p' mise.toml)
engines=$(sed -nE '/"packageManager": \{/,/\}/ s|.*"version": "([0-9][0-9.]*)".*|\1|p' package.json)

if [ -z "$mise" ] || [ "$mise" != "$engines" ]; then
  echo "pnpm: '$mise' (mise.toml) != '$engines' (package.json, devEngines.packageManager)" >&2
  exit 1
fi
