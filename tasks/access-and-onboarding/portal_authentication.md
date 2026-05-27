# EPIC 3 — Portal Authentication & Authorisation

## Changes

- _Initial state._

> Part of [Theme 1 — Access & Onboarding](README.md). v0.2 anchors: §1 principle 7, §9.1.

<!-- issue-body:begin -->

**AS A** verified partner
**I WANT** to authenticate to the Portal with my access key and operate only on resources that belong to me
**SO THAT** I can manage my envs, images, and test runs autonomously without ever being able to touch another partner's state.

**Open:**

- **Auth mechanism** — bearer token, mTLS, OAuth2 device-grant, or other. The AC require the *capability* of access-key-driven authn with tenant scoping, not a specific mechanism.

## Acceptance Criteria

### Authentication

- [ ] Every Portal request requires a valid access key. Unauthenticated requests are rejected with a uniform error (no resource-existence leakage).
- [ ] An access key in `suspended` or `revoked` state fails authentication immediately.
- [ ] Authentication is **stateless** on the hot path — no per-request DB lookup beyond a bounded cache (cache TTL configurable, default ≤60 s, so revocation propagates within that bound).
- [ ] Clock-skew tolerance is bounded and documented.

### Authorisation — tenant scoping

- [ ] Every resource (env, image reference, test run, report, marketplace opt-in, etc.) carries an immutable `partner_id` set at creation time.
- [ ] All read endpoints filter by `partner_id` derived from the authenticated access key. A partner cannot enumerate, query, or read another partner's resources by any means.
- [ ] All write endpoints check `partner_id` ownership before mutating. Attempts to mutate another partner's resource fail with the same "not found" response as if the resource did not exist.
- [ ] Marketplace counterparty discovery (Theme 3, E17) is the **only** exception: certified-and-opted-in services are visible across tenants by design. The visible projection is restricted (no operational state, no logs, no credentials).

### Authorisation — Operator scope

- [ ] operator-only endpoints (E2's issuance / rotation / suspension / revocation; E24's operator endpoints) require an operator-class credential distinct from partner access keys. A partner key can never invoke an operator endpoint.
- [ ] operator credentials are issued, rotated, and revoked through a separate process from partner access keys.

### Failure semantics

- [ ] All authn / authz failures are logged with: timestamp, source IP, key fingerprint (not the key itself), endpoint, and outcome.
- [ ] Repeated authn failures from the same source within a rolling window trigger rate-limiting (parameters configurable).
- [ ] No 5xx is returned for authn / authz failures — these are 401 / 403 / 404 as appropriate.

### Self-service introspection

- [ ] A partner can query an endpoint that returns: their `partner_id`, the tier active on the authenticating key, the current quota usage vs limits, and the key's expiry (if any). The endpoint never returns the key itself.

<!-- issue-body:end -->
