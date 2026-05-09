/**
 * Auto-generated TypeScript projection of an Agency Protocol JSON Schema.
 * Do not edit by hand. Regenerate via `npm run generate:projections`.
 */

/**
 * Namespaced identifier for a protocol principal. Format: prn_<type>_<id> where type is one of person, biz, org, app, sys.
 */
export type PrincipalId = string;

/**
 * Typed record that activates, rejects, or modifies a proposed agency expression.
 */
export interface AcknowledgementEvent {
  id: string;
  principalId: PrincipalId;
  scope: Scope;
  agencyExpressionId: string;
  decision: 'acknowledged' | 'rejected' | 'modified';
  method: 'ui_click' | 'api_call' | 'existing_delegated_trust';
  principalActor: {
    type: 'principal' | 'user' | 'system';
    id: string;
  };
  evidenceEventIds: string[];
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
