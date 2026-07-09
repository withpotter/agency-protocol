# Changelog

All notable changes to Agency Protocol are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this repository adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `versions/v0.0.1/schemas/entities/proposal.schema.json`: the runtime-agnostic
  governed-proposal envelope. A runtime proposes a change; the host validates,
  a human/policy approves, and only then is it applied, with an audit trail
  (`runtime proposes; host validates, persists, applies`). Carries the
  governance envelope only — `origin`, non-empty `evidence`, `risk`, `status`
  lifecycle, host-assigned `id`, open `kind` discriminator, and an **opaque,
  host-owned `payload`**. Domain-specific payload shapes (e.g. Potter's
  page-diff / feature-bundle / operation) are validated by the host, not the
  substrate.
- `versions/v0.0.1/schemas/shared/proposal-evidence.schema.json`: a single piece
  of evidence justifying a proposal — domain-agnostic `type`
  (`prompt` | `metric` | `event` | `observation` | `reference`) + `content` +
  optional `ref`.
- `versions/v0.0.1/fixtures/{valid,invalid}/`: two valid + four invalid
  `proposal` fixtures (minimal, full; empty evidence, bad status, non-substrate
  evidence type, missing payload).
- Repository skeleton: README, LICENSE, SPEC placeholder, CI workflow stubs,
  and the `versions/v0.0.1/` directory layout.
- `versions/v0.0.1/schemas/shared/`: shared scalar schemas — `principal-id`,
  `scope`, `confidence`, `protocol-action`, `revocation-rule`, `context-key`,
  `trust-domain`, `audit-block`.
- `scripts/lint-schemas.sh` and `npm run lint:schemas` for local validation.
  CI `schema-lint` workflow updated to resolve cross-file `$ref` and validate
  against JSON Schema draft 2020-12 with `ajv-formats` loaded.
- `versions/v0.0.1/schemas/shared/`: forward-compatible supporting types —
  `principal-type`, `delegation-link`, `agency-lineage`, `revocation-event`,
  `validation-event`.
- `versions/v0.0.1/schemas/entities/`: eleven protocol entity schemas —
  `principal`, `principal-profile`, `agency-expression`, `delegated-trust`,
  `agency-frame`, `acknowledgement-event`, `agency-event`, `memory-record`,
  `trait-candidate`, `outcome-evidence`, `context-pack`. Cross-references
  the shared scalars by relative `$ref`.
- `SPEC.md`: new "Mistakes log" section recording design revisions made
  before release.
- `versions/v0.0.1/fixtures/{valid,invalid}/`: twenty valid + thirteen invalid
  fixtures, covering each v0 entity schema, representative failure modes, and
  memory lifecycle governance examples.
- `scripts/validate-fixtures.sh` and `npm run validate:fixtures`: validates
  every fixture against its schema. Valid fixtures must pass; invalid
  fixtures must fail. Schema is resolved by stem from the fixture filename
  (`<stem>--<descriptor>.json`), searching `entities/` then `shared/`. All
  cross-file `$ref`s are wired via `-r`. The CI `Fixtures` workflow now
  delegates to this script.
- `generators/typescript/` and `generators/python/`: generator configs for
  the published TypeScript (`json-schema-to-typescript`) and Python
  (`datamodel-code-generator`, Pydantic v2) projections.
- `packages/npm/` (`@withpotter/agency-protocol-types`, version `0.0.1`)
  and `packages/pypi/` (`agency-protocol`, version `0.0.1`) publish
  manifests with committed `dist/v0.0.1/` outputs (24 schema `.d.ts` files plus
  a barrel `index.d.ts`; Pydantic v2 modules under `dist/v0.0.1/`).
- `scripts/generate-projections.sh` and `npm run generate:projections`:
  regenerates both projections from the schema sources. The `Projection
  Drift` CI workflow now delegates to this script and fails on diff
  against the committed `packages/` tree.
- `SPEC.md`: v0.0.1 memory lifecycle governance rules for projection,
  ownership, staleness, correction propagation, and the consolidation
  boundary. These rules use existing `AgencyEvent`, `MemoryRecord`,
  `OutcomeEvidence`, and audit primitives rather than adding new schema
  artifacts.
- Memory lifecycle fixtures covering projected memory, rejected projection,
  staleness, correction propagation, and invalid memory evidence/event type
  cases.

### Changed

- **Breaking (pre-release):** `TrustDomain` is no longer a closed enum.
  It is now a structural identifier (`^[a-z][a-z0-9_]*$`, max length 64),
  with the value space delegated to runtime conformance profiles. The
  `AgencyEvent.eventType` regex was narrowed to structural-only for the
  same reason. See `SPEC.md` "Mistakes log" for rationale.
- **Breaking (pre-release):** `Scope` and `ProtocolAction` narrowed from
  closed commerce-vocabulary enums to runtime-defined identifiers
  (`^[a-z][a-z0-9_]*$`, max length 64), matching `TrustDomain`.
- **Breaking (pre-release):** `PrincipalType` enum trimmed to
  `{person, organization, application, system}`. `business` is folded into
  `organization`. `PrincipalId`'s middle segment relaxes to
  `^[a-z][a-z0-9]*$` so the type token is runtime-defined.
  `PrincipalProfile.profileType` now `$ref`s the shared `PrincipalType`.
- **Breaking (pre-release):** `AgencyEvent.actor.type` enum drops the
  vertical role `customer`; principal kinds only:
  `{principal, user, system, agent}`.
- **Breaking (pre-release):** `AcknowledgementEvent.method` reframed from
  transport mechanisms to consent-intent shapes:
  `{interactive, programmatic, derived}`.
- **Breaking (pre-release):** `MemoryRecord.memoryType` enum trimmed to
  `{fact, pattern, preference}`. `TraitCandidate.traitType` drops `style`.
- `ContextPack.relevantMemories` is capped at 50 items, matching the v0
  context assembly bound already applied to TypeScript and Python projections.
- TypeScript projection generation now removes each version output directory
  before regeneration so deleted schemas cannot leave stale published files.
- Version and conformance README files now describe the current v0.0.1 schema
  state instead of the earlier skeleton phase.

### Removed

- **Breaking (pre-release):** `GovernedSetupPlan` entity removed from the
  spec. The shape modelled a Potter-specific onboarding artefact and is
  not protocol-shaped. Runtimes that need a governed onboarding artefact
  MAY define one as a runtime extension. The corresponding fixtures were
  removed.
