# Changelog

All notable changes to Agency Protocol are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this repository adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Repository skeleton: README, LICENSE, SPEC placeholder, CI workflow stubs,
  and the `versions/v0.0.1/` directory layout.
- `versions/v0.0.1/schemas/shared/`: shared scalar schemas — `principal-id`,
  `scope`, `confidence`, `protocol-action`, `revocation-rule`, `context-key`,
  `trust-domain`, `audit-block`.
- `scripts/lint-schemas.sh` and `npm run lint:schemas` for local validation.
  CI `schema-lint` workflow updated to resolve cross-file `$ref` and validate
  against JSON Schema draft 2020-12 with `ajv-formats` loaded.
