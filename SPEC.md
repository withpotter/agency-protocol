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
