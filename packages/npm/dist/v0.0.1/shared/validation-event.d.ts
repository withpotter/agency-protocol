/**
 * Auto-generated TypeScript projection of an Agency Protocol JSON Schema.
 * Do not edit by hand. Regenerate via `npm run generate:projections`.
 */

/**
 * A typed record of a machine validation step against a protocol entity or patch.
 */
export interface ValidationEvent {
  validatedAt: string;
  validator: string;
  status: 'passed' | 'failed';
  message?: string;
}
