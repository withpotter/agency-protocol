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
 * Structured representation of principal intent and context. Domain-specific implementations (e.g. BusinessProfile) are runtime concerns.
 */
export interface PrincipalProfile {
  id: string;
  principalId: PrincipalId;
  principalType: PrincipalType;
  profileType: 'business' | 'person' | 'organization' | 'application' | 'system';
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
