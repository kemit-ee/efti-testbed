# EPIC 7 — Per-Env Runtime Identity Minting

## Changes

- _Initial state._

> Part of [Theme 2 — Environments](README.md). v0.2 anchors: §9.

<!-- issue-body:begin -->

**AS A** verified partner
**I WANT** the testbed to mint all PKI / credentials / secrets my env needs at provisioning
**SO THAT** my Gate / Platform / AAP can run protocol-correct conversations (AS4 cert exchange, REST auth, eDelivery secrets) without wrangling certs by hand.

**Open:** auth mechanisms on partner-API surfaces — drives which credentials are minted (mTLS / JWT / mixed).

## Acceptance Criteria

### Minted at provisioning
- [ ] **Partner Gate AS4 cert** (if env contains a partner Gate), X.500 subject deterministic from `{env_id, gate_role}`.
- [ ] **Per-peer-Gate AS4 certs** — one per spawned container (Theme 3, E13), each distinct subject.
- [ ] **REST credentials** for Gate↔Platform and Gate↔AAP, env-scoped.
- [ ] **eDelivery toolkit secrets** per the version tuple (Theme 2, E11) — e.g. Domibus admin password, keystore passphrases.
- [ ] **Per-counterparty secrets** for marketplace counterparty wiring (Theme 3, E17).

### Trust roots
- [ ] Env-scoped CA materialised at provisioning; trust root for that env only.
- [ ] CA never reused across envs — no accidental cross-env trust.
- [ ] Orchestrator distributes the env-CA trust anchor to every container needing peer validation.

### Distribution
- [ ] Mounted as ephemeral files (tmpfs / projected volume); never baked into images.
- [ ] Never written to persistent storage that survives env delete.
- [ ] Accessible only inside the env namespace; orchestrator cannot expose it cross-env.

### Lifecycle
- [ ] Material lives exactly as long as the env. At `deleted`, all destroyed (CA private key included).
- [ ] Not rotated mid-lifetime in v1 — env lifetime ≤7d makes rotation unnecessary; partner recreates env if needed.
- [ ] Cert validity ≥ env `time_to_delete` + safety margin.

### Separation from access keys
- [ ] Env-runtime material structurally separate from partner's access key (Theme 1, E2); env-material compromise does not weaken the key or any other env.
- [ ] Partner's access key is **never** mounted into env containers.

### Partner visibility
- [ ] Partner can fetch public material (cert chains, public keys, credential ids) via Portal.
- [ ] Private key material never exposed via Portal. If genuinely needed (rare), an operator-mediated process exists.

<!-- issue-body:end -->
