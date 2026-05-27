# EPIC 25 — Service-Level Reliability

## Changes

- _Initial state._

> Part of [Theme 6 — Operations & Reliability](README.md). v0.2 anchors: §3.

<!-- issue-body:begin -->

**AS** a partner-affecting service operator **I WANT** honest SLO indicators, threshold alerts, and a hardened public surface **SO THAT** reliability is measured directly and the public posture matches a public-service expectation.

Combines internal observability/SLO measurement and public-surface resilience — one epic because at stakeholder level "is the service running well and safely accessible" is one question.

**Open:** metrics stack; CDN / WAF / DNS provider.

## Acceptance Criteria

### Health, capacity, error metrics
- [ ] Every internal service emits liveness + readiness on a documented surface.
- [ ] Orchestrator: scheduling latency, queue depths, env-provisioning fail rate, image-pull fail rate, scanner backlog, retry counts.
- [ ] Per-component error rate with stable labels (component, endpoint, error class).
- [ ] Per-tier / per-partner: concurrent envs, playground load consumed, image-cache footprint.
- [ ] Per-host / per-cluster: CPU/RAM/storage headroom, scheduling success ratio.
- [ ] Forward indicators (queue growth rate, time-to-saturation) where cheap to derive.

### SLO indicators

Each indicator has: documented target, current actual, error budget over rolling window.
- [ ] **Env provisioning time** (p50/p95/p99 `requested` → `running`).
- [ ] **Test-run start latency** (queued → executing).
- [ ] **Report generation latency** (run-complete → readable).
- [ ] **Counterparty wiring latency** within provisioning.
- [ ] **Marketplace counterparty availability** (uptime per opt-in, probed per E17).
- [ ] **Partner-Portal availability** (successful authenticated request rate, rolling window).

### Alerting
- [ ] Documented thresholds per SLO + capacity level, operator-tunable.
- [ ] Alerts route via E26 — no second alert pipe.
- [ ] Each alert carries metric, threshold, current value, time window, link to operator-console view (E24).

### Metric retention and exposure
- [ ] Raw retention bounded; aggregated rollups longer per documented policy; both operator-configurable.
- [ ] Metrics not subject to audit-log retention (E28); separate substrate.
- [ ] Consumed by E24. Not exposed to partners directly; partner-scoped projection lives in E3.
- [ ] Read-only metrics export for operator offline analysis.

### TLS
- [ ] TLS 1.3 on all public endpoints (1.2 only if interoperability needs, documented).
- [ ] Certs auto-renew with pre-expiry alerting via E26.
- [ ] HSTS with documented `max-age`; subdomain policy per architecture.
- [ ] Cipher suite policy reviewed annually min.

### Rate limiting and abuse
- [ ] Per-IP + per-account rate limits; distinguish unauthenticated probing from authenticated normal use.
- [ ] Authn-failure rate limits (E3) route through the same plane.
- [ ] Burst tolerances documented; elevated tier opt-in mirrors E4 load tiering.

### DDoS
- [ ] L3/L4 provider-supplied (or equivalent self-managed) protection on ingress.
- [ ] L7 WAF for Portal + operator console; rule updates, false-positive review.
- [ ] Mitigation events visible in E24, audit-logged in E28.

### Session hardening (Partner Portal)
- [ ] Session cookies HTTP-only, Secure, SameSite=Lax (or stricter); rotated on auth state change; client-bound where possible.
- [ ] CSRF on every mutation, documented exclusions.
- [ ] CSP, X-Frame-Options DENY where applicable, Referrer-Policy baseline.

### Operator console gating
- [ ] Not reachable from open public internet by default. Reach paths: internal operator network OR authenticated VPN/jump-host AND hardened public ingress with extra auth factors (E3).
- [ ] No anonymous access path.

### Public verification endpoints
- [ ] Signed-report verifier (E22): read-only, rate-limited, cache-friendly, no side effects.
- [ ] Marketplace counterparty endpoints (E17): routed through testbed ingress; underlying env infra never directly addressable.

### Edge-event observability
- [ ] Edge events (rate-limit, WAF block, DDoS-mitigation, TLS handshake fail) feed metrics + (where relevant) audit log.
- [ ] Threshold-exceeding anomaly triggers operator alert via E26.

<!-- issue-body:end -->
