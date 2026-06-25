# Agency Protocol: A Governance Substrate for Delegated Agency
### (Neurodivergent-design edition)

**Status:** Working paper. Tracks `withpotter/agency-protocol` v0.0.1.
**Audience:** Engineers evaluating what this repository is and what it builds.
**Note:** This edition treats neuro-inclusive design as a core section (§13) with named profiles, rather than a future-directions appendix. The public edition keeps that material generalized in an appendix.
**Read time:** One sitting.

## Abstract

Agency Protocol is a runtime-agnostic governance substrate for context-aware delegated agency. It is not an agent framework, not a model, and not a runtime. It is a set of normative JSON Schemas, conformance fixtures, and a portable harness that define the shape of governed agency: who holds authority, within what bounds, on what evidence, and with what audit trail. The thesis underneath the schemas is that delegated responsibility requires a persistent subject — an entity to whom authority, duties, history, trust, and consequences can attach across time. The protocol calls that persistent subject's continuity *personhood* in a narrow, operational sense, and the eleven primitives exist to make it implementable. Runtime types in TypeScript and Python are generated projections of the schemas, not hand-written parallel definitions. This paper states the problem the protocol solves, names the thesis that motivates it, names the primitives, and shows how the pieces compose into one verifiable claim: an agent did a bounded thing, a principal authorized it, and both facts are auditable after the fact.

## 1. The problem

A customer service agent issues a $50,000 refund. The framework that ran it can tell you what tool was called and when. It cannot reliably tell you who delegated the authority to refund at that amount, whether approval was required, whether approval existed, what evidence justified the decision, or whether the agent exceeded its mandate. The action happened. Whether it should have is unanswerable from the trace.

That gap is the whole problem. Agent frameworks today answer the question "how does an agent act." They do not answer "by what authority, within what bounds, on whose evidence, and with what accountability." That second question is the governance gap.

The gap shows up the moment an agent does something a person cares about. A tool call fires. A record changes. A message goes out. The framework logged that the call happened. It did not record that a specific principal granted a bounded delegation, that the action fell inside that boundary, that the agent's assumptions were evidenced, or that a human approval was authoritative for that class of action. When something goes wrong, the trace shows the mechanics of execution and nothing about the legitimacy of it.

Most frameworks paper over this with three patterns, each insufficient:

- **Prompt-level guardrails.** Instructions in a system prompt are not a boundary. They are a suggestion the model may ignore, and they leave no structured record of what was permitted.
- **Hardcoded permission flags.** Booleans scattered through application code answer "can this run" but not "who delegated this, within what scope, and is that grant still live." They do not survive audit and they do not transfer between runtimes.
- **Execution logs.** A log says an action occurred. It does not say the action was authorized, that its assumptions were evidenced, or who held the authority to approve it.

The result is agency that executes but cannot be governed. Authority is implicit, boundaries are advisory, evidence is absent, and the audit trail records mechanics rather than legitimacy. As soon as a delegated agent touches anything consequential — money, records, customers, irreversible actions — that is the wrong shape. Agency Protocol exists to make those facts verifiable: who delegated the authority, whether approval was required and given, what evidence justified the action, and whether the agent stayed inside its mandate.


## 2. Why personhood

This is the claim the rest of the document serves. A reader who skips it will read the eleven primitives as a permission system with extra fields. They are not. They are the implementable substrate of a persistent subject.

**Identity alone is not enough.** A service account has an identity. A database record persists. A process can be traced. None of these establish a subject capable of bearing responsibility. Identity answers *which agent is this*. It does not answer *to whom do authority, duty, history, and consequences attach*. Those are different questions, and answering the first does not answer the second.

| Concept | Primary question |
| --- | --- |
| Identity | Which agent is this? |
| Authentication | Can the agent prove that identity? |
| Authorization | What may the agent do? |
| Delegation | On whose behalf may it act? |
| Accountability | How can its conduct be evaluated? |
| **Personhood** | **To whom do duties, history, responsibility, and consequences attach?** |

Agency Protocol is concerned with the last row. Everything above it is necessary but not sufficient.

