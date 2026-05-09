#!/usr/bin/env bash
# Validate fixtures under versions/**/fixtures/{valid,invalid}/*.json against
# their schema. Convention: a fixture file named <stem>--<descriptor>.json
# validates against <stem>.schema.json. The schema is resolved by searching
# the version's entities/ folder first, then shared/.
#
# Cross-file $refs resolve via -r against every other schema in the version.
# ajv-formats is loaded so format:date-time etc. validate.
set -euo pipefail

shopt -s nullglob

resolve_schema() {
  local version_dir="$1"
  local stem="$2"
  if [[ -f "$version_dir/schemas/entities/$stem.schema.json" ]]; then
    echo "$version_dir/schemas/entities/$stem.schema.json"
    return 0
  fi
  if [[ -f "$version_dir/schemas/shared/$stem.schema.json" ]]; then
    echo "$version_dir/schemas/shared/$stem.schema.json"
    return 0
  fi
  return 1
}

build_refs() {
  local version_dir="$1"
  local target="$2"
  local refs=()
  while IFS= read -r r; do
    if [[ "$r" != "$target" ]]; then
      refs+=("-r" "$r")
    fi
  done < <(find "$version_dir/schemas" -name '*.schema.json' -type f | sort)
  printf '%s\n' "${refs[@]}"
}

run_one() {
  local fx="$1"
  local must_pass="$2" # "yes" or "no"

  # version_dir = versions/<version>
  local version_dir
  version_dir="${fx%/fixtures/*}"

  local base
  base="$(basename "$fx" .json)"
  local stem="${base%%--*}"

  local schema
  if ! schema="$(resolve_schema "$version_dir" "$stem")"; then
    echo "::error::No schema found for fixture $fx (looked for $stem.schema.json under entities/ and shared/)"
    return 1
  fi

  local refs=()
  while IFS= read -r line; do
    [[ -n "$line" ]] && refs+=("$line")
  done < <(build_refs "$version_dir" "$schema")

  if [[ "$must_pass" == "yes" ]]; then
    echo "Validating $fx against $schema (must pass)"
    npx --no-install ajv validate --spec=draft2020 -s "$schema" -d "$fx" "${refs[@]}" -c ajv-formats --strict=true
  else
    echo "Validating $fx against $schema (must FAIL)"
    if npx --no-install ajv validate --spec=draft2020 -s "$schema" -d "$fx" "${refs[@]}" -c ajv-formats --strict=true >/dev/null 2>&1; then
      echo "::error::Fixture $fx validated successfully but lives in invalid/"
      return 1
    else
      echo "OK — rejected as expected."
    fi
  fi
}

declare -a valid_fixtures=()
while IFS= read -r line; do
  valid_fixtures+=("$line")
done < <(find versions -path '*/fixtures/valid/*.json' -type f | sort)

declare -a invalid_fixtures=()
while IFS= read -r line; do
  invalid_fixtures+=("$line")
done < <(find versions -path '*/fixtures/invalid/*.json' -type f | sort)

if [[ ${#valid_fixtures[@]} -eq 0 && ${#invalid_fixtures[@]} -eq 0 ]]; then
  echo "No fixtures found. Nothing to validate."
  exit 0
fi

echo "Found ${#valid_fixtures[@]} valid fixture(s), ${#invalid_fixtures[@]} invalid fixture(s)"

for fx in "${valid_fixtures[@]}"; do
  run_one "$fx" yes
done

for fx in "${invalid_fixtures[@]}"; do
  run_one "$fx" no
done

echo "All fixtures validated as expected."
