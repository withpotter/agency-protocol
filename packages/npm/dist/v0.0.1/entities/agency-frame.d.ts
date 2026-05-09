/**
 * Auto-generated TypeScript projection of an Agency Protocol JSON Schema.
 * Do not edit by hand. Regenerate via `npm run generate:projections`.
 */

/**
 * Namespaced identifier for a protocol principal. Format: prn_<type>_<id> where the type segment is a runtime-defined lowercase identifier and the id segment is alphanumeric with dashes or underscores. The protocol fixes the prefix and structural shape; the type-segment value space is not enumerated.
 */
export type PrincipalId = string;

/**
 * First-class object grouping a specific objective pursued by one or more agency expressions.
 */
export interface AgencyFrame {
  id: string;
  principalId: PrincipalId;
  scope: Scope;
  agencyExpressionId?: string;
  objective: string;
  goal: string;
  riskLevel: 'low' | 'medium' | 'high';
  status: 'draft' | 'active' | 'completed' | 'revoked';
  createdFromEventId?: string;
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