**The operational definition is narrow.** In this protocol, personhood does not mean legal personhood, consciousness, sentience, or moral status. It means the continuity of identity, memory, intent, values, trust relationships, and learned behaviour across contexts and time. The precedent is the organisation: institutions are already treated as persons in legal and institutional contexts despite having no single biological consciousness. That precedent demonstrates that personhood can be constructed through governance, continuity, and recognized responsibility rather than biology. The protocol applies the same governance principle to artificial agents. It does not claim present-day agents are human persons; it claims that certain agents need operational and institutional personhood before consequential authority and responsibility can meaningfully attach to them.

**Four forms, two in scope.** *Operational personhood* is the technical substrate — persistent identity, continuity across sessions, traceable lineage, durable obligations, attributable actions, retained sanctions, verifiable history. This is what the schemas implement. *Institutional personhood* is the governance status built on top: an institution issues mandates to the agent, preserves its identity, attaches obligations, keeps a history of conduct, evaluates performance, limits authority, imposes sanctions, and can retire it. *Legal personhood* (enforceable rights, duties, liabilities, standing) and *moral personhood* (intrinsic moral worth) are downstream possibilities the protocol neither requires nor forecloses. The developmental path is operational → institutional → potential legal. v0.0.1 establishes the conditions for the first two.

**Why continuity is constitutive.** Without continuity, memory becomes state, delegation becomes access control, learning becomes logging, and trait inheritance becomes heuristic reuse. Continuity is not a technical convenience; it is what allows identity, memory, authority, learning, and history to belong to the same subject across time. Stated plainly: personhood requires continuity because responsibility requires a persistent subject. This is why each primitive in Section 4 is a continuity mechanism, not a permission field. A mandate attached to a transient process is not a mandate — it is an instruction with extra steps.

## 3. The claim

A governed action is a verifiable fact, not a framework log entry.

Agency Protocol makes that fact representable, checkable, and portable. It defines the shared shape of governed delegated agency so that a single action carries, in structured form: the persistent principal who is governed, the scoped expression of authority that was granted, the bounded trust delegated under it, the consent that activated it, the evidence and assumptions behind the outcome, and the immutable audit spine that ties them together. Any runtime that emits these shapes and passes the conformance harness produces actions that are governable by construction — attributable to a continuous subject — regardless of what framework, model, or language sits underneath.

## 4. What this repository is

The repository is a specification, not an implementation.

- **JSON Schema is the single source of truth.** Every primitive is defined as a normative JSON Schema under the versioned spec directory. The schema is the contract.
- **Projections are generated, not authored.** TypeScript and Python types are generated from the schemas and checked for drift in CI. There is no second, hand-maintained definition that can silently diverge from the contract. If a projection drifts, the build fails.
- **Conformance is a test, not a promise.** The repo ships valid fixtures that MUST validate and invalid fixtures that MUST fail. A runtime conforms by validating against the published schemas and passing the harness.
- **Structural shape, runtime-defined value spaces.** The schemas fix the structure. The open value spaces — trust domains, scopes, protocol actions — are runtime-defined registries. The protocol says what shape a scope must have; the runtime publishes which scopes exist. This is what keeps the protocol runtime-agnostic by construction: no commerce, clinical, or legal vocabulary survives in the normative schemas.

## 5. The primitives

Before the entities, the questions. Every governed action answers six:

1. **Who acted?** — the persistent subject.
2. **Under what authority?** — the granted, scoped expression.
3. **Within what boundaries?** — the bounded, revocable trust.
4. **Toward what objective?** — the framed goal and its risk.
5. **Based on what evidence?** — the assumptions and approval behind the outcome.
6. **With what audit trail?** — the immutable spine that ties the rest together.

The eleven primitives exist to make each of those questions answerable as structured fact rather than inference. They map directly:

