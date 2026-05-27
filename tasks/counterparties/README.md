# Theme 3 — Counterparties

## Changes

- _Initial state._

> Architecture: v0.2 §4, §6, §10.

<!-- issue-body:begin -->


**Q:** Who plays the other roles around a partner's component, and how real are they?

Whatever role(s) the partner doesn't supply, the testbed fills — from **testbed mocks** (deterministic, version-aware, always available) or from the **marketplace of certified live partner services** (curated, isolated, partner-selectable). Mocks are baseline; marketplace is the realism multiplier.

## Theme done when

**Mocks**
- [ ] [E13 — Peer-Gate Impersonation (N containers)](peer_gate_impersonation.md): N spawned peer-Gate containers per env, each with distinct identity and scriptable behaviour.
- [ ] [E14 — Platform Counterparty Mock](platform_mock.md): deterministic Platform mock matching env's version tuple.
- [ ] [E15 — Authority/AAP Counterparty Mock](authority_mock.md): deterministic Authority mock driving realistic query flows.

**Marketplace**
- [ ] [E16 — Quality Gate (Service Certification)](quality_gate.md): "certified" attestation earned by passing the prescribed suite at a defined version combination.
- [ ] [E17 — Marketplace Registry & Counterparty Selection](marketplace_registry.md): certified-opted-in services discoverable across tenants (restricted projection), selectable per env-role-slot.
- [ ] [E18 — Long-Running Counterparty Mode & Terms](counterparty_mode_and_terms.md): runtime obligations (uptime, no-retention, opt-out, removal-for-cause) explicit, accepted at opt-in, enforced.

<!-- issue-body:end -->
