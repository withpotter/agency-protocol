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