| Question | Primitive(s) |
| --- | --- |
| Who acted? | Principal, PrincipalProfile |
| Under what authority? | AgencyExpression |
| Within what boundaries? | DelegatedTrust |
| Toward what objective? | AgencyFrame |
| Based on what evidence? | OutcomeEvidence, AcknowledgementEvent |
| With what audit trail? | AgencyEvent, AuditBlock |
| What is carried forward? | MemoryRecord, TraitCandidate, ContextPack |

v0.0.1 defines these eleven composable primitives over a shared scalar layer. Each is a JSON Schema entity; together they form the chain from a governed party to an audited outcome. Read against Section 2, each is a continuity mechanism: the `Principal` is the persistent subject, `AgencyEvent` is the verifiable history, `MemoryRecord` is continuity of learned behaviour, `AgencyLineage` is the lineage that prevents responsibility evasion through cloning or version change, and `DelegatedTrust` is the revocable mandate that makes sanctions mean something across sessions.

| Entity | Role in the chain |
| --- | --- |
| Principal | The governed party |
| PrincipalProfile | Intent and context envelope |
| AgencyExpression | Scoped authority, with lifecycle and lineage |
| DelegatedTrust | Bounded grant: allowed / prohibited / approval / revocation |
| AgencyFrame | Tracked objective and risk level |
| AcknowledgementEvent | Consent: activate / reject / modify an expression |
| AgencyEvent | Immutable audit spine |
| OutcomeEvidence | Action, assumptions, human approval authority |
| MemoryRecord | Governed memory: functionalType + memoryType |
| TraitCandidate | Proposed principal traits |
| ContextPack | Deterministic context handed to the agent |

These compose over a shared scalar layer so that the same identity, scope, trust domain, and confidence semantics hold across every entity rather than being re-specified per entity.

| Scalar | Shape |
| --- | --- |
| PrincipalId | `prn_<type>_<id>` |
| PrincipalType | `{ person, organization, application, system }` |
| Scope | runtime-defined scope token |
| TrustDomain | runtime-defined trust domain token |
| ProtocolAction | runtime-defined action token |
| Confidence | provenanced value in [0,1] |
| ContextKey | closed inheritable-block enum |
| RevocationRule | closed condition enum |
| DelegationLink | links a grant to its parent authority |
| AgencyLineage | lineage of an expression |
| RevocationEvent | a recorded revocation |
| ValidationEvent | a recorded validation in the audit block |
| AuditBlock | the audit envelope carried on governed records |

## 6. How they compose

A single governed action walks the chain:

```
Principal ───────────── who is governed
   │  carries
   ▼
PrincipalProfile ────── intent + context
   │
   ▼
AgencyExpression ────── scoped authority (lifecycle + lineage)
   │  bounded by
   ▼
DelegatedTrust ──────── allowed / prohibited / approval / revocation
   │  activated by
   ▼
AcknowledgementEvent ── consent: activate / reject / modify
   │
   ▼
AgencyFrame ─────────── objective + risk level
   │  action runs, producing
   ▼
OutcomeEvidence ─────── action + assumptions + approval authority
   │
   ▼
AgencyEvent ─────────── immutable audit spine (every step writes here)
   with AuditBlock ──── validation events
```

1. A **Principal** exists and carries a **PrincipalProfile** that holds intent and context.
2. An **AgencyExpression** grants scoped authority to act, with its own lifecycle (active, revoked) and lineage back to the authority that issued it.
3. A **DelegatedTrust** bounds that authority concretely: what is allowed, what is prohibited, what requires approval, and the conditions under which it is revoked.
4. An **AcknowledgementEvent** records consent — the expression is activated, rejected, or modified. Authority is not assumed; it is acknowledged.
5. An **AgencyFrame** tracks the objective being pursued and its risk level.
6. The action runs and produces **OutcomeEvidence**: what was done, the assumptions it rested on, and who held authority to approve it.
7. Every step writes to the **AgencyEvent** spine — the immutable, append-only audit record — with an **AuditBlock** carrying validation events.

The output is not a log line. It is a structured, checkable fact: this principal, under this expression, within this bounded trust, having acknowledged it, pursuing this framed objective, produced this evidenced outcome, and here is the immutable spine that proves each link.

## 7. A governed action, end to end

