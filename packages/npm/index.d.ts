// Re-export the latest Agency Protocol projection.
//
// Consumers import from this entry point:
//   import type { Principal, AgencyEvent } from '@withpotter/agency-protocol-types';
//
// To pin against an older version, import from the explicit dist path:
//   import type { Principal } from '@withpotter/agency-protocol-types/dist/v0.0.1';

export * from './dist/v0.0.1/index.js';
