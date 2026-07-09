/**
 * Auto-generated TypeScript projection of an Agency Protocol JSON Schema.
 * Do not edit by hand. Regenerate via `npm run generate:projections`.
 */

/**
 * A single piece of evidence justifying a proposal. The host reconstructs the signal→proposal chain from these; every proposal MUST carry at least one. Evidence types are domain-agnostic: `prompt` (a human or agent instruction), `metric` (a quantitative signal), `event` (a system event), `observation` (a derived fact), `reference` (a pointer to external data).
 */
export interface ProposalEvidence {
  type: 'prompt' | 'metric' | 'event' | 'observation' | 'reference';
  content: string;
  ref?: string;
}
