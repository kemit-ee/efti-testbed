# EPIC 31 — Documentation & Developer Experience

## Changes

- _Initial state._

> Part of [Theme 8 — Delivery & Documentation](README.md). v0.2 anchors: §1 principle 7, §3.

<!-- issue-body:begin -->

**AS A** verified partner with my own Docker image to test
**I WANT** accurate, version-current documentation that walks me from access key to passing certification
**SO THAT** onboarding friction is not the leading adoption blocker.

**Open:** documentation tooling.

## Acceptance Criteria

### Coverage
- [ ] **Quickstart** — first credentials to first test against a default env with a hello-world image, ≤30 min.
- [ ] **Concept reference** — access keys, envs, version matrix, counterparty selection (mocks vs marketplace), test driver modes, reports, attestation.
- [ ] **API reference** — generated from E29 spec; every endpoint, schema, error code documented; code/doc drift blocks release (E30).
- [ ] **Portal user guide** — task walkthrough of every E23 flow with screenshots / recordings.
- [ ] **Image authoring guide** — Gate/Platform/AAP image compatibility: endpoints per axis, expected behaviours, pitfalls, debugging.
- [ ] **Playground examples** — partner-shareable scenarios (E20).
- [ ] **Marketplace participation guide** — certification (E16), opt-in (E18), terms in practice.
- [ ] **FAQ + troubleshooting** — common error codes, recovery steps, links to partner-scoped audit slice (E28).

### Version-currency
- [ ] Doc versions track Portal/API versions; partner on v1.x sees v1.x behaviour only.
- [ ] Old doc versions remain accessible for the E29 deprecation window.

### Single source of truth
- [ ] API reference generated from the spec — no hand-maintained API content drift.
- [ ] Portal flow refs use stable Portal anchors; broken-link CI per E30.
- [ ] Concept references quote architecture by stable anchors where possible.

### Discoverability
- [ ] Every E23 page links to its relevant doc page.
- [ ] Site search across all docs.
- [ ] Indexed for external search engines.

### i18n
- [ ] English baseline for v1; localisation infrastructure in place.

### Feedback
- [ ] "Report a problem with this page" → operator ticket via E26.
- [ ] Doc-quality metrics surfaced in E25.

### Samples
- [ ] One minimal-valid reference image per role (Gate, Platform, AAP), free for testbed use, as a comparison baseline.
- [ ] Sample certification reports showing the E21/E22 structure.

<!-- issue-body:end -->
