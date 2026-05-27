# EPIC 2 — Access-Key Issuance & Partner Verification

## Changes

- _Initial state._

> Part of [Theme 1 — Access & Onboarding](README.md). v0.2 anchors: §1 principle 7, §9.1.

<!-- issue-body:begin -->

**AS AN** operator
**I WANT** to issue, rotate, suspend, and revoke access keys tied to verified partner records
**SO THAT** only verified eFTI participants can use the testbed and misuse can be cut off without disrupting other partners.

**Open:**

- **Verification criteria** — who counts as a "verified partner" (MS designation, WG membership, contract, mix). Until decided, the AC require the *capability* to record the criterion that was used, not a specific criterion.

## Acceptance Criteria

### Partner record

- [ ] A partner record carries at minimum: legal name, primary contact email, ISO-3166 country code, the verification criterion satisfied (free-text + selectable taxonomy), the date of verification, and the operator who verified.
- [ ] A partner record can be in one of: `verified`, `suspended`, `revoked`. State transitions are append-only — past states stay queryable.

### Access-key issuance

- [ ] An access key is bound to exactly one partner record.
- [ ] A partner may hold multiple concurrent access keys (e.g. one per environment / team) — each one independently rotatable, suspendable, revocable.
- [ ] Key material is generated server-side with sufficient entropy (≥128 bits); the secret is shown to the partner exactly once at issuance and is never recoverable afterward.
- [ ] Issuance produces an audit-log entry: `{operator, partner_id, key_id, tier_at_issuance, timestamp}`.

### Rotation, suspension, revocation

- [ ] Rotation produces a new key while leaving the old key valid for a configurable grace window (default `0` — no overlap).
- [ ] Suspension makes the key fail authentication but preserves it (and the partner's envs) for later reactivation.
- [ ] Revocation is terminal: the key cannot be reactivated; any envs running under it are stopped per Theme 2 rules.
- [ ] Suspension of a partner record cascades to suspending all their access keys.
- [ ] Revocation of a partner record cascades to revoking all their access keys.

### Verification audit

- [ ] Every change to a partner record's verification state (verify, suspend, revoke, re-verify) is recorded with the operator's identity, timestamp, and a free-text justification.
- [ ] Verification records are retained per the audit-retention policy (Theme 7, E28).

### Operator API and UI

- [ ] All issuance / rotation / suspension / revocation operations are exposed through both an operator API (machine-callable) and the Operator Admin UI (Theme 5, E24).
- [ ] No partner-facing endpoint can issue, rotate, suspend, or revoke an access key — those are operator-only.

<!-- issue-body:end -->
