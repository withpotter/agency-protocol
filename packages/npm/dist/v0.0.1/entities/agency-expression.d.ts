/**
 * Auto-generated TypeScript projection of an Agency Protocol JSON Schema.
 * Do not edit by hand. Regenerate via `npm run generate:projections`.
 */

/**
 * Namespaced identifier for a protocol principal. Format: prn_<type>_<id> where type is one of person, biz, org, app, sys.
 */
export type PrincipalId = string;
/**
 * Closed enumeration of principal kinds.
 */
export type PrincipalType = 'person' | 'business' | 'organization' | 'application' | 'system';
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
 * Bounded scope object identifying the boundary within which an agency expression or protocol record applies.
 */
export interface Scope {
  type: 'tenant' | 'organization' | 'platform' | 'application';
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