Return to the $50,000 refund from Section 1, but make it a $5,000 refund an agent is actually allowed to issue, and watch the objects flow. These are illustrative instances of the v0.0.1 schemas, abbreviated for readability; runtime-defined tokens (scopes, trust domains, actions) are shown as a Potter runtime would publish them.

The principal and the authority granted to its agent:

```json
{
  "principal": {
    "principalId": "prn_organization_potter-merchant-8842",
    "principalType": "organization"
  },
  "agencyExpression": {
    "agencyExpressionId": "axp_refunds_2026q2",
    "principalId": "prn_organization_potter-merchant-8842",
    "scope": "commerce.refunds",
    "status": "active",
    "lineage": { "parentAgencyExpressionId": null }
  },
  "delegatedTrust": {
    "trustDomain": "commerce.payments",
    "allowed": ["refund.issue"],
    "prohibited": ["payout.create"],
    "approval": { "action": "refund.issue", "threshold": { "amount": 2000, "currency": "USD" } },
    "revocation": { "rule": "on_principal_config_change" }
  }
}
```

The agent proposes a refund. Because $5,000 exceeds the $2,000 approval threshold, the bounded trust requires a human approval before the action is legitimate. Consent and objective are recorded:

```json
{
  "acknowledgementEvent": {
    "agencyExpressionId": "axp_refunds_2026q2",
    "decision": "activate"
  },
  "agencyFrame": {
    "objective": "Refund order #44910 after duplicate charge",
    "riskLevel": "elevated"
  }
}
```

The action runs, and the outcome is recorded with the assumptions it rested on and the authority that approved it:

```json
{
  "outcomeEvidence": {
    "action": "refund.issue",
    "amount": { "value": 5000, "currency": "USD" },
    "assumptions": ["Charge ch_3Q1 was a confirmed duplicate of ch_3Q0"],
    "approval": {
      "required": true,
      "authority": "prn_person_merchant-owner-1",
      "grantedAt": "2026-06-24T14:05:00Z"
    },
    "confidence": { "value": 0.97, "source": "duplicate-detection-rule" }
  }
}
```

Every step appends to the immutable spine:

```json
{
  "agencyEvent": {
    "type": "outcome.recorded",
    "agencyExpressionId": "axp_refunds_2026q2",
    "auditBlock": {
      "validationEvents": [
        { "check": "scope.match", "result": "pass" },
        { "check": "trust.allowed", "result": "pass" },
        { "check": "approval.required", "result": "satisfied" }
      ]
    }
  }
}
```

Now the question from Section 1 is answerable from the record, not from inference. Who delegated the authority: `prn_organization_potter-merchant-8842`, via `axp_refunds_2026q2`. Whether approval was required: yes, because $5,000 crossed the $2,000 threshold. Whether it existed: yes, granted by `prn_person_merchant-owner-1` at a recorded time. What evidence justified it: a duplicate-charge assumption at 0.97 confidence. Whether the agent exceeded its mandate: no — `scope.match` and `trust.allowed` both passed, and `payout.create` was never attempted because it is prohibited. Had the agent attempted a $5,000 refund without approval, the `approval.required` check would have failed and the runtime would have recorded the rejection rather than the refund. The contrast with the opening is the whole point: same action, but now legitimacy is a verifiable fact.

## 8. Governed memory

Memory is where ungoverned agency leaks, and it is also where personhood is won or lost. A reasoning runtime that can write directly to its own memory can launder unaudited beliefs into future decisions, and a subject whose history can be silently rewritten is not a persistent subject at all. This is the section where the continuity claim of Section 2 becomes an enforceable rule rather than an aspiration. v0.0.1 defines the minimum governance rules that prevent this, expressed entirely over existing primitives — `AgencyEvent`, `MemoryRecord`, `OutcomeEvidence`, and audit validation events — rather than new schema artifacts.

**No direct writes.** A reasoning or intelligence runtime MAY propose memory but MUST NOT write a canonical `MemoryRecord` unless it is also the governed host runtime. In the Potter reference runtime, the Python agency-runtime proposes and NestJS/Potter validates and writes. The host owns scope checks, evidence checks, confidence thresholds, audit authorship, and final status.

