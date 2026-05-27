# Theme 7 — Security & Compliance

## Changes

- _Initial state._

> Architecture: v0.2.

<!-- issue-body:begin -->


**Stakeholder question:** Is it safe and auditable?

**v0.2 anchors:** §12.

## Objective

Every consequential event is captured immutably and queryably — the substrate the rest of the architecture's "audit-logged" AC depend on. Runtime security primitives (sandboxing E10, isolation E6, env identity E7, report signing E22, supply-chain hygiene E30) live in their own themes as properties of those components, referenced from here but not duplicated.

## Theme done when

- [ ] [E28 — Audit Log](audit_log.md): every event categorised as audit-worthy is recorded with sufficient context, retained per policy, queryable by operators (and partners on partner-scoped projections), and tamper-evident.

<!-- issue-body:end -->
