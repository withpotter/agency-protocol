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
 * Calibrated confidence value with provenance. value is bounded to the closed interval [0, 1].
 */
export interface Confidence {
  value: number;
  producer: 'model' | 'heuristic' | 'principal_assertion' | 'derived' | 'human_review';
  method?: string;
  calibrated: boolean;
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
