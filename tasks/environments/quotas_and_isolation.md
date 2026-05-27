# EPIC 6 — Resource Quotas & Per-Env Isolation Floor

## Changes

- _Initial state._

> Part of [Theme 2 — Environments](README.md). v0.2 anchors: §1 principle 5, §6.3, §12.

<!-- issue-body:begin -->

**AS AN** operator
**I WANT** every env to run inside a hard isolation boundary with enforced resource limits
**SO THAT** one partner's image cannot exhaust central resources, observe another partner's traffic, or read another partner's data.

**Open:**

- **Orchestration platform** — determines how isolation is implemented (k8s NetworkPolicies, Cilium, etc.). AC bind on the property, not the mechanism.

## Acceptance Criteria

### Network isolation

- [ ] Every env runs in its own network namespace. There is no L3 reachability between envs.
- [ ] An egress firewall is applied per env. The default policy is **deny**; only the following destinations are allowed: (a) declared counterparties' endpoints inside the env, (b) testbed services the env explicitly needs (identity service, log shipper, metric scraper), (c) DNS resolvers under testbed control.
- [ ] Egress to the public internet from inside an env is denied by default; if enabled per tier, it is logged in full and counted against the partner's egress quota.
- [ ] Ingress to env services from outside the env is brokered through the testbed; no env service is directly exposed to the public internet by default.

### Compute and memory limits

- [ ] Per-env CPU and RAM hard limits are set at provisioning, derived from tier (E4) and per-env override (within tier ceiling).
- [ ] CPU and RAM limits are enforced by the runtime (not advisory). Limit breaches result in throttling (CPU) or OOM kill (RAM); both are logged with env id and timestamp.
- [ ] Per-container limits within an env are bounded by the env-level total — no container may consume more than the env allows.

### Storage isolation and limits

- [ ] Every env has its own database instance (or schema with row-level isolation; tech-stack decision deferred). Cross-env reads are physically impossible, not only access-controlled.
- [ ] Per-env storage quota is enforced; exceeding it causes new writes to fail with a quota error, never silent data loss.
- [ ] All env storage is purged at delete, including any backups taken solely for orchestrator-internal purposes.

### Runtime sandboxing

- [ ] Containers run as non-root by default. Privileged containers are forbidden.
- [ ] No host paths are mounted into env containers. No Docker socket, no `/proc` writeable, no `/sys` writeable.
- [ ] Filesystem outside declared volumes is ephemeral and reset between starts.
- [ ] System calls beyond a documented allow-list are blocked (seccomp profile or equivalent).

### Process and identity isolation

- [ ] Env-level processes run under a UID/GID unique to the env. No two envs share a runtime user.
- [ ] Per-env identity material (E7) is mounted only inside that env's namespace; the orchestrator cannot leak it cross-env.

### Verification

- [ ] An automated isolation test suite runs on every release: confirms cross-env L3 unreachability, confirms storage isolation, confirms egress firewalling, confirms quota enforcement under load.
- [ ] Findings from the isolation suite block release.

<!-- issue-body:end -->
