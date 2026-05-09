/**
 * Auto-generated TypeScript projection of an Agency Protocol JSON Schema.
 * Do not edit by hand. Regenerate via `npm run generate:projections`.
 */

/**
 * Namespaced identifier for a protocol principal. Format: prn_<type>_<id> where the type segment is a runtime-defined lowercase identifier and the id segment is alphanumeric with dashes or underscores. The protocol fixes the prefix and structural shape; the type-segment value space is not enumerated.
 */
export type PrincipalId = string;
/**
 * Kind of protocol principal. The v0 protocol enumerates four runtime-agnostic kinds: person (a natural person), organization (a collective legal or social entity, including businesses, charities, and households), application (a software product acting on behalf of a principal), and system (an autonomous infrastructure actor). Verticals such as commerce or clinical practice are runtime concerns expressed via PrincipalProfile.attributes, not new principal kinds.
 */
export type PrincipalType = 'person' | 'organization' | 'application' | 'system';
/**
 * Closed enumeration of inheritable context blocks within a ContextPack. Non-inheritable execution fields (principal, objective, rawIntent) are not enumerated here.
 */
export type ContextKey =
  | 'principal_profile'
  | 'agency_expression'
  | 'delegated_trust'
  | 'recent_events'
  | 'relevant_memories'
  | 'current_state'
  | 'allowed_schemas'
  | 'risk_level';
/**
 * Identifier of a trust domain. Trust domains are runtime-defined: the protocol specifies the shape (a lowercase ASCII identifier starting with a letter, optionally containing digits or underscores), but does not enumerate the value space. Conforming runtimes MUST publish their own trust-domain registry as part of their conformance profile.
 */
export type TrustDomain = string;
/**
 * Identifier of an action a protocol-governed agent may take. Actions are runtime-defined: the protocol specifies the structural shape (a lowercase ASCII identifier starting with a letter, optionally containing digits or underscores), but does not enumerate the value space. Conforming runtimes MUST publish their own action registry as part of their conformance profile.
 */
export type ProtocolAction = string;
/**
 * Closed enumeration of conditions under which a delegation or agency expression is revoked.
 */
export type RevocationRule =
  | 'on_principal_request'
  | 'on_evidence_failure'
  | 'on_expiration'
  | 'on_scope_change'
  | 'on_boundary_violation';

/**
 * Runtime scoped context object. v0 assembly is deterministic; recentEvents is bounded (see proposal §10.1).
 */
export interface ContextPack {
  principal: Principal;
  principalProfile?: PrincipalProfile;
  activeAgencyExpressions: AgencyExpression[];
  objective: string;
  rawIntent?: string;
  /**
   * @maxItems 100
   */
  recentEvents: AgencyEvent[];
  /**
   * @maxItems 50
   */
  relevantMemories: MemoryRecord[];
  activeTrust: DelegatedTrust[];
  currentState: {
    [k: string]: unknown | undefined;
  };
  allowedSchemas: {
    [k: string]: unknown | undefined;
  };
  riskLevel: 'low' | 'medium' | 'high';
}
/**
 * A protocol principal. The party whose agency is governed.
 */
export interface Principal {
  id: PrincipalId;
  type: PrincipalType;
  name?: string;
  audit: AuditBlock;
}
/**
 * Cross-cutting audit block embedded in protocol entities. v0 requires createdAt and createdBy; delegationChain, revocationHistory, and validationEvents are forward-compatible stubs formally specified in v0.1.
 */
export interface AuditBlock {
  createdAt: string;
  createdBy: {
    actorType: 'principal' | 'user' | 'system' | 'agent';
    actorId: string;
  };
  modifiedAt?: string;
  delegationChain?: {}[];
  revocationHistory?: {}[];
  validationEvents?: {}[];
}
/**
 * Structured representation of principal intent and context. Domain-specific implementations (e.g. BusinessProfile) are runtime concerns.
 */
export interface PrincipalProfile {
  id: string;
  principalId: PrincipalId;
  principalType: PrincipalType;
  profileType: PrincipalType;
  attributes: {
    [k: string]: unknown | undefined;
  };
  confidence: Confidence;
  evidenceEventIds: string[];
  audit: AuditBlock;
}
/**
 * Calibrated confidence value with provenance. value is bounded to the closed interval [0, 1].
 */
export interface Confidence {
  value: number;
  producer: 'model' | 'heuristic' | 'principal_assertion' | 'derived' | 'human_review';
  method?: string;
  calibrated: boolean;
}
/**
 * A scoped expression of agency held by a principal. v0 uses status values proposed/acknowledged/active/rejected/revoked.
 */
