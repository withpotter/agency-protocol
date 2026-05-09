/**
 * Auto-generated TypeScript projection of an Agency Protocol JSON Schema.
 * Do not edit by hand. Regenerate via `npm run generate:projections`.
 */

/**
 * Lineage metadata linking an AgencyExpression to its root and parent expressions, plus its delegation chain. Forward-compatible stub formally specified in v0.1.
 */
export interface AgencyLineage {
  rootAgencyExpressionId?: string;
  parentAgencyExpressionId?: string;
  delegationChain: DelegationLink[];
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
