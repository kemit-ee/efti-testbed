# EPIC 13 — Peer-Gate Impersonation (N containers)

## Changes

- _Initial state._

> Part of [Theme 3 — Counterparties](README.md). v0.2 anchors: §4 (per-row "N peer gates"), §4 closing paragraph.

<!-- issue-body:begin -->

**AS A** verified partner whose env contains a Gate
**I WANT** the testbed to spawn N distinct peer-Gate containers around my Gate
**SO THAT** I can test cross-border AS4 with realistic peer diversity — distinct certificates, distinct endpoint URLs, distinct message-correlation state per peer — rather than one process pretending to be many gates.

**Open:**

- **Default N** — sensible default count of peer Gates per env, plus tier-bounded ceiling. AC require N to be configurable per env within tier bounds.

## Acceptance Criteria

### Per-peer-Gate container

- [ ] Each impersonated peer Gate runs as its own container. There is **no** single-process multi-identity peer-Gate implementation.
- [ ] Each peer Gate has its own AS4 endpoint certificate (minted per E7), its own endpoint URL, its own DB or persistence partition.
- [ ] Each peer Gate is registered with the partner's Gate using realistic discovery semantics (gate-registry entry with country code, endpoint URL, cert). The partner's Gate must believe these are real peer Gates.

### Realistic diversity

- [ ] Each peer Gate carries a distinct ISO-3166 country code drawn from a configurable pool. Default pool: a representative spread of EU MS codes.
- [ ] Each peer Gate's AS4 endpoint URL is on a distinct host within the env's network namespace, so DNS resolution failures and routing failures can be simulated per-peer.
- [ ] Each peer Gate's behavioural profile (response timing, error injection, etc. — see scriptability below) is independent of the others.

### Scriptable behaviour

- [ ] Each peer Gate's behaviour is controllable from the Test Driver (Theme 4): can be told to delay responses, drop messages, return malformed payloads, return specific business errors, refuse new identifiers, etc.
- [ ] The behavioural axes are documented as a stable API.
- [ ] When the Test Driver is not actively controlling them, peer Gates behave as deterministic well-formed gates (the "happy path" baseline).

### Protocol coverage

- [ ] Each peer Gate supports the AS4 messages required for cross-border eFTI: `identifierQuery` / `identifierResponse`, `uilQuery` / `uilResponse`, `postFollowUpRequest`.
- [ ] The protocol version (AS4 profile, XSD version) is determined by the env's version-matrix selection (Theme 2, E11) — peer Gates speak the same versions the partner Gate is being tested at.
- [ ] If a marketplace certified peer Gate is selected for one or more peer slots (Theme 3, E17), it substitutes for the testbed mock in that slot. The mixing is transparent to the partner Gate.

### Resource accounting

- [ ] Each peer-Gate container counts against the env's CPU / RAM / storage budget (Theme 2, E6). Tier-bounded ceiling on N prevents budget exhaustion.

### Lifecycle

- [ ] Peer Gates are provisioned at env start, torn down at env stop. They share the env's lifecycle exactly — no peer Gate outlives its env.

<!-- issue-body:end -->
