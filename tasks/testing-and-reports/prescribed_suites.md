# EPIC 19 — Prescribed Conformance Suites

## Changes

- _Initial state._

> Part of [Theme 4 — Testing & Reports](README.md). v0.2 anchors: §10.1.

<!-- issue-body:begin -->

**AS A** verified partner
**I WANT** the testbed to run a fixed, version-matrix-aware conformance suite against my env, exercising the eFTI APIs my role exposes
**SO THAT** I get a pass/fail verdict comparable across partners, usable as certification basis (Theme 3, E16).

**Open:**

- **Specific suite content** for each (role, version-tuple) combination is a separate, larger work item beyond the scope of this proposal. This epic binds on the *contract* the suite must honour, not the specific assertions inside.

## Acceptance Criteria

### Suite organisation

- [ ] Suites are organised by (role, version-tuple). Each suite has a stable identifier, a version of its own (the suite version may evolve independently of the protocol versions it tests), and a documented scope.
- [ ] A suite consists of named scenarios; each scenario consists of named assertions; each assertion has a pass / fail outcome at the end of execution.
- [ ] Suite content is operator-managed and audit-versioned. A run records the suite version it executed; reruns at a different suite version are clearly distinguishable.

### Run trigger and target

- [ ] A partner triggers a suite run against one of their envs. The Test Driver selects the suite via version-aware pairing (Theme 2, E12) — partner does not pick the suite manually.
- [ ] Suite runs are first-class resources: id, env id, partner id, suite id + version, start/end timestamps, overall outcome, link to Report (Theme 4, E22).
- [ ] A partner may have multiple concurrent suite runs against different envs, bounded by tier quotas (Theme 1, E4).

### Determinism

- [ ] A suite run on the same image digest, the same version-tuple, the same counterparty bindings, and the same suite version produces the same per-assertion outcomes — unless a counterparty in the env (marketplace or behavioural script) produced different responses.
- [ ] Test data the suite needs is bundled with the suite or seeded from a fixed corpus, not generated fresh each run.

### Counterparty interaction

- [ ] The suite drives the env from the outside — through testbed mocks (Theme 3) and through the partner's exposed endpoints — never from inside the partner's containers.
- [ ] Counterparties (mock or marketplace) operate in their default deterministic profile during a prescribed suite run; behavioural-injection toggles are not used.

### Reporting

- [ ] Every assertion result is captured: assertion id, pass/fail, observed-vs-expected payloads (subject to size limits, with full payloads stored separately if requested by the partner), wall-clock time of the assertion.
- [ ] Per-scenario coverage of the env's version-tuple is reported (which axes the scenario actually exercised).
- [ ] The overall verdict (pass / fail) is a function of per-assertion outcomes per a documented rule — usually "all required assertions pass", but the rule is explicit not implicit.

### Stoppage and retries

- [ ] A partner can stop a running suite. Partial results are still reported, clearly marked partial.
- [ ] Per-assertion retries are not automatic — a failing assertion is recorded as failing once. If the partner wants a rerun, they trigger a new suite run.
- [ ] Infrastructure flakes (counterparty unreachable due to testbed network blip, etc.) are distinguished from partner-image failures and surfaced separately in the Report.

<!-- issue-body:end -->
