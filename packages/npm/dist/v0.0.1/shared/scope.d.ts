/**
 * Auto-generated TypeScript projection of an Agency Protocol JSON Schema.
 * Do not edit by hand. Regenerate via `npm run generate:projections`.
 */

/**
 * Bounded scope object identifying the boundary within which an agency expression or protocol record applies.
 */
export interface Scope {
  type: 'tenant' | 'organization' | 'platform' | 'application';
  id: string;
}
