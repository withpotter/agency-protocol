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
