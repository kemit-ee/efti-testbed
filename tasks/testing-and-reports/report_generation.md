# EPIC 21 — Per-Run Report Generation & Storage

## Changes

- _Initial state._

> Part of [Theme 4 — Testing & Reports](README.md). v0.2 anchors: §11.

<!-- issue-body:begin -->

**AS A** verified partner
**I WANT** every test run to produce a Report with everything needed to reason about the outcome
**SO THAT** I can review failures, share results, and use a passing Report as certification basis (Theme 3, E16).

**Open:** counterparty anonymisation policy.

## Acceptance Criteria

### Report contents
- [ ] **Identity**: report id, partner id, env id, run id, kind (`prescribed-suite` / `playground-scenario`).
- [ ] **Subject under test**: image digest, declared role, env tuple.
- [ ] **Counterparties** per role-slot: source (`mock`/`marketplace`), id, version, owning partner (anonymisation applied), accepted terms version (E18) when marketplace.
- [ ] **Suite / scenario**: id, version, scope.
- [ ] **Per-assertion**: id, pass/fail, observed-vs-expected payload refs (full payloads stored separately on partner request), wall-clock timestamps.
- [ ] **Aggregates**: verdict (pass / fail / partial-due-to-stop / infrastructure-flake), assertion counts by outcome, resource usage, total wall-clock.
- [ ] **Coverage map**: which tuple axes each scenario exercised.
- [ ] **Testbed metadata**: orchestrator version, suite engine version, signing material reference (E22).

### Generation
- [ ] Automatic at run completion (success / failure / stop); partner doesn't opt in.
- [ ] Non-blocking — Report ready when assertions resolve; large payload artefacts attach asynchronously.

### Storage and durability
- [ ] Stored centrally, not in env-scoped storage. Env delete doesn't delete Reports.
- [ ] Retention per documented policy (operator-configurable; minimum floor for audit/certification).
- [ ] Immutable after generation — corrections produce a new Report linked as supersession; original preserved.

### Partner access
- [ ] Partner lists own Reports filtered by env / kind / date / verdict.
- [ ] Partner reads full content (anonymisation applies to counterparty fields).
- [ ] Partner downloads payload-ref content (size/cost policy applies).
- [ ] Partner never lists or reads another partner's Reports, except via marketplace-listing public summary ("counterparty used N runs / month with X aggregate outcome").

### Operator access
- [ ] Operators read all Reports for audit/dispute; their reads are audit-logged (E28).

### Search
- [ ] Indexed for partner-scoped search by digest, tuple, suite, marketplace counterparty, verdict.

<!-- issue-body:end -->
