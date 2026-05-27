# Theme 4 — Testing & Reports

## Changes

- _Initial state._

> Architecture: v0.2 §10, §11.

<!-- issue-body:begin -->


**Q:** How are tests run and verified output produced?

Two execution modes (prescribed suite = default version-aware pass/fail; playground = partner-scripted, tier-bounded) share one scripting surface. Every run produces a signed Report that survives env deletion and is verifiable by third parties.

## Theme done when

**Running**
- [ ] [E19 — Prescribed Conformance Suites](prescribed_suites.md): tuple-aware suites run deterministically; pass/fail per assertion.
- [ ] [E20 — Playground Scripting & Load Control](playground_and_load.md): partner-scripted scenarios at tier-bounded load; shared surface with E19.

**Reports**
- [ ] [E21 — Per-Run Report Generation & Storage](report_generation.md): each run produces a Report with all required fields; Reports outlive envs; partners can list and read their own.
- [ ] [E22 — Report Signing, Attestation & Distribution](report_attestation.md): signed by the testbed, third-party-verifiable, exportable in machine-readable form.

<!-- issue-body:end -->
