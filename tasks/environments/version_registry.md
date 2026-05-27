# EPIC 11 — Protocol-Version Registry & Combination Validation

## Changes

- _Initial state._

> Part of [Theme 2 — Environments](README.md). v0.2 anchors: §7.

<!-- issue-body:begin -->

**AS AN** operator
**I WANT** a first-class registry of versioned protocol axes and which combinations are valid
**SO THAT** envs are parameterised by an explicit tuple of version selections, illegal combinations are caught at creation time, and adding a new axis or version requires only a registry entry — not a code change.

**Open:**

- **XSD track priority** — architecture supports v1 and v2; which conformance suite ships first is an operator decision. This epic enables both regardless.

## Acceptance Criteria

### Axis model

- [ ] An **axis** is a named versioned dimension. Initial axes (minimum): `xsd`, `as4-profile`, `rest-api`, `edelivery-toolkit`. The registry supports adding more axes over time.
- [ ] An **axis version** is a record under an axis with: version label (e.g. `v1`, `v2`, `6.1.x`), human-readable description, reference document URL (regulation / spec / changelog), status (`active` / `deprecated` / `retired`), and the date the status was set.
- [ ] Axes and axis versions are operator-managed via the Operator Admin UI (Theme 5, E24) and a corresponding operator API.

### Valid-combinations declaration

- [ ] The registry knows which tuples of (axis, version) selections form valid combinations. Combinations may be declared explicitly, or by rule (e.g. "XSD v2 requires REST API ≥ 1.4").
- [ ] An invalid combination is rejected at env-validating with a specific error code naming the failing axis pair and the rule violated.
- [ ] A combination involving a `retired` version is rejected regardless. A combination involving a `deprecated` version is accepted with a warning in the env record and a corresponding flag on any Report produced.

### Env binding

- [ ] An env record stamps its full version-tuple at provisioning. The tuple is immutable for the env's lifetime.
- [ ] Inspection (Theme 2, E5) returns the tuple verbatim.

### Counterparty / suite compatibility (interface to E12)

- [ ] Marketplace Registry entries (Theme 3, E17) declare which (axis, version) tuples they support — possibly multiple per certified service. Discovery filters listings by the env's tuple intersected with each listing's supported tuples.
- [ ] Testbed mocks (Theme 3) declare the same. The pairing logic (E12) is uniform: mock or marketplace, same compatibility check.
- [ ] Prescribed conformance suites (Theme 4, E19) declare which (role, version-tuple) they cover. A certification request (Theme 3, E16) fails if no suite covers the requested combination.

### Lifecycle of an axis version

- [ ] Adding an axis version is operator-initiated. The version becomes selectable for new envs immediately.
- [ ] Marking a version `deprecated` blocks new certifications at that version (E16), still permits existing certifications and new envs (with the warning above).
- [ ] Marking a version `retired` blocks all new envs and counterparty pairings at that version; existing long-running counterparties at that version (E18) are gracefully delisted per operator policy.

### Audit

- [ ] Every axis-version status transition is audit-logged with operator, before/after, timestamp, justification.
- [ ] Every combination-rule change is audit-logged.

<!-- issue-body:end -->
