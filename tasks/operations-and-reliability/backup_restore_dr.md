# EPIC 27 — Backup, Restore & Disaster Recovery

## Changes

- _Initial state._

> Part of [Theme 6 — Operations & Reliability](README.md). v0.2 anchors: §11.

<!-- issue-body:begin -->

**AS AN** operator
**I WANT** documented backup, restore, and DR for the testbed's central state
**SO THAT** signed Reports, audit log, partner records, certifications, and marketplace state survive infrastructure / region failure and operator error.

**Open:** RPO / RTO targets per state class.

## Acceptance Criteria

### State inventory
- [ ] **Tier 0 — irrecoverable / legally retained**: signed Reports (E21/E22), audit log (E28), partner records (E2), certifications (E16), key material (E2, E22).
- [ ] **Tier 1 — slow-to-rebuild**: marketplace listings (E17/E18), version registry (E11), tier defs (E4), notification templates (E26).
- [ ] **Tier 2 — easily rebuilt**: cached partner images (E9); per-env runtime identity (E7) is ephemeral and not backed up.
- [ ] Per tier: RPO, RTO, retention, off-site policy.

### Backup
- [ ] Tier 0: continuous (or near-continuous) to off-cluster storage with off-region replication.
- [ ] Tier 1: scheduled at a cadence meeting its RPO.
- [ ] Tier 2: no backup obligation.
- [ ] Integrity-checked at write (checksum) and at periodic read-time scrub.
- [ ] Encryption-at-rest mandatory; encryption-key lifecycle distinct from data-key lifecycle.

### Restore
- [ ] Documented procedures per state class, including which other systems must be quiesced.
- [ ] Granular restore (single Report / single partner record) supported, not only full-system.
- [ ] Restored signed Reports still verify (E22).

### DR exercise
- [ ] Full DR exercise (rebuild into clean env from backups) ≥ annually.
- [ ] Partial-restore exercise (recent backups into staging) ≥ quarterly.
- [ ] Outcomes audit-logged (E28); findings feed procedure updates.

### Retention
- [ ] Retention per tier honours legal floors (Tier 0) + operational ceilings; both documented + operator-configurable.
- [ ] Backup destruction at retention expiry logged in a retention-action log (analogous to E28) — gaps always explainable.

### Failure detection
- [ ] Backup-job failure (missed window, integrity fail, replication lag) → notification via E26.
- [ ] Backup-job health surfaced in E25 metrics plane.

<!-- issue-body:end -->
