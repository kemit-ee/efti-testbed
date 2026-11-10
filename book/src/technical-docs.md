# Technical documentation

This book is the business-level view. The full technical design is kept in the repository and keeps evolving.

> **Version followed by this book:** architecture **v0.3**. When the architecture moves on, this page and the affected chapters are updated.

## Where to find the details

| What | Where |
|---|---|
| Current architecture (v0.3) | [`architecture/v0.3.md`](https://github.com/kemit-ee/efti-testbed/blob/main/architecture/v0.3.md) |
| Version history (what changed, in plain words) | [Version history](version-history.md) |
| Previous versions | [v0.2](https://github.com/kemit-ee/efti-testbed/blob/main/architecture/v0.2.md), [v0.1](https://github.com/kemit-ee/efti-testbed/blob/main/architecture/v0.1.md) |
| Themes and epics with acceptance criteria | [`tasks/`](https://github.com/kemit-ee/efti-testbed/tree/main/tasks) |
| Source of this book | [`book/`](https://github.com/kemit-ee/efti-testbed/tree/main/book) |

## What changed in v0.3

- **Source-code confidentiality** became a first-class requirement.
- **Zero-touch deployment**: every step from software reference to running environment is automatic.
- **Security testing and a shared attack library** were added as a capability.
- Partner software is pulled from a **private** store with a scoped credential.

## Status of the epics

The 31 epics in `tasks/` were written against architecture v0.2. They are being brought up to v0.3. The three additions above still need their own epics. See [How it is built and delivered](delivery.md).
