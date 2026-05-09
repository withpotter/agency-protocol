# v0.0.1

Initial Agency Protocol substrate: schemas, fixtures, and conformance harness.

Schema files live in [`schemas/`](./schemas/), fixtures in [`fixtures/`](./fixtures/),
and the portable conformance harness notes live in [`conformance/`](./conformance/).

The schemas in this directory are canonical for v0.0.1. Runtime projections are
generated from these schemas and published from the repository-level
[`packages/`](../../packages/) directory.

Lifecycle rules that are not directly expressible as JSON Schema, including
memory projection, staleness, ownership, and correction propagation, are
documented in the repository-level [`SPEC.md`](../../SPEC.md).
