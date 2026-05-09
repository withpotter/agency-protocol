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
 * An immutable event observed, inferred, approved, or executed within a scope. eventType must be namespaced as <TrustDomain>.<noun>.<verb> (e.g. onboarding.profile.extracted).
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
    type: 'principal' | 'user' | 'customer' | 'system' | 'agent';
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
 * Bounded scope object identifying the boundary within which an agency expression or protocol record applies.
 */
export interface Scope {
  type: 'tenant' | 'organization' | 'platform' | 'application';
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
