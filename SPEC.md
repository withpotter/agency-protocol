# Agency Protocol Specification

> **Status:** v0.0.1 substrate in progress. The JSON Schemas under
> [`versions/`](./versions/) are the canonical protocol artifacts. This prose
> document records version intent, lifecycle notes, and design decisions that
> are not fully expressible in schema form.

## Versions

The normative specification for each version of Agency Protocol is rendered
from the schemas under [`versions/`](./versions/). The prose in this document
explains intent, lifecycle, and assembly rules; the schemas are the
authoritative shape.

When the prose and the schemas disagree, the schemas win.

## v0.0.1 Memory Lifecycle Rules

v0.0.1 defines the shape of `MemoryRecord`; it also defines the minimum
governance rules that prevent memory from becoming a write-only store.

These rules do not introduce new canonical entities. They are lifecycle rules
over the existing v0.0.1 schemas:

- `AgencyEvent`
- `MemoryRecord`
- `OutcomeEvidence`
- `AuditBlock.validationEvents`

Runtime implementations MAY use local draft objects such as `MemoryCandidate`
or `MemoryProjectionDraft`, but those objects are runtime extensions, not
protocol artifacts.

Recommended memory lifecycle event types are:

```txt
memory.record.projected
memory.record.rejected
memory.record.staled
memory.record.corrected
memory.assumption.rejected
```

All recommended event types satisfy the v0.0.1 event type shape:
`<trust_domain>.<noun>.<verb>`.

### Projection Trigger And Async Flow

Memory projection is the process of turning one or more `AgencyEvent` records
into a proposed `MemoryRecord`.

Projection can be triggered by:

- an `AgencyEvent` containing a stable fact, pattern, preference, or operating
  cue
- an `OutcomeEvidence` record with assumptions that should become reusable
  context
- repeated observations with shared subject, principal, scope, and compatible
  statements
- principal-provided assertions that should be retained as semantic memory

Projection SHOULD be asynchronous by default. A user-facing write path may
record the originating `AgencyEvent`, but durable memory creation should happen
after projection, validation, and host-runtime acceptance.

The default async flow is:

```txt
AgencyEvent | OutcomeEvidence
  -> projection job
  -> MemoryCandidate
  -> host validation
  -> MemoryRecord written or memory.record.rejected event recorded
```

If the host runtime rejects a `MemoryCandidate`, it MUST record an `AgencyEvent`
with event type `memory.record.rejected`. The event payload SHOULD include the
candidate identifier, rejection reason, candidate statement, confidence, and
evidence event IDs. This keeps rejected memory proposals auditable.

### MemoryCandidate Typed Contract

`MemoryCandidate` is a protocol-adjacent contract between an intelligence
runtime and a governed host runtime. It is not a canonical v0.0.1 schema
entity, but implementations that project memory SHOULD use this minimum shape:

```ts
type MemoryCandidate = {
  candidateId?: string;
  principalId: PrincipalId;
  scope: Scope;
  suggestedFunctionalType: 'working' | 'episodic' | 'semantic' | 'procedural';
  suggestedMemoryType: 'fact' | 'pattern' | 'preference';
  subjectType: string;
  subjectId?: string;
  statement: string;
  evidenceEventIds: string[];
  confidence: Confidence;
  suggestedStatus: 'active';
  projectionReason?: string;
};
```

The host runtime validates the candidate and writes a canonical `MemoryRecord`
or records `memory.record.rejected`.

### Default Functional Type Mapping

The default v0.0.1 projection mapping is:

- one-off observed event -> `functionalType: episodic`
- stable extracted fact -> `functionalType: semantic`
- repeated operating pattern -> `memoryType: pattern`
- repeatable action rule -> candidate for `functionalType: procedural`
- temporary task/session context -> `functionalType: working`, not durable by
  default

### Ownership

The no-direct-writes rule applies to memory.

Reasoning or intelligence runtimes MAY propose memory records, but MUST NOT
write canonical `MemoryRecord` state directly unless they are also the governed
host runtime for that implementation.

For the Potter reference runtime, this means:

```txt
Python agency-runtime proposes memory.
NestJS/Potter validates and writes memory.
```

The host runtime is responsible for scope checks, evidence checks, confidence
thresholds, audit authorship, and final status assignment.

Python or another intelligence runtime MAY suggest affected memory IDs during
projection, staleness, or correction. The host runtime owns the canonical
memory write.

### Staleness

A host runtime MUST define deterministic staleness rules for any persisted
memory store. Implementations MAY override default TTLs in their conformance
profile, but the default v0.0.1 TTL policy is:

- `working`: not durable by default
- `episodic`: stale after 90 days without reconfirming evidence
- `semantic`: no time-based TTL by default
- `procedural`: no time-based TTL by default

At minimum, a `MemoryRecord` can transition from `active` to `stale` when one
of the following is true:

- newer accepted evidence supersedes the memory
- related principal profile or configuration changes invalidate the statement
- a runtime-defined freshness window expires without reconfirming evidence
- the related agency expression or delegated trust is revoked

Staleness is recorded with an `AgencyEvent` such as:

```txt
memory.record.staled
```

### Correction Propagation

Principal rejection or correction of an assumption MUST be able to propagate
back to memory records that relied on that assumption.

The canonical propagation procedure is:

```txt
1. Host records memory.assumption.rejected for the reviewed outcome.
2. Host loads the related OutcomeEvidence.
3. Host gathers OutcomeEvidence.eventIds.
4. Host finds MemoryRecord entries with overlapping evidenceEventIds in the
   same principal and scope.
5. Host marks matching records corrected when the statement is wrong.
6. Host marks matching records stale when the statement may once have been
   true but no longer applies.
7. Host records memory.record.corrected or memory.record.staled events for
   every changed memory record.
```

An intelligence runtime may suggest affected memory IDs, but the host runtime
owns the correction write.

### Consolidation Boundary

v0.0.1 does not define memory consolidation. It captures the fields required
for later consolidation:

- `functionalType`
- `memoryType`
- `evidenceEventIds`
- `confidence`
- `observationCount`
- `firstObservedAt`
- `lastObservedAt`
- `status`

Consolidation across `episodic`, `semantic`, and `procedural` memory remains a
v0.1 concern.

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
