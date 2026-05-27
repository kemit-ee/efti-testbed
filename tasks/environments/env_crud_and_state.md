# EPIC 5 — Env CRUD & State Machine

## Changes

- _Initial state._

> Part of [Theme 2 — Environments](README.md). v0.2 anchors: §3 (system overview), §5 (state machine).

<!-- issue-body:begin -->

**AS A** verified partner
**I WANT** to create, inspect, stop, and delete envs through the Portal
**SO THAT** I can spin up an isolated env containing my Docker image, with the testbed filling in the counterparties I am not playing.

**Open:**

- **Tech stack** — orchestration platform (k8s, Nomad, other). AC bind on contract and behaviour, not on the runtime.

## Acceptance Criteria

### Env declaration

- [ ] An env-create request carries: one partner image reference (with role hint), version-matrix selections (Theme 2), per-role counterparty preferences (Theme 3, certified-or-mock), optional non-default lifecycle parameters (within tier limits).
- [ ] The request is validated synchronously for: tier-quota fit, version-matrix combination legality, image-reference parseability, counterparty availability. Failures return a specific error code naming the failing dimension.
- [ ] A validated request transitions to the asynchronous lifecycle (state machine below).

### State machine

The env state machine implements v0.2 §5 exactly:

- [ ] States: `requested` → `validating` → (`rejected` | `provisioning`) → `running` ↔ `idle` → `stopping` → `deleted`.
- [ ] Forward transitions are append-only — historical states stay queryable.
- [ ] Every transition produces an audit-log entry with: env id, from-state, to-state, trigger (partner action / orchestrator / scheduled job), timestamp.
- [ ] `rejected` carries a reason code and free-text explanation; the env is otherwise frozen and cleaned up.
- [ ] Transitions out of `running` are idempotent — duplicate stop / delete requests do not double-fire.

### Inspection

- [ ] A partner can read the full state of their env: current state, the image and its actual digest, all counterparty bindings (and whether each is a certified marketplace service or a testbed mock), version-matrix selections, lifecycle parameters and remaining budgets (time-to-idle, time-to-delete), resource usage vs limits.
- [ ] Inspection is read-only — it never mutates state and never blocks running envs.

### Partner-initiated stop and delete

- [ ] Stop transitions `running` / `idle` → `stopping` → `deleted` per the state machine. The partner may request an immediate stop or schedule one.
- [ ] Delete from any state purges all env state (DB, runtime identity material per E7, cached generated data) after a configurable grace window.
- [ ] Reports produced during the env's lifetime (Theme 4) survive deletion and remain attributable to the partner.

### Concurrency and quotas

- [ ] Env-create is rejected if it would breach the partner's concurrent-env quota (Theme 1, E4).
- [ ] Env-create is rejected if any single image declared exceeds per-image limits enforced in Theme 2 (E9).

### Error semantics

- [ ] All errors are machine-actionable: stable error code + structured payload + human-readable message.
- [ ] No env-create call is allowed to leak the existence of other partners' envs.

<!-- issue-body:end -->
