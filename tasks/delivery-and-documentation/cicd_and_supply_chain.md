# EPIC 30 — CI/CD, Supply Chain & Test Coverage for Testbed Itself

## Changes

- _Initial state._

> Part of [Theme 8 — Delivery & Documentation](README.md). v0.2 anchors: §8 (we gate partner images; we must hold ourselves to at least that bar).

<!-- issue-body:begin -->

**AS AN** operator
**I WANT** the testbed's own build pipeline to produce signed, SBOM-bearing artefacts gated on a comprehensive test suite
**SO THAT** the credibility we project onto partner images (Theme 2) is matched by what we ship ourselves, and regressions are caught before production.

**Open:**

- **Specific CI platform, signing toolchain, SBOM format**. AC require the *capability* of signed-build, SBOM, gated-release; the specific toolchain is operator-decided in line with the overall stack decision.

## Acceptance Criteria

### Build pipeline

- [ ] All testbed components (Portal, Orchestrator, Identity Service, Test Driver, Scanner-wrapper, Reporting, operator Console, etc.) build through a single CI pipeline.
- [ ] Builds are reproducible: the same source produces byte-identical artefacts (or, where bit-for-bit is infeasible, behaviourally identical artefacts with documented variation).
- [ ] Build artefacts are container images (or equivalents per the stack decision); built images are signed before being promoted.

### Supply chain

- [ ] Each build artefact ships with an SBOM in a documented format (SPDX or CycloneDX, decided at stack time).
- [ ] Image signatures are verifiable using published public material, equivalent to what we require of partner images (Theme 2, E10).
- [ ] Dependency updates are gated by automated vulnerability scanning; criticals block merge.

### Test suites

The pipeline runs at least the following:

- [ ] **Unit tests** for every component, gated at a documented coverage floor.
- [ ] **Component integration tests** exercising the contract between components (Portal ↔ Orchestrator, Orchestrator ↔ Identity, etc.) against in-process or testcontainers stand-ins.
- [ ] **Isolation suite** (Theme 2, E6): cross-env L3 unreachability, storage isolation, egress firewalling, quota enforcement. Failure blocks release.
- [ ] **Sandboxing suite** (Theme 2, E10): every documented sandboxing constraint is exercised; an image attempting violation either fails to schedule or fails at runtime. Failure blocks release.
- [ ] **End-to-end smoke**: provision a representative env, run a small conformance suite against the testbed's own mocks, generate and verify a signed report. Failure blocks release.
- [ ] **API contract tests**: every published API surface is exercised against its specification (E29). Drift between spec and implementation blocks release.

### Release gating

- [ ] A release candidate is promoted to production only after all of: unit + integration + isolation + sandboxing + e2e + contract suites pass; signed artefacts exist with SBOMs; vulnerability scan shows no unhandled criticals; CHANGELOGs are updated.
- [ ] Promotion is itself audit-logged (Theme 7, E28): operator, version, source commit, attached artefacts.

### Deployment

- [ ] Deployment to production is automated from a signed release artefact. Manual production deployments are an explicit exception with operator audit-log entry.
- [ ] Rollback to the previous signed release is a single operator action and is regularly exercised in a non-production environment.

### Observability of CI

- [ ] CI pipeline health is itself surfaced in the operator console (Theme 5, E24): success rate, duration trends, recently failed runs with logs.

<!-- issue-body:end -->
