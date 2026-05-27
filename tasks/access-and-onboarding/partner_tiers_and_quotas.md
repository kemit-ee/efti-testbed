# EPIC 4 — Partner Tiers & Quota Model

## Changes

- _Initial state._

> Part of [Theme 1 — Access & Onboarding](README.md). v0.2 anchors: §6.3, §10.2.

<!-- issue-body:begin -->

**AS AN** operator
**I WANT** every partner to belong to a tier that governs how much of the testbed they can consume
**SO THAT** central resources are shared fairly, abuse is bounded, and partners with greater needs can be promoted without code change.

**Open:**

- **Tier model itself** — number of tiers, quota numbers per tier, who decides a partner's tier. The AC require the capability and consistency of enforcement, not the specific numbers.

## Acceptance Criteria

### Tier definition

- [ ] Tiers are defined as named records with: name, description, and a quota bundle (see below). Tiers are operator-managed, not partner-selectable.
- [ ] A partner has exactly one active tier at any time. Tier assignment is append-only — past tier assignments stay queryable.
- [ ] Tier promotion / demotion is an operator action; it cascades to all of the partner's access keys at the next quota evaluation.

### Quota dimensions

Quota dimensions per tier:

- [ ] **Concurrent envs** — maximum number of envs the partner may have in `running` or `idle` state simultaneously.
- [ ] **Total envs ever created in a rolling window** — to bound churn.
- [ ] **Per-env CPU, RAM, storage ceilings** — applied at provisioning, enforced at runtime (Theme 2, E6).
- [ ] **Image-pull bandwidth and storage cache share** — to bound registry traffic and cache footprint (Theme 2, E9).
- [ ] **Test-driver load ceiling** — maximum sustained RPS / concurrent virtual users in playground mode (Theme 4, E20).
- [ ] **Marketplace counterparty slots** — maximum number of long-running counterparty services the partner may operate (Theme 3, E18).

### Enforcement

- [ ] Every quota is enforced at the point of resource creation / acquisition, not after the fact.
- [ ] Quota-exceeded responses are uniform and machine-actionable: error code, dimension name, current usage, limit.
- [ ] Quota usage is queryable per partner per dimension via the self-service introspection endpoint (E3 AC).
- [ ] Tier change recomputes effective limits immediately; existing resources are **not** retroactively terminated for breaching the new (lower) limit — they are allowed to run until natural lifecycle end, but no new resource that would exceed the new limit may be created.

### Operator visibility

- [ ] The Operator Admin UI (Theme 5, E24) shows: each tier's definition, the partners assigned to each tier, and the current vs limit usage per dimension per partner.

### Auditability

- [ ] Every tier definition change is audit-logged with operator, before/after, and timestamp.
- [ ] Every tier assignment change for a partner is audit-logged with operator, partner, from-tier, to-tier, timestamp, and justification.

<!-- issue-body:end -->