**Projection is asynchronous.** Events project into a `MemoryCandidate` — a protocol-adjacent typed contract, not a canonical entity — carrying at minimum `suggestedFunctionalType`, `suggestedMemoryType`, `statement`, `evidenceEventIds`, `confidence`, and `suggestedStatus`. The host validates it, and either writes a `MemoryRecord` or records a `memory.record.rejected` event with the candidate, reason, statement, confidence, and evidence IDs. Rejected proposals stay auditable; they do not disappear silently.

**Default functional mapping.** A one-off observed event projects to `episodic`; a stable extracted fact to `semantic`; a repeated operating pattern is a candidate for `procedural` (likely v0.1); temporary request or session context is `working` and not durable by default.

**Staleness is deterministic.** The default TTL policy: `working` is not durable; `episodic` goes stale after 90 days without reconfirming evidence; `semantic` and `procedural` have no time-based TTL and decay only on contradiction or correction. A record transitions `active → stale` when newer evidence supersedes it, configuration invalidates it, a freshness window expires, or the related expression or trust is revoked.

**Corrections propagate.** When a principal rejects an assumption, the host records `memory.assumption.rejected`, loads the related `OutcomeEvidence`, gathers its event IDs, finds memory records with overlapping `evidenceEventIds` in the same principal and scope, marks them `corrected` (wrong) or `stale` (no longer true), and records an event for each change. A wrong assumption cannot silently survive in memory. Python may suggest the affected memory IDs, but the host owns the write.

Consolidation across episodic, semantic, and procedural memory is explicitly out of scope for v0.0.1. The record captures the fields a later version needs (`functionalType`, `memoryType`, `evidenceEventIds`, `confidence`, `observationCount`, `firstObservedAt`, `lastObservedAt`, `status`) and draws the boundary there.

## 9. Conformance

The schemas are the contract; conformance is how a runtime proves it honors the contract. The repository ships valid fixtures that MUST validate and invalid fixtures that MUST fail, covering each entity and representative failure modes: a bad principal-id format, an out-of-range confidence, an empty objective, a memory projection missing its evidence, a malformed event type. A runtime conforms by validating against the published schemas and passing the harness, then publishing its own registries for the runtime-defined value spaces (trust domains, scopes, actions).

Versioning is per-spec-version under `versions/`. A breaking schema change requires a new version directory and tag. Non-breaking additions are minor bumps within a directory. This keeps a conforming runtime pinned to an exact, immutable contract.

## 10. What this is not

To be precise about the boundary:

- It is **not an agent framework.** It says nothing about planning, tool-calling loops, or model selection.
- It is **not a runtime.** No services, no database, no API.
- It is **not a permission library.** Permissions are a downstream projection of `DelegatedTrust`; the protocol defines the delegation fact, not an enforcement engine.
- It is **not vertical software.** No commerce, clinical, or legal vocabulary survives in the normative schemas.

It is the substrate underneath all of those: the shared, runtime-agnostic shape of governed delegated agency, with the schema as source of truth and conformance as the test.

## 11. What you build on it

A substrate that governs nothing is worthless. The point of fixing the shape of governed agency is that you can now build a runtime on top of it, and that runtime can serve a framework. The layering is deliberate:

```
┌─────────────────────────────────────────────┐
│  Framework      acts                         │  CrewAI / AutoGen / LangGraph / bespoke loop
│  (makes the agent do things)                 │  planning, tool calls, model selection
└───────────────────┬─────────────────────────┘
                    │ proposed action
                    ▼
┌─────────────────────────────────────────────┐
│  Runtime        governs the acting           │  Potter, or any host runtime
│  (checks, records, governs memory)           │  validates against expression + trust,
└───────────────────┬─────────────────────────┘  emits events + evidence, writes memory
                    │ protocol-shaped facts
                    ▼
┌─────────────────────────────────────────────┐
│  Agency Protocol  makes it verifiable         │  JSON Schemas + conformance harness
│  (portable, checkable, immutable contract)   │  the shared shape; source of truth
└───────────────────┬─────────────────────────┘
                    ▼
              Governed action
       (attributable to a persistent subject)
```

