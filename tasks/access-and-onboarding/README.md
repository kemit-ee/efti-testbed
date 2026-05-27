# Theme 1 — Access & Onboarding

## Changes

- _Initial state._

> Architecture: v0.2 §1.1, §9.

<!-- issue-body:begin -->


**Q:** How do partners get in?

Joining is the only manually-mediated step: apply → operator verifies → account exists → access keys can be issued. After that the partner is autonomous via the Portal.

## Theme done when

- [ ] [E1 — Partner Joining & Verification](partner_joining_and_verification.md): public application flow; consistent verification; approved applicants become partner records.
- [ ] [E2 — Access-Key Issuance & Partner Verification](access_key_issuance.md): operator can issue, rotate, suspend, revoke keys against verified partner records.
- [ ] [E3 — Portal Authentication & Authorisation](portal_authentication.md): partner authenticates with key; sees/mutates only their own resources.
- [ ] [E4 — Partner Tiers & Quota Model](partner_tiers_and_quotas.md): every partner has a tier; quotas enforced across env CRUD, image pulls, test-driver load.

<!-- issue-body:end -->
