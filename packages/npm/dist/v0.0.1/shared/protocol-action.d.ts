/**
 * Auto-generated TypeScript projection of an Agency Protocol JSON Schema.
 * Do not edit by hand. Regenerate via `npm run generate:projections`.
 */

/**
 * Closed enumeration of actions a protocol-governed agent may take. v0 set; additions are minor-version changes.
 */
export type ProtocolAction =
  | 'draft_content'
  | 'update_settings'
  | 'create_draft'
  | 'publish'
  | 'send_message'
  | 'charge'
  | 'refund'
  | 'apply_discount'
  | 'contact_external'
  | 'delete_record';
