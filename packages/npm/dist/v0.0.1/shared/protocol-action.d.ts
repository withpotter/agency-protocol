/**
 * Auto-generated TypeScript projection of an Agency Protocol JSON Schema.
 * Do not edit by hand. Regenerate via `npm run generate:projections`.
 */

/**
 * Identifier of an action a protocol-governed agent may take. Actions are runtime-defined: the protocol specifies the structural shape (a lowercase ASCII identifier starting with a letter, optionally containing digits or underscores), but does not enumerate the value space. Conforming runtimes MUST publish their own action registry as part of their conformance profile.
 */
export type ProtocolAction = string;
