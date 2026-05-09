/**
 * Auto-generated TypeScript projection of an Agency Protocol JSON Schema.
 * Do not edit by hand. Regenerate via `npm run generate:projections`.
 */

/**
 * A typed record of a revocation. Forward-compatible stub formally specified in v0.1.
 */
export interface RevocationEvent {
  revokedAt: string;
  revokedBy: {
    actorType: 'principal' | 'user' | 'system' | 'agent';
    actorId: string;
  };
  reason: string;
  evidenceEventIds?: string[];
}
