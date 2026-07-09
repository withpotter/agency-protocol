/**
 * Auto-generated TypeScript projection of an Agency Protocol JSON Schema.
 * Do not edit by hand. Regenerate via `npm run generate:projections`.
 */

/**
 * A governed proposal: an intelligence runtime proposes a change; the host runtime validates it against this schema plus its own permission/authority closure, a human (or policy) approves, and only then is it applied — with an append-only audit trail. Runtime proposes; host validates, persists, and applies. `kind` is a host-defined discriminator and `payload` is an opaque, host-owned object: the substrate carries the governance envelope (origin, evidence, risk, status lifecycle) and leaves the domain-specific payload shape to the host, which selects and validates it by `kind`.
 */
export interface Proposal {
  id: string;
  kind: string;
  subject?: string;
  origin: string;
  /**
   * @minItems 1
   */
  evidence: [ProposalEvidence, ...ProposalEvidence[]];
  risk: 'low' | 'medium' | 'high';
  /**
   * Opaque, host-defined change description. The substrate does not constrain its shape; the host validates it against a domain schema selected by `kind`.
   */
  payload: {};
  status: 'draft' | 'proposed' | 'approved' | 'applied' | 'rejected' | 'expired';
  createdAt: string;
  updatedAt: string;
}
/**
 * A single piece of evidence justifying a proposal. The host reconstructs the signal→proposal chain from these; every proposal MUST carry at least one. Evidence types are domain-agnostic: `prompt` (a human or agent instruction), `metric` (a quantitative signal), `event` (a system event), `observation` (a derived fact), `reference` (a pointer to external data).
 */
export interface ProposalEvidence {
  type: 'prompt' | 'metric' | 'event' | 'observation' | 'reference';
  content: string;
  ref?: string;
}
