# EPIC 14 — Platform Counterparty Mock

## Changes

- _Initial state._

> Part of [Theme 3 — Counterparties](README.md). v0.2 anchors: §4 (role/impersonation matrix).

<!-- issue-body:begin -->

**AS A** verified partner whose env contains a Gate or an AAP but not a Platform
**I WANT** the testbed to supply a deterministic, controllable Platform mock
**SO THAT** my partner-supplied component can exercise the full Gate↔Platform protocol — dataset retrieval, follow-up, subset filtering, error responses — without my having to also implement and supply a Platform.

**Open:**

- **Specific dataset corpora** — what synthetic datasets the mock returns by default, and how partners can seed alternatives. AC require seedability, not specific corpora.

## Acceptance Criteria

### Protocol coverage

- [ ] The mock exposes the Gate↔Platform contract for the env's selected REST API revision and / or eDelivery profile (Theme 2, E11): `GET /dataset/{datasetId}`, `POST /dataset/{datasetId}/follow-up`, `/health`, plus the eDelivery equivalents (`uilQuery` → `uilResponse`, `postFollowUpRequest`).
- [ ] The mock can publish identifier sets to the partner's Gate (REST `POST /identifiers/{datasetId}` or eDelivery `saveIdentifiersRequest`) on Test-Driver instruction.
- [ ] Authentication mechanism matches the env's version-matrix selection (e.g. mTLS, HTTP Basic, JWT — whichever the partner's Gate expects per its declared version).

### Subset semantics

- [ ] When responding to a dataset request, the mock filters the returned dataset by the requested subset (EU01, EU02, etc. as defined in EU Delegated Regulation 2024/2024). Subsets the requester is not authorised for produce a documented business error, not a partial-by-accident result.
- [ ] The subset enforcement is correct under the env's selected XSD version — v1 vs v2 may carry different subset definitions; the mock follows whichever version the env declares.

### Determinism and scriptability

- [ ] By default the mock returns the same dataset for the same `datasetId` every time. Test runs are reproducible.
- [ ] The Test Driver can inject behaviours per request or per session: delay, malformed payload, return-error-code-X, return-too-large-payload, return-stale-data. The control axes are stable and documented.

### Dataset seeding

- [ ] A default synthetic dataset corpus ships with the mock — enough to drive prescribed conformance suites (Theme 4, E19) without partner setup.
- [ ] A partner can seed the mock with their own datasets via the Portal for their env's playground use. Seeded data lives only for the env's lifetime.
- [ ] Synthetic datasets contain no real PII. The mock refuses to ingest data flagged as real personal data.

### Multiple Platform-mock instances per env

- [ ] An env may declare multiple Platform-mock instances when a scenario requires it (e.g. a Gate that must route between two platforms). Each instance is independent: its own dataset corpus seed, its own behavioural profile.

### Resource accounting

- [ ] Platform-mock containers count against env CPU / RAM / storage budgets (Theme 2, E6).

### Marketplace substitution

- [ ] If a marketplace-certified Platform service is selected for this slot (Theme 3, E17), it substitutes for the mock transparently. The partner's Gate sees a Platform endpoint either way.

<!-- issue-body:end -->
