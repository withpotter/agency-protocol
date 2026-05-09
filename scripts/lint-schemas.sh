#!/usr/bin/env bash
# Lint every JSON Schema under versions/ for well-formedness.
# Cross-file $refs resolve via -r. ajv-formats is loaded so format:date-time etc. validate.
set -euo pipefail

shopt -s nullglob
files=()
while IFS= read -r line; do
  files+=("$line")
done < <(find versions -name '*.schema.json' -type f | sort)

if [[ ${#files[@]} -eq 0 ]]; then
  echo "No *.schema.json files found. Nothing to lint."
  exit 0
fi

echo "Found ${#files[@]} schema file(s)"

for f in "${files[@]}"; do
  echo "Checking $f"
  refs=()
  for r in "${files[@]}"; do
    if [[ "$r" != "$f" ]]; then
      refs+=("-r" "$r")
    fi
  done
  npx --no-install ajv compile --spec=draft2020 -s "$f" "${refs[@]}" -c ajv-formats --strict=true
done

echo "All schemas compile cleanly."
