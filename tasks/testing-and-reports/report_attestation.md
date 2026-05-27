# EPIC 22 — Report Signing, Attestation & Distribution

## Changes

- _Initial state._

> Part of [Theme 4 — Testing & Reports](README.md). v0.2 anchors: §11.

<!-- issue-body:begin -->

**AS A** verified partner
**I WANT** the testbed to sign my Reports verifiably and let me export them
**SO THAT** a third party can confirm "produced by this testbed" and "unaltered since".

**Open:** attestation model — whether signed Reports carry weight beyond provenance (governance, not architecture).

## Acceptance Criteria

### Signing
- [ ] Every Report signed with a long-lived testbed key whose public material is published at a well-known URL.
- [ ] Signature covers the full normalised Report; canonicalisation procedure documented so independents can verify.
- [ ] Algorithm + key id recorded in the Report — key rotation never breaks past Report verification.
- [ ] Signing key protected commensurate with attestation claim (HSM or equivalent).

### Verification
- [ ] Third party verifies using only: Report content, published keys, canonicalisation procedure. No testbed-specific tooling required.
- [ ] Verification docs published alongside the key; reference verifier (script / library) provided.

### Key lifecycle
- [ ] Keys rotated on documented cadence + on compromise.
- [ ] Old verification keys remain published indefinitely.
- [ ] Rotation audit-logged: timestamp, new key id, initiating operator.

### Distribution
- [ ] Partner exports: human-readable (HTML/PDF) + machine-readable canonical form (format TBD with attestation decision).
- [ ] Exports include signature, verification metadata, key-URL pointer.
- [ ] Exports honour the Report's anonymisation policy — no leakage beyond what the Report already permits.

### External share links
- [ ] Partner generates a share link for read-only third-party access without a testbed account. Revocable.
- [ ] Each link is individually audit-logged (creation, access, revocation).
- [ ] Share view shows verification status visibly.

### Tamper-evidence
- [ ] Post-generation modifications (E21 supersession) produce a new signed Report; original remains unaltered and verifiable.
- [ ] Record links to supersession chain — viewers always know if what they hold is current.

### Attestation semantics
- [ ] Signature attests at minimum: produced by this testbed instance, against this partner digest, at this tuple, on this date, using this suite version. Further endorsement (e.g. TG 2.5 evidence) is policy.
- [ ] Mechanism above supports any such policy without further architecture change.

<!-- issue-body:end -->
