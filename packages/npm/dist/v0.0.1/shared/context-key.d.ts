/**
 * Auto-generated TypeScript projection of an Agency Protocol JSON Schema.
 * Do not edit by hand. Regenerate via `npm run generate:projections`.
 */

/**
 * Closed enumeration of inheritable context blocks within a ContextPack. Non-inheritable execution fields (principal, objective, rawIntent) are not enumerated here.
 */
export type ContextKey =
  | 'principal_profile'
  | 'agency_expression'
  | 'delegated_trust'
  | 'recent_events'
  | 'relevant_memories'
  | 'current_state'
  | 'allowed_schemas'
  | 'risk_level';
