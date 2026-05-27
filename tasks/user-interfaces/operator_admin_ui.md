# EPIC 24 — Operator Admin UI

## Changes

- _Initial state._

> Part of [Theme 5 — User Interfaces](README.md). v0.2 anchors: §3.

<!-- issue-body:begin -->

**AS AN** operator
**I WANT** one console that surfaces testbed state and exposes every operator action
**SO THAT** day-to-day operation needs no raw orchestration APIs and decisions are consistent and auditable.

**Open:** frontend / dashboard tech stack.

## Acceptance Criteria

### Partner / tier / env views
- [ ] Per-partner: identity (E2), tier (E4), all keys with status, all envs with state, quota usage, recent partner-scoped audit slice.
- [ ] Per-tier: definition, partners assigned, aggregate usage.
- [ ] Per-env: full E5 inspection + operator-only fields (orchestrator resource ids, current consumption, recent logs).

### Marketplace view
- [ ] All certifications (E16): verdict + validity status.
- [ ] All marketplace opt-ins (E18): health, accepted terms version, bound-env count, recent removal/retract events.
- [ ] Per-listing drill-down to selecting envs (operator typically sees partner ids; anonymisation policy applies elsewhere).

### Operator actions

Exposed only via console + corresponding API:
- [ ] Partner verify / suspend / revoke (E2).
- [ ] Key issue / rotate / suspend / revoke (E2).
- [ ] Tier CRUD + partner assignment (E4).
- [ ] Idle / stop / reap parameter overrides (E8).
- [ ] Force image re-pull / re-scan (E9, E10).
- [ ] Version-axis CRUD, version status transitions, combination-rule changes (E11).
- [ ] Marketplace certification revocation (E16), listing removal-for-cause (E18).
- [ ] Signing-key rotation (E22).
- [ ] Retention policy edits + audit-log read/export (E28).
- [ ] Every action requires operator credential (E3); produces audit entry with operator identity + justification; reflected in console activity stream.

### Embedded metrics + audit
- [ ] Live metrics surface from E25 (health, SLOs, queue depths) — operators see state alongside the action to mitigate it.
- [ ] Audit-log query surface from E28 — pivot from partner-view to that partner's recent audit slice without leaving the console.

### Access control
- [ ] Operator authentication via E3; multiple operator roles (read-only / standard / privileged); role assignments audit-logged.
- [ ] No credential ever shown in plaintext after issuance.
- [ ] Reachable only via internal operator network + authenticated public ingress; never anonymous.

### Logs and traces
- [ ] Internal logs (orchestrator, scheduler, identity, etc.) filterable by env / partner / component / time. Operational retention distinct from audit retention.
- [ ] Distributed traces for env-provisioning, test-run-execution, report-generation; drill from slow SLO sample to trace.

<!-- issue-body:end -->
