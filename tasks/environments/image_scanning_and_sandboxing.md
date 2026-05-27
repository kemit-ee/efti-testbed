# EPIC 10 — Image Scanning & Container Sandboxing

## Changes

- _Initial state._

> Part of [Theme 2 — Environments](README.md). v0.2 anchors: §8, §12.

<!-- issue-body:begin -->

**AS AN** operator
**I WANT** every partner image to pass a baseline trust check before running, and to run under tight sandboxing
**SO THAT** defence-in-depth is honest when running arbitrary partner code on shared infra.

**Open:** scanner / ruleset / blocking thresholds — operator policy.

## Acceptance Criteria

### Pre-run scan
- [ ] Scanned on first pull to central cache; no env starts a container from an unscanned digest.
- [ ] Scan result stored with cache entry: scanner name+version, ruleset version, findings, decision (`allow`/`block`/`allow-with-warning`), timestamp.
- [ ] `block` digest held for forensic value; cannot be used; existing envs running it are terminated per operator policy.
- [ ] Re-scan (operator or scheduled) updates the decision; most recent wins.

### Findings classification
- [ ] Categorised by severity (info/low/medium/high/critical) and class (OS-package CVE, app-dependency CVE, suspicious binary, build-step network call, etc.).
- [ ] Block/warn/allow thresholds operator-configurable per partner tier — higher trust tolerates more.

### Manifest checks (independent of scanner)
- [ ] No privileged-by-default declaration; `USER root` allowed but runtime forces non-root UID.
- [ ] Forbidden host-path mounts → flagged at scan, will fail at runtime anyway.
- [ ] Size, layer count, total uncompressed re-checked against E9 limits.

### Runtime sandboxing (every partner container)
- [ ] **Non-root UID** assigned by orchestrator, never UID 0, regardless of `USER`.
- [ ] **No privileged**: `privileged: true` rejected before scheduling.
- [ ] **No host mounts**: no `hostPath` / bind mounts; only configmap/secret projections.
- [ ] **No Docker socket** (`/var/run/docker.sock` etc.).
- [ ] **Read-only root FS** by default; writable = tmpfs scratch + declared volumes.
- [ ] **Seccomp**: documented syscall allow-list; rest fail `EPERM`.
- [ ] **Capabilities** dropped to minimal (no `CAP_NET_ADMIN`/`SYS_ADMIN`/`SYS_PTRACE` etc.); additions by exception, audit-logged.
- [ ] **Resource limits** (CPU/RAM/PID/open-files) enforced per Theme 2 (E6).

### Verification
- [ ] Automated suite confirms each sandboxing constraint fails-to-schedule or fails-at-runtime when violated. Runs every release.

### Audit and visibility
- [ ] Each scan audit-logged: digest, scanner version, decision, finding counts by severity.
- [ ] Each block-causing termination audit-logged: env id, partner id, digest, reason.
- [ ] Partners see own-image scan summaries (decision + severity counts); full payload by operator policy.

<!-- issue-body:end -->
