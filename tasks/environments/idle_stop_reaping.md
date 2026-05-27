# EPIC 8 — Idle Detection, Stop & Reaping

## Changes

- _Initial state._

> Part of [Theme 2 — Environments](README.md). v0.2 anchors: §5.

<!-- issue-body:begin -->

**AS AN** operator
**I WANT** envs that nobody is using to be stopped, and old envs to be deleted
**SO THAT** central resources are reclaimed and partners do not accumulate dormant envs that crowd out others.

**Open:**

- **Default durations** (4h idle / 7d delete) are v0.2's proposal; the AC make them configurable. Final numbers are an operator decision.
- **Notification mechanism** — email, webhook, in-portal banner. AC require notification, not a specific channel.

## Acceptance Criteria

### Idle detection

- [ ] An env is `running` while the orchestrator observes activity; `idle` after a period of no activity exceeding `idle_timeout`.
- [ ] "Activity" is defined explicitly: any inbound request to the partner's images, any test-driver execution against the env, any partner-initiated Portal action against the env. Activity from testbed scrapers (health, metrics) does **not** count.
- [ ] The activity definition is documented and stable — partners can reason about whether their workload qualifies.

### Stop on prolonged idle

- [ ] An `idle` env that exceeds `stop_timeout` transitions to `stopping`, then `deleted`.
- [ ] Before any state-changing transition, the partner is notified at least `notice_window` before the action (configurable, with a non-zero floor).
- [ ] A partner action against an `idle` env returns it to `running` immediately, cancelling pending stop and resetting the activity timer.

### Hard expiration on age

- [ ] Every env has a hard `expires_at` set at creation. On `expires_at` the env transitions to `stopping` regardless of activity.
- [ ] `expires_at` cannot be extended past tier-defined maximum env age; within that ceiling, a partner may extend their own env's `expires_at` an operator-defined number of times.
- [ ] At least two notifications are sent before `expires_at`: a "first warning" and a "final warning" (windows configurable).

### Reaping after delete

- [ ] All env state (DB, identity material, ephemeral filesystems, cached generated data) is purged within `reap_window` of entering `deleted` state.
- [ ] Reports produced during the env's lifetime (Theme 4) are explicitly preserved past reaping.
- [ ] A periodic reconciliation job detects orphaned resources (containers, volumes, certs) whose parent env is `deleted` and removes them. The job's findings are alerted on if non-zero.

### Operator overrides

- [ ] Operators can set per-tier or per-partner overrides for `idle_timeout`, `stop_timeout`, `expires_at` ceiling, `notice_window`, and `reap_window`.
- [ ] Overrides apply to new envs created after the override; existing envs continue under the parameters set at their creation. (Avoids retroactive shortening that surprises a partner.)

### Audit

- [ ] Every state transition driven by idle / expiration logic is audit-logged with: env id, the parameter that triggered it, the value at trigger time, and the timestamp.
- [ ] Every notification sent is audit-logged with env id, recipient, channel, timestamp.

<!-- issue-body:end -->
