/**
 * Auto-generated TypeScript projection of an Agency Protocol JSON Schema.
 * Do not edit by hand. Regenerate via `npm run generate:projections`.
 */

/**
 * Namespaced identifier for a protocol principal. Format: prn_<type>_<id> where type is one of person, biz, org, app, sys.
 */
export type PrincipalId = string;

/**
 * Evidence of an outcome produced under an agency expression or frame. When AgencyEvent.evidenceLevel is 'approved', the related OutcomeEvidence.humanApprovalStatus is authoritative.
 */
export interface OutcomeEvidence {
  id: string;
  principalId: PrincipalId;
  scope: Scope;
  agencyExpressionId?: string;
  agencyFrameId?: string;
  eventIds: string[];
  action: string;
  contextUsed: string[];
  assumptions: string[];
  confidence: Confidence;
  humanApprovalStatus: 'pending' | 'approved' | 'edited' | 'rejected' | 'not_required';
  resultSummary: string;
  payload: {
    [k: string]: unknown | undefined;
  };
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
