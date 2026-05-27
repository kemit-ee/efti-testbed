# EPIC 9 — Image Pull, Pinning & Cache

## Changes

- _Initial state._

> Part of [Theme 2 — Environments](README.md). v0.2 anchors: §8.

<!-- issue-body:begin -->

**AS A** verified partner
**I WANT** to declare which Docker image of mine goes into my env, and have the testbed pull and run exactly that image — not a moved-tag surprise
**SO THAT** my test runs are reproducible and my results bind to a specific bit-for-bit build of my software.

**Open:**

- **Image registry policy** — whether partners must use a specific registry, allowed registry hosts, signature requirements, SBOM ingest. AC require a *policy* exists and is enforced; the policy content itself is operator-decided.

## Acceptance Criteria

### Reference declaration

- [ ] An image reference declared by a partner is one of: `host/name:tag`, `host/name@sha256:digest`, or `host/name:tag@sha256:digest`.
- [ ] At env-validating time, the orchestrator resolves any tag to a digest and stores both. From this point on, only the digest is used to fetch.
- [ ] Re-creating the "same" env with the same tag but a moved-since digest produces a new env whose image digest differs from the prior env — this is explicit, visible in inspection, and audit-logged.

### Registry policy enforcement

- [ ] An image whose registry host is not in the operator-defined allow-list is rejected at declaration with a clear error.
- [ ] Public anonymous pulls are supported. Pulls requiring credentials use partner-supplied credentials stored encrypted-at-rest under the partner's record.
- [ ] If signature verification is enabled (Cosign / sigstore), unsigned or invalidly-signed images are rejected before they are cached.
- [ ] If SBOM ingest is enabled, an image without a retrievable SBOM is rejected.

### Pull and cache

- [ ] Pulls are performed by the orchestrator, not by the env's runtime. Envs never reach the public internet to fetch images.
- [ ] The central cache is keyed on full digest. A digest cached once is never re-pulled for the lifetime of the cache entry.
- [ ] Cache evictions are LRU under a per-partner cache share quota (Theme 1, E4) and a global cache ceiling. Eviction is logged.
- [ ] A pull failure (network, auth, registry down, image not found) fails env provisioning with a specific error code and is audit-logged; the env transitions to `rejected`.

### Re-pull and revalidation

- [ ] An operator may force re-pull and re-scan of a cached digest (e.g. after policy change). Existing running envs continue on the cached copy; new envs use the refreshed copy.
- [ ] A periodic background job re-pulls digests whose cache entry exceeds a configurable freshness window — primarily to catch registry-side disappearance.

### Per-image bounds

- [ ] Maximum image size is bounded per tier; exceeding it rejects declaration.
- [ ] Maximum layer count and maximum total uncompressed size are bounded as well, to prevent pathological images.

### Partner visibility

- [ ] A partner can list the digests resolved for their envs and see when each was first pulled and last used.
- [ ] A partner cannot enumerate or read cached images belonging to other partners; cross-partner cache sharing of identical digests is an internal optimisation, never visible.

<!-- issue-body:end -->
