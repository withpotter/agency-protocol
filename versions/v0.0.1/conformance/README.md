# Conformance harness

> **Status:** stub. The harness specification and golden fixtures land alongside
> the v0.0.1 schemas.

The harness is a portable test runner that takes a directory of objects and
asserts each validates (or fails to validate) against the appropriate schema.
Independent implementations of Agency Protocol use this harness against the
fixtures in [`../fixtures/`](../fixtures/) to claim conformance with this
specification version.

The runner specification will live in `runner-spec.md`. Expected outcomes for
each fixture live in [`golden/`](./golden/).
