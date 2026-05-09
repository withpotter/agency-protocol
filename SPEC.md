# Agency Protocol Specification

> **Status:** placeholder. This document will contain the normative
> specification for Agency Protocol.
>
> The current specification draft lives in the v0 implementation proposal
> in the reference runtime. That document will be migrated and refined into
> this `SPEC.md` as part of the v0.0.1 schema work.

## Versions

The normative specification for each version of Agency Protocol is rendered
from the schemas under [`versions/`](./versions/). The prose in this document
explains intent, lifecycle, and assembly rules; the schemas are the
authoritative shape.

When the prose and the schemas disagree, the schemas win.

## Mistakes log

This section records design decisions that were drafted, then revised before
release. It exists so that implementers and future contributors can trace the
reasoning behind primitive shapes — not to apologise for revisions. A spec
that does not visibly course-correct is a spec that has not yet met reality.

Entries are append-only. Each entry names the primitive, the original shape,
the reason it was wrong, and the revised shape.

### v0.0.1 — `TrustDomain` narrowed from closed enum to runtime-defined identifier

- **Original shape (drafted in PR #3):** closed enum of nine domain names —
  `onboarding`, `storefront`, `brand`, `catalog`, `events`, `marketing`,
  `booking`, `finance`, `customer_relationships`.
- **Why it was wrong:** those values describe the surface of one runtime
  (a small-business commerce platform). A runtime-agnostic protocol cannot
  ship a closed enum of vertical-specific domain names. A legal-ops, clinical,
  or government runtime would need entirely different domains, and a closed
  enum forces a protocol minor-version bump every time a new vertical adopts
  the protocol.
- **Revised shape:** `TrustDomain` is now a structural format
  (`^[a-z][a-z0-9_]*$`, max length 64). The protocol defines the shape; the
  value space is delegated to runtime conformance profiles. This follows the
  IANA registry, OAuth-scope, and OpenTelemetry semantic-conventions
  patterns. The same change narrowed the `AgencyEvent.eventType` regex to
  structural-only.
- **Reference:** withpotter/agency-protocol PR #4.

### v0.0.1 — closed enums and Potter-shaped primitives stripped from the spec

- **Original shapes (drafted in PRs #3–#5):** several primitives carried
  values, enums, or whole entities that described one runtime's surface
  rather than runtime-agnostic protocol shape. Specifically:
  - `Scope` and `ProtocolAction` were closed enums of commerce verbs
    (`publish`, `charge`, `refund`, `apply_discount`, etc.) and commerce
    nouns (`pages`, `products`, `discounts`, etc.).
  - `PrincipalType` enumerated `business` alongside the four runtime-agnostic
    kinds; `PrincipalId` mandated a closed `prn_<type>_<id>` type segment
    drawn from the same enum.
  - `AgencyEvent.actor.type` enumerated `customer` (a commerce role).
  - `AcknowledgementEvent.method` enumerated `ui_click` and `api_token`
    (transport mechanisms, not consent intents).
  - `MemoryRecord.memoryType` and `TraitCandidate.traitType` carried
    runtime-vertical values (`reasoning`, `context`, `style`).
  - The `GovernedSetupPlan` entity modelled a Potter-specific onboarding
    artefact (page-level patches with `replace`/`append`/`merge` operations,
    "publish" status terminology) — a runtime concern, not a protocol shape.
- **Why it was wrong:** the protocol's job is to define structural
  primitives that any runtime can conform to. Closed enums of vertical
  vocabulary, Potter-specific principal kinds, and an onboarding-plan
  entity force every adopter to either inherit Potter's domain model or
  carry dead fields. The same reasoning that retired the `TrustDomain`
  enum in PR #4 applies uniformly across the spec.
- **Revised shape:**
  - `Scope` and `ProtocolAction` are now runtime-defined identifiers
    (`^[a-z][a-z0-9_]*$`, max length 64), matching the `TrustDomain`
    pattern. Specific verbs and nouns are runtime conformance concerns.
  - `PrincipalType` is the closed set
    `{person, organization, application, system}`. `business` is folded
    into `organization`. `PrincipalId`'s middle segment relaxes to
    `^[a-z][a-z0-9]*$` so runtimes can define their own type tokens
    without a protocol bump.
  - `AgencyEvent.actor.type` drops `customer`; vertical roles live in
    `PrincipalProfile.attributes`.
  - `AcknowledgementEvent.method` is `{interactive, programmatic, derived}`
    — intent shape, not transport.
  - `MemoryRecord.memoryType` is `{fact, pattern, preference}`.
    `TraitCandidate.traitType` drops `style`.
  - `GovernedSetupPlan` is removed from the spec. Runtimes that need a
    governed onboarding artefact MAY define one as a runtime extension.
- **Reference:** withpotter/agency-protocol PR #6 (post-projections), follow-up to PR #4.
