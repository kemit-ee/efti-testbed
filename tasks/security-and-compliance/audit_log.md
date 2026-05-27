# EPIC 28 — Audit Log

## Changes

- _Initial state._

> Part of [Theme 7 — Security & Compliance](README.md). v0.2 anchors: §12.

<!-- issue-body:begin -->

**AS AN** operator
**I WANT** one immutable audit log capturing every consequential event
**SO THAT** disputes can be resolved, compliance met, and incidents reconstructed.

**Open:** retention floor + partner-extension rules.

## Acceptance Criteria

### Events captured
- [ ] **Partner record** (E2): verification, suspension, revocation, re-verification.
- [ ] **Access key** (E2): issuance, rotation, suspension, revocation, plus failed-authn outcomes (E3).
- [ ] **Tier** (E4): definition changes, partner assignment changes.
- [ ] **Env** (E5, E8): state transitions; counterparty bindings at provisioning (E17).
- [ ] **Image** (E9, E10): declaration, pull failure, scan outcome, manual re-scan, block-causing termination.
- [ ] **Identity material** (E7): per-env minting, destruction at delete. Private keys are referenced, not logged.
- [ ] **Marketplace** (E16, E17, E18): cert request/run/verdict/supersession/revocation; listing opt-in/pause/retract/select-into-env/removal-for-cause.
- [ ] **Test runs** (E19, E20): start, stop, verdict, partial-due-to-stop, infrastructure-flake annotations.
- [ ] **Reports** (E21, E22): generation, supersession, share-link create/access/revoke, signing-key rotation.
- [ ] **Operator actions** (E24): every console action → entry with operator id + target + change + justification.

### Entry shape
- [ ] Each entry: event id, UTC timestamp, category, source (partner / operator / orchestrator / scheduler), source identity (partner id + key fingerprint, or operator id), target (kind + id), before/after where applicable, free-text justification where applicable.
- [ ] No raw secrets in payloads — fingerprints / references only.
- [ ] Timestamps monotonic per process, synchronised across nodes within documented skew bound.

### Tamper evidence
- [ ] Append-only at storage level; no application path edits or deletes past entries.
- [ ] Periodic integrity checkpoints (signed digests over ranges) detect undetected tampering; failures alert immediately.
- [ ] Retention purges are themselves logged in a separate retention-action log — gaps are always explainable.

### Retention
- [ ] Configurable per category; documented minimum for security-sensitive ones (key actions, image blocks, removal-for-cause).
- [ ] Partner may request extended retention on their resources; operator approves per policy.

### Query and export
- [ ] Operators query by category / source / target / time-range via operator console (E24) + API.
- [ ] Partner queries a partner-scoped projection of their own resources.
- [ ] Exports preserve event ordering and integrity-checkpoint coverage.

### Access control
- [ ] Operator audit access is itself audit-logged — no silent privileged reads.

<!-- issue-body:end -->
