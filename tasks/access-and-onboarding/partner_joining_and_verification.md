# EPIC 1 — Partner Joining & Verification

## Changes

- _Initial state._

> Part of [Theme 1 — Access & Onboarding](README.md). v0.2 anchors: §1 principle 7, §9.1 (this epic IS the "out-of-band" verification process).

<!-- issue-body:begin -->

**AS A** prospective eFTI participant
**I WANT** a documented path from "I want to test" to "I am a verified partner with access keys"
**SO THAT** joining is consistent and does not depend on knowing the right operator individual.

**Open:** verification criteria (MS designation / WG membership / contract / mix); Terms of Participation content.

## Acceptance Criteria

### Public discovery
- [ ] Public "Join the Testbed" page (linked from main entry and from E31 docs) explains: who it's for, accepted participant categories, what verification entails, expected timelines, what the access key grants.
- [ ] Reachable without authentication; indexed for search.

### Application
- [ ] Submission without an existing account; identifies organisation and primary contact.
- [ ] Application carries: legal name, ISO-3166 country, primary contact (name/role/email), participant category, declared intended use, supporting evidence references.
- [ ] Anti-abuse: source rate limiting, email verification, optional CAPTCHA per operator policy.
- [ ] Applicant receives a tracking reference for status queries.

### Vetting and decision
- [ ] Applications queue in E24 with one operator owner assigned.
- [ ] Operator records: criterion(a) checked, evidence reviewed, decision (`approved`/`rejected`/`more info needed`), justification, timestamp.
- [ ] `more info needed` notifies applicant via E26 with the missing-items list; application stays queued.
- [ ] Decisions are immutable; corrections are append-only (new row supersedes).
- [ ] Per-category turnaround target; E25 tracks adherence.

### Onboarding paperwork
- [ ] Approved applicant is shown current Terms of Participation; explicit accept (or decline, ending flow) precedes provisioning.
- [ ] Accepted Terms version stamped on the partner record (parallel to E18 Marketplace Terms).
- [ ] Terms change → partners notified (E26), re-accept within grace window; non-acceptance suspends the record and cascades to all keys (E2).

### Account provisioning
- [ ] Accepting Terms creates the partner record (against which E2 issues keys) and assigns default tier (E4).
- [ ] Primary contact notified via E26 with account id, first-key instructions, E31 doc links.
- [ ] First access key is **not** auto-issued — operator action per E2 still required.

### Rejection, withdrawal, reapplication
- [ ] Rejection: applicant notified with decision + justification + any appeal path.
- [ ] Withdrawal allowed before decision; marked withdrawn, retained for audit.
- [ ] Reapplication after rejection allowed after documented cool-off; processed independently, may reference prior decision.

### Auditability
- [ ] Every state transition (submitted, info-requested, approved, rejected, withdrawn, terms-accepted, partner-record-created) audit-logged (E28).
- [ ] Personal data of rejected / withdrawn applicants retained per documented schedule.
- [ ] Operator decisions individually attributable so consistency can be defended post-hoc.

<!-- issue-body:end -->