- **The framework makes the agent act.** Planning, tool-calling loops, model selection, multi-step orchestration — CrewAI, AutoGen, LangGraph, or a bespoke loop. Agency Protocol does not replace this and does not compete with it.
- **The runtime makes those actions governable.** It sits between the framework and the world. Before an action runs, the runtime checks it against an `AgencyExpression` and its `DelegatedTrust`; as it runs, the runtime records `AgencyEvent`s and `OutcomeEvidence`; after it runs, the runtime governs memory through the no-direct-writes lifecycle. The runtime is the thing that emits protocol-shaped facts and passes the conformance harness.
- **The substrate makes the runtime portable and checkable.** Because the runtime speaks the protocol's schemas, its governed facts are verifiable by anyone, transferable between runtimes, and pinned to an immutable contract.

So the chain is: framework acts → runtime governs the acting → substrate makes the governance a verifiable, portable fact. A framework on its own produces execution logs. A framework wrapped by an Agency-Protocol runtime produces governed actions attributable to a persistent subject. That is the difference the substrate buys, and it is the answer to "what good is it": the substrate is what lets a governance runtime wrap any agent framework without re-inventing identity, delegation, audit, and governed memory each time.

This is the larger claim hiding inside the personhood argument: **governance is a portable layer.** Today every serious agent deployment reinvents identity, permissions, audit, approval, delegation, and memory governance inside its own codebase, in incompatible ways. Agency Protocol asserts that governance itself can be standardized — that the shape of a governed action is general, not vertical — and the personhood thesis is what justifies standardizing it around a persistent subject rather than around a session or a request. The portable governance layer is the product; personhood is why it has the shape it does.

This is exactly what Potter is. Potter is not the protocol; it is a governance runtime built on the protocol that serves a commerce-agent workload. The same substrate would serve a clinical runtime, a logistics runtime, or a coding-agent runtime, none of which need to share Potter's stack — only the protocol.

## 12. Reference runtime

Potter is the first reference runtime, used to prove the protocol's claims under a real workload, not to define the protocol. Potter implements the host side with NestJS owning all writes and schema validation and a Python agency-runtime proposing memory and plans. The "Python proposes, NestJS governs" split is the protocol's own principle expressed in architecture: inference is not delegation, so the inference layer proposes and the governed host validates and writes. The protocol does not require NestJS, Python, or any of Potter's choices. Potter is the first environment where the claim is tested, not a defining dependency.

## 13. Designing for neurodivergent minds

If personhood is the continuity of a subject over time, then different subjects will not process context, memory, and priorities identically. A substrate that models a persistent subject must therefore be able to model different operating patterns without assuming a single cognitive architecture. This is not a detour from the governance argument; it is a direct consequence of it. The moment you commit to modelling a subject, you inherit the question of which subject, and the honest answer is: not a uniform one.

The trait and memory primitives are where that variation lives: a `Principal` carries traits, and `MemoryRecord` carries a `functionalType` and lifecycle. Neurodivergent cognition — ADHD, autism, dyslexia, OCD, and others — is the clearest evidence that human cognition is not uniform, and each profile is well characterized. Studying these brains is not a diversity gloss on the spec; it is a stress test that surfaces assumptions the typical design gets lucky not needing. Each profile is a different operational regime, and each one breaks a default the schema left implicit. The diagnosis names the regime; the architectural lesson lives in how that brain actually operates.

Four neurodivergent profiles, each yielding a concrete schema insight:

