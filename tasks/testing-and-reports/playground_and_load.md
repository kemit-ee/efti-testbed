# EPIC 20 — Playground Scripting & Load Control

## Changes

- _Initial state._

> Part of [Theme 4 — Testing & Reports](README.md). v0.2 anchors: §10.2.

<!-- issue-body:begin -->

**AS A** verified partner
**I WANT** to write my own scripted scenarios and run them against my env at a load level bounded by my tier
**SO THAT** I can exercise edge cases the prescribed suite does not cover and benchmark my service under controlled stress.

**Open:**

- **Playground DSL** — the specific surface for scripted scenarios, supported assertions, load-shape control primitives. AC require the surface is partner-usable and tier-bounded; the exact DSL is a separate design.

## Acceptance Criteria

### Scenario authoring

- [ ] Partners author scenarios in the same scripting surface as the prescribed suite (E19). There is one surface, not two.
- [ ] Scenarios are stored as partner-owned resources scoped by `partner_id` (Theme 1, E3 tenant scoping). They survive env deletion and can be reused across envs.
- [ ] Scenarios can be private to the partner or shared with the marketplace catalogue (read-only) for other partners to fork. Sharing is opt-in.

### Execution

- [ ] A partner runs a scenario against one of their envs. Like prescribed suites (E19), the run is a first-class resource.
- [ ] Scenarios can issue requests through any of the env's surfaces — partner endpoints, mock counterparties, marketplace counterparties — within the env's network boundary.
- [ ] Scenarios can drive testbed-mock behaviour (Theme 3, E13–E15) via the documented control axes — inject delays, errors, malformed payloads — without leaving the partner's tenant.

### Load shape control

- [ ] Load shape primitives exposed: constant RPS, ramp, step, spike, sustained-then-cooldown. Concrete grammar deferred to the DSL design.
- [ ] Sustained RPS and concurrent virtual users are bounded by the partner's tier (Theme 1, E4 — `Test-driver load ceiling`). Exceeding is rejected at scenario-validate time with a clear error.
- [ ] Within tier bounds, partners may freely choose load shapes; the testbed does not second-guess.

### Assertions and outcomes

- [ ] Partners can assert on response status, response payload, response timing, sequence ordering, downstream side-effects (e.g. "after I publish identifiers, a query within 5s must find them").
- [ ] Assertions are evaluated as the run proceeds; final outcome and per-assertion detail are emitted to a Report (Theme 4, E22).
- [ ] A failing assertion does not abort the run unless the scenario explicitly says so.

### Reproducibility and seeding

- [ ] Scenarios can seed test data into mock counterparties (Theme 3, E14/E15 dataset-seeding capabilities) at scenario start, for reproducible runs.
- [ ] Random elements in a scenario take a partner-supplied seed; the same seed produces the same run modulo environment timing.

### Stoppage and reruns

- [ ] A partner can stop a running scenario. Partial results are reported, marked partial.
- [ ] Reruns produce distinct run records — runs are not mutated, only added.

### Cost accounting

- [ ] Playground runs consume tier budget (load ceiling) proportionally to the load actually generated. Runs that would push the partner over a daily / monthly budget (if such budgets exist per tier) are rejected at start with the budget figures shown.

<!-- issue-body:end -->
