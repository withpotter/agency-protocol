# Agency Protocol

Runtime-agnostic governance substrate for **context-aware delegated agency**.

## What this repository is

The canonical specification for Agency Protocol. JSON Schema is the source of
truth; runtime types (TypeScript, Python) are **generated projections** from
the schemas in this repository. Independent implementations consume the
schemas and conformance fixtures published here.

This is a protocol repository, not a runtime. It contains:

- normative schemas (`versions/<version>/schemas/`)
- conformance fixtures (`versions/<version>/fixtures/`)
- a conformance harness (`versions/<version>/conformance/`)
- generator configuration that produces TypeScript and Python projections
- the prose specification (`SPEC.md`, forthcoming)

It does **not** contain:

- runtime implementations
- product code
- database schemas, services, or APIs

Those live in the consumer runtimes that depend on this package.

## Status

| Version | Status | Notes |
| --- | --- | --- |
| `v0.0.1` | in development | initial substrate; schemas + fixtures + conformance harness |

Potter is the initial reference runtime. The protocol does not assume or
require a particular runtime; consumers are tracked in their own
repositories.

## Versioning

The repository is versioned per-spec-version under `versions/`. Each tagged
release pins exactly one version directory. Breaking schema changes require a
new directory and a new tag. Non-breaking additions are minor bumps within
the same directory.

## Layout

```
versions/
  <version>/
    schemas/            JSON Schema (canonical)
    fixtures/
      valid/            objects that MUST validate
      invalid/          objects that MUST fail validation
    conformance/        portable harness specification + golden expectations
generators/
  typescript/           json-schema-to-typescript configuration
  python/               datamodel-code-generator configuration
packages/
  npm/                  generated TypeScript projection (publish target)
  pypi/                 generated Python projection (publish target)
.github/workflows/      CI: lint, fixture validation, projection drift, release
```

## Contributing

Contribution guidelines and security policy will be added before the
repository is made public. Until then, all changes go through pull request.

## License

Apache-2.0. See [`LICENSE`](./LICENSE).
