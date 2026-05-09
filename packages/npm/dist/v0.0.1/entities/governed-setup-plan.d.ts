/**
 * Auto-generated TypeScript projection of an Agency Protocol JSON Schema.
 * Do not edit by hand. Regenerate via `npm run generate:projections`.
 */

/**
 * Namespaced identifier for a protocol principal. Format: prn_<type>_<id> where type is one of person, biz, org, app, sys.
 */
export type PrincipalId = string;

/**
 * Primary output of the v0 natural-language business setup scenario. A protocol-shaped plan, not a product mutation. Patches use RFC 7396 JSON Merge Patch and must validate against a domain schema before review or apply.
 */
export interface GovernedSetupPlan {
  id: string;
  principalId: PrincipalId;
  scope: Scope;
  principalProfileId: string;
  agencyExpressionId: string;
  agencyFrameId: string;
  delegatedTrustId: string;
  status: 'draft' | 'validated' | 'reviewed' | 'applied' | 'rejected' | 'expired';
  summary: string;
  patchFormat: 'merge_patch_rfc7396';
  settingsPatch: {
    [k: string]: unknown | undefined;
  };
  pageContentPatch: {
    [k: string]: unknown | undefined;
  };
  seoPatch: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
  };
  workflowGraph?: {
    [k: string]: unknown | undefined;
  };
  recommendedActions: {
    type: string;
    title: string;
    description?: string;
    requiresApproval: boolean;
    relatedSubject?: {
      type: string;
      id?: string;
    };
  }[];
  assumptions: string[];
  confidence: Confidence;
  generatedEventIds: string[];
  outcomeEvidenceId?: string;
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
