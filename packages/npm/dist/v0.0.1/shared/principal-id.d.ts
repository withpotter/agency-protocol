/**
 * Auto-generated TypeScript projection of an Agency Protocol JSON Schema.
 * Do not edit by hand. Regenerate via `npm run generate:projections`.
 */

/**
 * Namespaced identifier for a protocol principal. Format: prn_<type>_<id> where the type segment is a runtime-defined lowercase identifier and the id segment is alphanumeric with dashes or underscores. The protocol fixes the prefix and structural shape; the type-segment value space is not enumerated.
 */
export type PrincipalId = string;
