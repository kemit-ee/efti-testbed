# EPIC 16 — Quality Gate (Service Certification)

## Changes

- _Initial state._

> Part of [Theme 3 — Counterparties](README.md). v0.2 anchors: §6.

<!-- issue-body:begin -->

**AS A** verified partner whose service has been tested
**I WANT** a durable "certified" attestation from passing the prescribed suite at a specific version
**SO THAT** I can opt my service into the marketplace as a counterparty for other partners.

**Open:** specific suite content per (role × tuple) — separate work item (E19).

## Acceptance Criteria

### Trigger
- [ ] Partner explicitly requests certification of (digest, role, tuple). Never automatic.
- [ ] Testbed provisions a dedicated env, runs the prescribed suite (E19) against the image, produces a Report (E21).
- [ ] The Report's overall pass/fail is the verdict.

### Certified record
A record carries: digest (`host/name@sha256:...`), role (`gate`/`platform`/`aap`), full tuple, Report id, timestamp + orchestrator version, owning partner id.

### Validity scope
- [ ] Valid for exactly that digest at exactly that tuple. New digest = new certification.
- [ ] No auto-extension to neighbouring tuples (a Gate at AS4 6.x is not implicitly at 7.x).
- [ ] No built-in expiry; operator may configure a max-age policy that downgrades stale certs to "expired".

### Re-certification
- [ ] Re-certify same digest if suite changed: new Report supersedes, old retained for audit and flagged superseded.
- [ ] Two digests of the same service can be certified concurrently (side-by-side rollout).

### Revocation
- [ ] Operator revocation: audit-logged with operator, justification, timestamp.
- [ ] Revoked → ineligible for marketplace listing; if listed (E17), delisted (E18).

### Visibility
- [ ] Partner sees own certifications (active / superseded / revoked / expired).
- [ ] Others discover only through Marketplace Registry (E17) with restricted projection.

### Audit
- [ ] Every cert event (request, run, verdict, supersession, revocation, expiry) audit-logged with ids + timestamps.

<!-- issue-body:end -->
