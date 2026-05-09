/**
 * Auto-generated TypeScript projection of an Agency Protocol JSON Schema.
 * Do not edit by hand. Regenerate via `npm run generate:projections`.
 */

/**
 * Closed enumeration of conditions under which a delegation or agency expression is revoked.
 */
export type RevocationRule =
  | 'on_principal_request'
  | 'on_evidence_failure'
  | 'on_expiration'
  | 'on_scope_change'
  | 'on_boundary_violation';
