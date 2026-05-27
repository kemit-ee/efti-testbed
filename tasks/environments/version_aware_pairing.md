# EPIC 12 — Version-Aware Counterparty Pairing & Suite Selection

## Changes

- _Initial state._

> Part of [Theme 2 — Environments](README.md). v0.2 anchors: §7.

<!-- issue-body:begin -->

**AS A** verified partner creating an env
**I WANT** the testbed to surface only the counterparties (marketplace and mock) and conformance suites that match my env's selected version-tuple
**SO THAT** I cannot accidentally pair an XSD-v1 Platform mock with an XSD-v2 partner Gate, and so my conformance suite always exercises the protocols I'm actually using.

## Acceptance Criteria

### Marketplace discovery filtering

- [ ] When showing the marketplace counterparty list for a role-slot during env-create (Theme 3, E17), the Portal filters listings to only those whose declared supported tuples intersect the env's selected tuple.
- [ ] If multiple compatible listings exist, all are shown; the partner picks one. The tie-break is partner-driven, not testbed-driven (no implicit ranking).
- [ ] If zero compatible listings exist and the role-slot has a testbed mock available for the env's tuple, the mock is the only option shown.
- [ ] If zero compatible listings exist and no compatible mock exists, the env-create is rejected at validation with an error naming the role and tuple.

### Testbed mock version selection

- [ ] Each testbed mock (Theme 3, E13/E14/E15) advertises the tuples it supports. The orchestrator instantiates the mock variant matching the env's tuple.
- [ ] A mock that does not support a given tuple is **not** silently substituted. Either it supports the tuple or it does not; if not, the env-create fails.

### Conformance suite selection

- [ ] Each prescribed conformance suite (Theme 4, E19) declares (role, version-tuple) coverage.
- [ ] A test run against an env automatically selects the suite that matches the env's role and tuple. If no suite matches, the partner is told explicitly — no fallback to a "closest" suite.
- [ ] A certification request (Theme 3, E16) requires that a matching suite exists. If not, certification at that combination is unavailable until a suite is added.

### Cross-role consistency within an env

- [ ] Within an env, all roles (partner-supplied + counterparties + mocks) speak the same version-tuple. The orchestrator does not permit mixed tuples within one env — that is what separate envs are for.
- [ ] A multi-version test scenario (e.g. "does my Gate behave correctly when one peer Gate is v1 and another is v2?") is out of scope for v1 of this epic. Such scenarios, when needed, will be handled by running multiple coordinated envs, not by allowing intra-env tuple mixing.

### Visibility

- [ ] Env inspection shows: the env's tuple, the suite matched, the counterparty source per role (marketplace listing id with version vs. mock variant with version).
- [ ] Reports (Theme 4, E22) carry the same information so the verdict is unambiguous about which protocol versions were exercised.

<!-- issue-body:end -->
