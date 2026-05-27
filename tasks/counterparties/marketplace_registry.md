# EPIC 17 — Marketplace Registry & Counterparty Selection

## Changes

- _Initial state._

> Part of [Theme 3 — Counterparties](README.md). v0.2 anchors: §6.2.

<!-- issue-body:begin -->

**AS A** verified partner creating an env
**I WANT** to see which other partners' certified services are available as counterparties for the roles I am not playing, and choose one per role-slot
**SO THAT** my test runs use real implementations from real vendors where available, falling back to testbed mocks only when no certified service exists for the role and version combination I need.

**Open:**

- **Counterparty anonymisation policy** — whether the partner-id behind a marketplace service is visible to the env owner who selects it. AC require the policy is enforced; the policy itself is open.

## Acceptance Criteria

### Listing

- [ ] A certified service (E16) is **not** automatically listed in the marketplace. The owning partner must explicitly opt in (E18), and the opt-in must be active (not paused, not retracted).
- [ ] A listed service exposes only a restricted projection: service identifier, role, version-matrix combination it supports, owning-partner display string per anonymisation policy, current health status, and a free-text description supplied by the owning partner.
- [ ] Operational state — credentials, logs, env identity material, request payloads — is **never** exposed in the listing.

### Discovery

- [ ] When a partner creates an env, for each role they are not supplying themselves, the Portal shows the list of marketplace-available services filtered by the env's version-matrix selection (Theme 2, E11).
- [ ] Listings the partner is not eligible to use (because the env's version-matrix combination is incompatible) are hidden, not greyed out.
- [ ] The list always includes the testbed mocks (Theme 3, E13/E14/E15) as a baseline fallback option per role.

### Selection

- [ ] A partner selects exactly one counterparty per role-slot in their env. They may mix: e.g. a marketplace Platform + a testbed-mock AAP + N testbed-mock peer Gates.
- [ ] If a required role-slot has neither a compatible marketplace service nor an enabled testbed mock (operator-configurable), env-create is rejected with a clear error.
- [ ] Once an env is provisioned, its counterparty bindings are immutable — the env is bound to those specific services for its lifetime, even if a service's marketplace listing later changes or is retracted.

### Routing

- [ ] When a marketplace counterparty is selected, the orchestrator wires the env's partner-supplied components to that counterparty's endpoint, using per-env credentials minted by E7.
- [ ] The marketplace counterparty receives traffic from the env it was selected into and **only** that env. Cross-env traffic leakage from one selecting env to another is impossible per Theme 2 isolation rules.

### Health and availability

- [ ] Each listed service's health is monitored by the testbed (Theme 6, E25 — service-level reliability). A service in failed health is shown as "unavailable" but not auto-removed from the registry.
- [ ] Env-create against an "unavailable" counterparty either fails or proceeds with a testbed-mock substitution depending on partner choice at create time. The choice is recorded on the env.

### Per-counterparty configuration by the env

- [ ] When a partner selects a marketplace counterparty, the partner can override default behaviour parameters that the counterparty's owner has exposed (e.g. response delay profile, error injection toggles) — within bounds the owner declared.
- [ ] The selecting partner cannot inject arbitrary requests into the counterparty's internal state; the contract is the protocol surface, not implementation-internal hooks.

### Audit

- [ ] Every selection of a marketplace counterparty into an env is audit-logged with: selecting partner, env id, counterparty service id, owning partner (subject to anonymisation policy), timestamp.

<!-- issue-body:end -->
