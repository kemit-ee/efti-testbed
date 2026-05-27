# EPIC 29 — API Standardisation (Portal / Orchestrator / Test Driver)

## Changes

- _Initial state._

> Part of [Theme 8 — Delivery & Documentation](README.md). v0.2 anchors: §3.

<!-- issue-body:begin -->

**AS A** verified partner integrating my own tooling against the testbed
**I WANT** every testbed API I depend on to follow consistent versioning, error semantics, pagination, and schema discoverability rules
**SO THAT** I can build durable integrations without surprises when the testbed evolves.

**Open:**

- **Specific spec format** (OpenAPI 3.x, gRPC + protobufs, AsyncAPI for streams, mix). AC require *some* machine-readable spec exists per surface; the choice is open.

## Acceptance Criteria

### Versioning

- [ ] Every API surface is versioned in the URL or equivalent transport-layer mechanism. Breaking changes ship in a new major version; the prior version is supported for a documented deprecation window.
- [ ] Each API surface publishes a CHANGELOG documenting breaking and non-breaking changes; a partner reading the changelog can know what they need to update.
- [ ] An API version's deprecation includes operator-side and partner-side notifications.

### Machine-readable specification

- [ ] Every API surface ships a machine-readable specification (OpenAPI / gRPC schemas / equivalent). The specification is the source of truth; documentation is generated from it.
- [ ] Schemas use stable, descriptive names; backward-incompatible renames within a major version are forbidden.
- [ ] A partner can fetch the specification from a well-known URL without authentication for public read-only surfaces, and with authentication for partner-scoped surfaces.

### Error semantics

- [ ] All errors carry: a stable machine-readable error code (from a catalogued enum), HTTP status (or transport equivalent), a human-readable message, and a structured details object.
- [ ] Error codes are catalogued in a single file maintained alongside the specification. Every code in use in code is present in the catalogue.
- [ ] Error responses never leak internal implementation details (stack traces, internal IDs, dependency error messages).
- [ ] Authn / authz failures use a consistent set of codes per E3.

### Pagination, filtering, sorting

- [ ] List endpoints use cursor-based pagination consistently. Page-number pagination is not used.
- [ ] Documented filter and sort parameters are supported where listing makes them useful (envs by state, reports by date range, etc.).

### Idempotency

- [ ] Mutation endpoints support idempotency keys where the operation is naturally idempotent (env-create, certification-request) so partners can retry safely.

### Documentation

- [ ] Generated reference documentation is published alongside the spec and stays in sync (no hand-maintained drift).
- [ ] Each endpoint's documentation includes: purpose, request/response schemas, error codes, examples, related epics.

### Stability commitments

- [ ] A documented stability tier per surface: experimental / beta / stable. Stable surfaces honour the deprecation window; experimental surfaces explicitly may change without it.
- [ ] No partner-facing surface is in `experimental` past v1.0 of the testbed; everything partners are expected to integrate with is `stable` by then.

<!-- issue-body:end -->
