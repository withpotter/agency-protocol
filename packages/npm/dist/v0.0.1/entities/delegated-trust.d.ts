/**
 * Auto-generated TypeScript projection of an Agency Protocol JSON Schema.
 * Do not edit by hand. Regenerate via `npm run generate:projections`.
 */

/**
 * Namespaced identifier for a protocol principal. Format: prn_<type>_<id> where type is one of person, biz, org, app, sys.
 */
export type PrincipalId = string;
/**
 * Identifier of a trust domain. Trust domains are runtime-defined: the protocol specifies the shape (a lowercase ASCII identifier starting with a letter, optionally containing digits or underscores), but does not enumerate the value space. Conforming runtimes MUST publish their own trust-domain registry as part of their conformance profile.
 */
export type TrustDomain = string;
/**
 * Closed enumeration of actions a protocol-governed agent may take. v0 set; additions are minor-version changes.
 */
export type ProtocolAction =
  | 'draft_content'
  | 'update_settings'
  | 'create_draft'
  | 'publish'
  | 'send_message'
  | 'charge'
  | 'refund'
  | 'apply_discount'
  | 'contact_external'
  | 'delete_record';
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
 * Bounded delegation of authority within a scope, with allowed/prohibited actions, automation level, and revocation rules. v0 defaults to draft_for_review for generated setup plans.
 */
export interface DelegatedTrust {
  id: string;
  principalId: PrincipalId;
  scope: Scope;
  agencyExpressionId?: string;
  domains: TrustDomain[];
  allowedActions: ProtocolAction[];
  prohibitedActions: ProtocolAction[];
  requiresApprovalFor: ProtocolAction[];
  automationLevel: 'suggest_only' | 'draft_for_review' | 'apply_after_confirmation' | 'auto_apply_within_limits';
  delegationChain: DelegationLink[];
  expiresAt?: string;
  revocationRules: RevocationRule[];
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
