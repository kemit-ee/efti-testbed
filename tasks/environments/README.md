# Theme 2 — Environments

## Changes

- _Initial state._

> Architecture: v0.2 §5, §7, §8, §9.2, §12.

<!-- issue-body:begin -->


**Q:** How does a partner set up a test environment — with their own images and the protocol versions they need?

An **env** is the unit of tenancy: one partner's images, surrounded by counterparties, sealed inside a hard isolation boundary, parameterised by a protocol-version tuple. Every other theme either feeds it or consumes its output.

## Theme done when

**Lifecycle**
- [ ] [E5 — Env CRUD & State Machine](env_crud_and_state.md): create / inspect / stop / delete; §5 state machine honoured.
- [ ] [E6 — Resource Quotas & Per-Env Isolation Floor](quotas_and_isolation.md): network namespace + egress firewall + own DB + CPU/RAM/storage caps; no cross-env state.
- [ ] [E7 — Per-Env Runtime Identity Minting](runtime_identity.md): fresh certs and secrets per env; never reused.
- [ ] [E8 — Idle Detection, Stop & Reaping](idle_stop_reaping.md): 4h-idle / 7d-delete defaults, operator-overridable, with prior notice.

**Images**
- [ ] [E9 — Image Pull, Pinning & Cache](image_pull_and_cache.md): pull by digest, central cache, no re-pull while cached.
- [ ] [E10 — Image Scanning & Container Sandboxing](image_scanning_and_sandboxing.md): scan before run; runtime sandboxing enforced.

**Versions**
- [ ] [E11 — Protocol-Version Registry & Combination Validation](version_registry.md): versioned-axis registry; invalid tuples rejected at validation.
- [ ] [E12 — Version-Aware Counterparty Pairing & Suite Selection](version_aware_pairing.md): marketplace, mocks, suites advertise supported tuples; pairing respects them.

<!-- issue-body:end -->
