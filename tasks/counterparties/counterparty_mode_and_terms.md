# EPIC 18 — Long-Running Counterparty Mode & Terms

## Changes

- _Initial state._

> Part of [Theme 3 — Counterparties](README.md). v0.2 anchors: §6.1 (opt-in + terms), §10.3 (long-running mode).

<!-- issue-body:begin -->

**AS A** verified partner whose service has been certified
**I WANT** clear runtime obligations when I opt in to marketplace listing, and a mechanism to honour them
**SO THAT** my service contributes usefully to other partners' tests without surprising me with implicit commitments.

**Open:**

- **Marketplace counterparty terms** content: uptime expectation, data-retention prohibition, opt-out mechanism, removal-for-cause process. AC require terms exist and are versioned and accepted before listing; specific term content is operator-decided.

## Acceptance Criteria

### Opt-in flow

- [ ] A partner cannot opt in for a service that is not currently certified (E16).
- [ ] Opt-in requires the partner to accept the current version of the Marketplace Counterparty Terms. The accepted terms version is recorded with the opt-in.
- [ ] Opt-in starts a long-running counterparty deployment: the orchestrator provisions a dedicated "service-host env" (similar to a normal env, but role: counterparty-host, and lifecycle: long-running rather than 4h-idle / 7d-delete).
- [ ] The counterparty's resource consumption counts against the partner's tier (Theme 1, E4) — concurrent marketplace counterparty slots is a tier dimension.

### Runtime obligations (enforced by the testbed where mechanical, surfaced where not)

- [ ] **No-data-retention**: the counterparty's storage is the testbed's, not the partner's. Any state the service writes lives in testbed-managed storage that is purged when the listing ends. The partner does not, and cannot, export request payloads from selecting envs.
- [ ] **No cross-selection inference**: the counterparty's runtime cannot identify which selecting env or which selecting partner is currently driving it, beyond what the protocol itself exposes (e.g. AS4 cert subjects). Anonymisation policy (E17) governs what is exposed.
- [ ] **Uptime expectation**: the partner commits to an expected availability percentage over a rolling window; sustained breach can result in delisting per operator policy.
- [ ] **No abuse of position**: a marketplace counterparty cannot deliberately produce different behaviour for different selecting partners (favoritism, sabotage). Behavioural drift detection is operator-monitored (Theme 5, E24).

### Pause and retract

- [ ] A partner can **pause** their listing at any time. Paused listings are hidden from new env-create discovery (E17) but continue serving envs already bound to them.
- [ ] A partner can **retract** their listing. Retraction is permanent for that opt-in instance: the service-host env is stopped per the policy declared by selecting envs already bound (graceful drain with notice, or immediate stop with substitution).

### Removal for cause

- [ ] An operator can remove a listing for cause: certification revocation (E16), terms violation, security incident, sustained unavailability.
- [ ] Removal for cause triggers immediate delisting and configurable handling of bound envs (notice + substitution, or termination).
- [ ] Every removal for cause is audit-logged with operator, justification, timestamp, and the set of affected bound envs.

### Terms versioning

- [ ] Terms are versioned. A new terms version requires explicit re-acceptance by listed partners within a grace window; non-acceptors are auto-paused.
- [ ] The terms version a partner accepted is stamped on every selection event that involves their counterparty (so a Report can carry "selecting env used counterparty X, which was governed by terms v3").

<!-- issue-body:end -->