- **ADHD — variable, reward-sensitive gating.** ADHD is not an attention deficit but a context-variable, reward-sensitive gating problem: the filter on what enters working memory is wide open under low salience and hyperselective under high salience. The analogue is an agent with multiple active mandates and no way to weight which dominates under contention, because mandate state is binary — authorized or not. The fix is a priority field on the mandate-state value schema, so high-priority mandates resist context-switch and low-priority ones yield. ADHD also surfaces hyperfocus, a lock-in failure mode where a brain absorbed in one high-salience task stops registering signals that matter. Translated to an agent, a runtime executing a high-priority procedure can ignore revocations and new delegations, so it must enforce mandatory governance check points where it re-reads governance state regardless of execution state.
- **Autism — strong local detail, low tolerance for silent inconsistency.** Autistic cognition often features strong local processing and a low tolerance for silent inconsistency, resisting over-generalization across contexts. This argues for `domain_scope` on procedural memory, so a learned procedure is not silently applied across contexts where it does not hold.
- **Dyslexia — whole-pattern over fragments.** Dyslexic cognition frequently compensates by reading whole patterns rather than reconstructing from fragments. This argues for promoting a narrative summary to a first-class semantic record type, rather than forcing reconstruction from scattered episodic fragments every time.
- **OCD — doubt-and-recheck loops.** The OCD checking-and-doubt loop is re-verification under uncertainty. This argues for idempotency keys on episodic records, so a re-checked action is recognized as the same action rather than re-executed, and certainty does not require destructive repetition.

That is the profile-model half: distinct neurodivergent modes of cognition map to specific, falsifiable schema extensions (priority-weighted mandate state, governance check points, `domain_scope`, narrative-summary semantics, idempotency keys). None of these is new complexity; each removes an implicit assumption — that all mandates are equal, that a procedure generalizes everywhere, that memory is best stored as fragments, that a repeated action is a new one — that was never justified and only held by luck.

The design-stance half is the stronger claim. When you build only for the neurotypical compensatory profile, you build a system whose failure modes are invisible to you and constant for a significant share of users. Neurodivergent profiles are not edge cases to accommodate after the fact; they are the test that reveals whether the governance architecture is real or performative. An agent that cannot handle ADHD-equivalent gating failures is the same class of problem as an application that cannot handle ADHD-equivalent attention in a person. Designing the substrate against these profiles is how its implicit assumptions are made explicit and fixed before they ship. A fuller treatment is the subject of a separate paper on neuro-inclusive design.

## 14. Summary

Agent frameworks make agents act. Agency Protocol makes those actions governable, and it does so because governance requires a persistent subject to govern. It implements that subject with eleven composable primitives over a shared scalar layer, a strict no-direct-writes memory lifecycle, structural-shape-with-runtime-value-space design, JSON Schema as the single source of truth, generated projections checked for drift, and a conformance harness that turns the contract into a test. The primitives are the machinery; operational personhood is the point.

Identity tells you who acted. Governance tells you whether they should have. Agent frameworks create actions; Agency Protocol creates accountability. Without governance, an agent is software. With governance, it becomes a participant in an institution — a persistent subject, and a governed action is the verifiable fact that subject leaves behind.

## Appendix A: v0.0.1 entity reference

| Entity | Role in the chain |
| --- | --- |
| Principal | The governed party |
| PrincipalProfile | Intent and context envelope |
| AgencyExpression | Scoped authority, with lifecycle and lineage |
| DelegatedTrust | Bounded grant: allowed/prohibited/approval/revocation |
| AgencyFrame | Tracked objective and risk level |
| AcknowledgementEvent | Consent: activate/reject/modify an expression |
| AgencyEvent | Immutable audit spine |
| OutcomeEvidence | Action, assumptions, human approval authority |
| MemoryRecord | Governed memory: functionalType + memoryType |
| TraitCandidate | Proposed principal traits |
| ContextPack | Deterministic context handed to the agent |

## Appendix B: shared scalar reference

`PrincipalId` (`prn_<type>_<id>`), `PrincipalType` (`{person, organization, application, system}`), `Scope`, `TrustDomain`, `ProtocolAction`, `Confidence` (provenanced value in [0,1]), `ContextKey` (closed inheritable-block enum), `RevocationRule` (closed condition enum), `DelegationLink`, `AgencyLineage`, `RevocationEvent`, `ValidationEvent`, `AuditBlock`.
