/**
 * Auto-generated TypeScript projection of an Agency Protocol JSON Schema.
 * Do not edit by hand. Regenerate via `npm run generate:projections`.
 */

/**
 * Namespaced identifier for a protocol principal. Format: prn_<type>_<id> where type is one of person, biz, org, app, sys.
 */
export type PrincipalId = string;

/**
 * A persisted memory associated with a principal. v0 captures both functionalType (behaviour) and memoryType (content). Consolidation is defined in v0.1.
 */
export interface MemoryRecord {
  id: string;
  principalId: PrincipalId;
  scope: Scope;
  functionalType: 'working' | 'episodic' | 'semantic' | 'procedural';
  memoryType: 'fact' | 'pattern' | 'preference' | 'risk' | 'milestone';
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
