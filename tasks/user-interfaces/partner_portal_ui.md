# EPIC 23 — Partner Portal UI

## Changes

- _Initial state._

> Part of [Theme 5 — User Interfaces](README.md). v0.2 anchors: §3 (Portal).

<!-- issue-body:begin -->

**AS A** verified partner
**I WANT** a web UI for the full lifecycle — login, env create, image refs, version + counterparty selection, test runs, reports
**SO THAT** I can use the testbed without integrating against raw APIs first.

**Open:** frontend tech stack.

## Acceptance Criteria

### Functional coverage
- [ ] Portal exposes every operation the API (E29) supports; no partner-facing operation is API-only.
- [ ] Where the API offers pagination/filtering/sorting, the Portal exposes them.
- [ ] Structured errors render with actionable next-step suggestions, not raw payloads.

### Onboarding flow
- [ ] First-time partner sees a guided flow: key introspection (E3), tier + quotas, "create your first env" CTA with defaults pre-populated.
- [ ] Env-create wizard: role my image plays, image refs, version-matrix selection (E11, E12), counterparty selection per slot (E17, mock fallback per Theme 3), lifecycle parameters (E8, within tier).
- [ ] Invalid version combinations rejected inline (E11), not at submit.

### Day-to-day flows
- [ ] **Envs**: list, inspect, stop, delete; tags / filter / search.
- [ ] **Images**: declare refs, view scan summaries (E10), see cached digests in use.
- [ ] **Tests**: trigger prescribed suite or playground scenario; watch progress; stream results where possible.
- [ ] **Reports**: list, read, download (E21, E22); share-link creation (E22).
- [ ] **Marketplace**: browse counterparties filtered by tuple (E17); opt own listings in / out (E18).
- [ ] **Account**: current tier, key status, quota usage; rotate own key via operator-provided flow.

### Accessibility, i18n
- [ ] WCAG 2.1 AA at a documented coverage level.
- [ ] English baseline; localisation plumbed even if v1 ships one language.
- [ ] Dates / times displayed in partner locale; underlying records UTC.

### Notifications
- [ ] In-Portal centre reflects partner notification stream from E26; read/unread tracked.
- [ ] Critical notifications also render as banners on relevant pages.

### Trust and safety
- [ ] No partner credential in URL or browser storage plaintext.
- [ ] Tokens / cookies: HTTP-only, Secure, SameSite=Lax+.
- [ ] CSRF on every mutating action.

### Docs integration
- [ ] Every page links to relevant section in E31; help one click away.

<!-- issue-body:end -->
