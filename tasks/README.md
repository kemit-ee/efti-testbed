# eFTI Testbed — Themes & Epics

Themes are stakeholder-overview (login-setup-observe abstraction). Epics carry the business-level AC. Tasks are technical and deferred. Anchored to [`../architecture/v0.2.md`](../architecture/v0.2.md).

| # | Theme | Stakeholder question |
|---|---|---|
| T1 | [Access & Onboarding](access-and-onboarding/README.md) | How do partners get in? |
| T2 | [Environments](environments/README.md) | How does a partner set up a test environment? |
| T3 | [Counterparties](counterparties/README.md) | Who plays the other roles, and how real are they? |
| T4 | [Testing & Reports](testing-and-reports/README.md) | How are tests run and reports produced? |
| T5 | [User Interfaces](user-interfaces/README.md) | What do humans use to drive the testbed? |
| T6 | [Operations & Reliability](operations-and-reliability/README.md) | How is it run reliably and data kept safe? |
| T7 | [Security & Compliance](security-and-compliance/README.md) | Is it auditable? |
| T8 | [Delivery & Documentation](delivery-and-documentation/README.md) | How is it built and explained? |

**8 themes, 31 epics.** Per-epic links live in each theme's README — not duplicated here.

## Epic-file convention

Title with epic number → "Part of Theme X" pointer → user story (AS A / I WANT / SO THAT) → v0.2 anchor → **Open:** line listing open decisions → AC checklists. AC bind the contract surface, not the implementation. Cross-references use `Theme N, EM` (greppable).
