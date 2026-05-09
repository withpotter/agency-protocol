/**
 * Auto-generated TypeScript projection of an Agency Protocol JSON Schema.
 * Do not edit by hand. Regenerate via `npm run generate:projections`.
 */

/**
 * Identifier of a trust domain. Trust domains are runtime-defined: the protocol specifies the shape (a lowercase ASCII identifier starting with a letter, optionally containing digits or underscores), but does not enumerate the value space. Conforming runtimes MUST publish their own trust-domain registry as part of their conformance profile.
 */
export type TrustDomain = string;
