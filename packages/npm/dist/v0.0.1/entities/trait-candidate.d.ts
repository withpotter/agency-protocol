/**
 * Auto-generated TypeScript projection of an Agency Protocol JSON Schema.
 * Do not edit by hand. Regenerate via `npm run generate:projections`.
 */

/**
 * Namespaced identifier for a protocol principal. Format: prn_<type>_<id> where the type segment is a runtime-defined lowercase identifier and the id segment is alphanumeric with dashes or underscores. The protocol fixes the prefix and structural shape; the type-segment value space is not enumerated.
 */
export type PrincipalId = string;
/**
 * Identifier of an action a protocol-governed agent may take. Actions are runtime-defined: the protocol specifies the structural shape (a lowercase ASCII identifier starting with a letter, optionally containing digits or underscores), but does not enumerate the value space. Conforming runtimes MUST publish their own action registry as part of their conformance profile.
 */
export type ProtocolAction = string;
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
 * Closed enumeration of conditions under which a delegation or agency expression is revoked.
 */
export type RevocationRule =
  | 'on_principal_request'
  | 'on_evidence_failure'
  | 'on_expiration'
  | 'on_scope_change'
  | 'on_boundary_violation';

/**
 * v0 representation of a captured/proposed trait. v0.1+ may promote validated candidates to full TraitPackage objects.
 */
export interface TraitCandidate {
  id: string;
  principalId: PrincipalId;
  scope: Scope;
  traitType: 'preference' | 'behavior_pattern' | 'operating_rule' | 'risk_boundary';
  statement: string;
  origin: 'expressed' | 'inferred' | 'discovered' | 'refined';
  triggerCondition?: {
    description: string;
    eventTypes?: string[];
  };
  decisionPattern?: {
    description: string;
    preferredActions?: ProtocolAction[];
  };
  authorityBoundary?: {
    allowedActions: ProtocolAction[];
    requiresApprovalFor: ProtocolAction[];
  };
  requiredContext?: ContextKey[];
  outcomeEvidence?: string[];
  failureCases?: string[];
  lineage?: AgencyLineage;
  revocationRule?: RevocationRule;
  evidenceEventIds: string[];
  confidence: Confidence;
  status: 'proposed' | 'acknowledged' | 'active' | 'corrected' | 'revoked';
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
