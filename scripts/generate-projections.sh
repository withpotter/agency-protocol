#!/usr/bin/env bash
# Regenerate the published projections from the JSON Schema sources.
#
# Outputs:
#   packages/npm/dist/<version>/...   TypeScript .d.ts (one per schema)
#   packages/pypi/dist/<version>/...  Python (Pydantic v2) modules
#
# CI runs the same script and fails if the working tree differs from the
# committed output (see .github/workflows/projection-drift.yml).

set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

# --- TypeScript ------------------------------------------------------------

ts_gen_dir="$repo_root/generators/typescript"
if [[ ! -d "$ts_gen_dir/node_modules" ]]; then
  echo "Installing TypeScript generator deps..."
  (cd "$ts_gen_dir" && npm install --no-fund --no-audit --silent)
fi

echo "Generating TypeScript projection..."
(cd "$ts_gen_dir" && node generate.mjs)

# --- Python ----------------------------------------------------------------

if ! command -v datamodel-codegen >/dev/null 2>&1; then
  echo "datamodel-codegen not on PATH. Install with:"
  echo "  pip install --user 'datamodel-code-generator[http]'"
  echo "and ensure the user-site bin directory is on your PATH."
  exit 1
fi

shopt -s nullglob
for ver_dir in versions/*/; do
  ver="$(basename "$ver_dir")"
  schemas_dir="$ver_dir/schemas"
  if [[ ! -d "$schemas_dir" ]]; then
    continue
  fi
  out_dir="packages/pypi/dist/$ver"
  rm -rf "$out_dir"
  mkdir -p "$(dirname "$out_dir")"
  echo "Generating Python projection for $ver..."
  # datamodel-codegen treats output paths whose last segment contains a "."
  # as a single file (it inspects Path.suffix), which breaks for version
  # directory names like "v0.0.1". Generate into a temp directory in the
  # parent and rename into place.
  tmp_out="$(mktemp -d "$(dirname "$out_dir")/.gen-XXXXXX")"
  datamodel-codegen \
    --input "$schemas_dir" \
    --input-file-type jsonschema \
    --output "$tmp_out" \
    --output-model-type pydantic_v2.BaseModel \
    --target-python-version 3.11 \
    --use-schema-description \
    --use-title-as-name \
    --disable-timestamp \
    --field-constraints \
    --use-double-quotes \
    --use-standard-collections \
    --use-union-operator \
    --use-default \
    --snake-case-field \
    --collapse-root-models
  mv "$tmp_out" "$out_dir"
  # Ensure every generated package has __init__.py for import discovery.
  find "$out_dir" -type d -exec sh -c 'test -f "$1/__init__.py" || : > "$1/__init__.py"' _ {} \;
done

echo "Projections regenerated."
