# EPIC 26 — Notification Substrate

## Changes

- _Initial state._

> Part of [Theme 6 — Operations & Reliability](README.md). v0.2 anchors: §5, §6, §11.

<!-- issue-body:begin -->

**AS AN** operator
**I WANT** one substrate that delivers partner- and operator-facing notifications across supported channels
**SO THAT** every "is notified" / "are alerted" reference across other epics resolves to one mechanism, not three half-built ones.

**Open:** concrete channel set beyond the in-Portal + email baseline.

## Acceptance Criteria

### Required notifications
- [ ] **Partner-facing**: idle-stop warnings (E8), expiry warnings (E8), terms re-acceptance (E18), marketplace pause/retract ack (E18), certification verdict (E16), report ready (E21), report share-link access (E22), tier change (E4), key-rotation reminder (E2).
- [ ] **Operator-facing**: SLO breach alerts (E25), capacity warnings (E25), image-scan block decisions (E10), marketplace removal-for-cause (E18), audit-integrity failures (E28), DR-job failures (E27), edge-anomaly alerts (E25).
- [ ] New notification types from future epics need a template registration — no new code paths.

### Channel abstraction
- [ ] Published once; substrate fans out to each channel the recipient opted into (or operator policy requires).
- [ ] v1 channels: in-Portal centre (per E23 / E24) + email.
- [ ] New channel (webhook, chat, SMS) = config + templates, not a per-type rewrite.
- [ ] Per-recipient channel prefs managed via E23 (partner) / E24 (operator).

### Delivery
- [ ] **At-least-once** with idempotency keys for receiver dedup.
- [ ] Transient-failure retry with exponential backoff + documented max-retry.
- [ ] Hard failures logged + surfaced to operators; never silently dropped after retry exhaustion.

### Templates and localisation
- [ ] Parameterised templates carrying subject/title, body, severity, locale.
- [ ] Versioned; changes don't affect already-queued notifications.
- [ ] Locale fallback → English.

### Audit
- [ ] Every dispatch audit-logged (E28): notification id, type, recipient, channel, outcome, timestamp.
- [ ] In-Portal read/unread tracked; read events go to E25 metrics surface, not the audit log.

### Quota / abuse
- [ ] Per-recipient per-channel rate limits prevent loops and runaway alerting.
- [ ] Digest aggregation for high-frequency types (e.g. health flapping).

### Critical paths
- [ ] Lifecycle warnings (idle, expiry, terms re-accept, cert revocation) MUST reach the partner before the action, with documented per-type lead time. Failure to deliver within the window MUST defer the action.

<!-- issue-body:end -->
