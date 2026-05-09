/**
 * Auto-generated TypeScript projection of an Agency Protocol JSON Schema.
 * Do not edit by hand. Regenerate via `npm run generate:projections`.
 */

/**
 * Bounded scope object identifying the boundary within which an agency expression or protocol record applies. Scope types are runtime-defined: the protocol specifies the structural shape (a lowercase ASCII identifier starting with a letter, optionally containing digits or underscores), but does not enumerate the value space. Conforming runtimes MUST publish their own scope-type registry as part of their conformance profile.
 */
export interface Scope {
  type: string;
  id: string;
}
