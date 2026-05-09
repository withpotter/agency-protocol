# Conformance harness

> **Status:** initial fixture-validation harness.

The harness is a portable test runner that takes a directory of objects and
asserts each validates (or fails to validate) against the appropriate schema.
Independent implementations of Agency Protocol use this harness against the
fixtures in [`../fixtures/`](../fixtures/) to claim conformance with this
specification version.

The current harness contract is implemented by
[`../../../scripts/validate-fixtures.sh`](../../../scripts/validate-fixtures.sh):
valid fixtures must pass their matching schema, and invalid fixtures must fail.
Golden lifecycle expectations, including memory projection, staleness, and
correction propagation, will be added as the conformance surface expands beyond
schema validation.