export interface AgencyExpression {
  id: string;
  principalId: PrincipalId;
  principalType: PrincipalType;
  scope: Scope;
  agencyType: string;
  domainOfConcern: string;
  origin: {
    source: 'explicit' | 'inferred_from_events' | 'inferred_from_profile' | 'system_default';
    evidenceEventIds: string[];
  };
  parentAgencyExpressionId?: string;
  lineage?: AgencyLineage;
  inheritedContextKeys: ContextKey[];
  delegatedTrustId?: string;
  status: 'inferred' | 'proposed' | 'acknowledged' | 'active' | 'paused' | 'rejected' | 'revoked';
  confidence: Confidence;
  audit: AuditBlock;
}
/**
 * Bounded scope object identifying the boundary within which an agency expression or protocol record applies. Scope types are runtime-defined: the protocol specifies the structural shape (a lowercase ASCII identifier starting with a letter, optionally containing digits or underscores), but does not enumerate the value space. Conforming runtimes MUST publish their own scope-type registry as part of their conformance profile.
 */
export interface Scope {
  type: string;
  id: string;
}
/**
 * Lineage metadata linking an AgencyExpression to its root and parent expressions, plus its delegation chain. Forward-compatible stub formally specified in v0.1.
 */
export interface AgencyLineage {
  rootAgencyExpressionId?: string;
  parentAgencyExpressionId?: string;
  delegationChain: DelegationLink[];
}
/**
 * One link in a delegation chain. Forward-compatible stub formally specified in v0.1.
 */
export interface DelegationLink {
  fromPrincipalId?: string;
  fromAgencyExpressionId?: string;
  toAgencyExpressionId?: string;
  delegatedTrustId?: string;
  grantedAt: string;
  grantedBy: {
    actorType: 'principal' | 'user' | 'system' | 'agent';
    actorId: string;
  };
}
/**
 * An immutable event observed, inferred, approved, or executed within a scope. eventType must be namespaced as <trust_domain>.<noun>.<verb> (e.g. core.profile.extracted), where the trust-domain segment is runtime-defined.
 */
export interface AgencyEvent {
  eventId: string;
  principalId: PrincipalId;
  principalType: PrincipalType;
  scope: Scope;
  agencyExpressionId?: string;
  /**
   * Namespaced event type in the form <trust_domain>.<noun>.<verb>. The protocol enforces only the structural shape; the trust-domain segment is runtime-defined (see shared/trust-domain.schema.json).
   */
  eventType: string;
  source: string;
  actor: {
    type: 'principal' | 'user' | 'system' | 'agent';
    id?: string;
  };
  subject: {
    type: string;
    id?: string;
  };
  payload: {
    [k: string]: unknown | undefined;
  };
  evidenceLevel: 'observed' | 'inferred' | 'approved' | 'executed';
  importance: 'low' | 'medium' | 'high';
  correlationId?: string;
  causationId?: string;
  schemaVersion: string;
  occurredAt: string;
  audit: AuditBlock;
}
/**
 * A persisted memory associated with a principal. v0 captures both functionalType (behaviour) and memoryType (content). Consolidation is defined in v0.1.
 */
export interface MemoryRecord {
  id: string;
  principalId: PrincipalId;
  scope: Scope;
  functionalType: 'working' | 'episodic' | 'semantic' | 'procedural';
  memoryType: 'fact' | 'pattern' | 'preference';
  subjectType: string;
  subjectId?: string;
  statement: string;
  evidenceEventIds: string[];
  confidence: Confidence;
  observationCount: number;
  status: 'active' | 'stale' | 'corrected' | 'revoked';
  firstObservedAt: string;
  lastObservedAt: string;
  audit: AuditBlock;
}
/**
 * Bounded delegation of authority within a scope, with allowed/prohibited actions, automation level, and revocation rules. v0 defaults to draft_for_review for generated setup plans.
 */
export interface DelegatedTrust {
  id: string;
  principalId: PrincipalId;
  scope: Scope;
  agencyExpressionId?: string;
  domains: TrustDomain[];
  allowedActions: ProtocolAction[];
  prohibitedActions: ProtocolAction[];
  requiresApprovalFor: ProtocolAction[];
  automationLevel: 'suggest_only' | 'draft_for_review' | 'apply_after_confirmation' | 'auto_apply_within_limits';
  delegationChain: DelegationLink[];
  expiresAt?: string;
  revocationRules: RevocationRule[];
  audit: AuditBlock;
}
