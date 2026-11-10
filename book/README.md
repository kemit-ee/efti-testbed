# eFTI Testbed book

Source of the public book at https://kemit-ee.github.io/efti-testbed.

Build locally (needs `mdbook` and `mdbook-mermaid`, versions pinned in `.github/workflows/book.yml`):

    mdbook serve book --open

Publishing and handoff notes: [PUBLISHING.md](PUBLISHING.md).

## Vendored Mermaid

`mermaid.min.js` is **Mermaid 11.17.2**, vendored on purpose, taken from the npm tarball (integrity checked against the registry).

- The book uses the `swimlane-beta` diagram type, which needs Mermaid 11.16 or newer. The copy that `mdbook-mermaid install` ships is older.
- **Do not run `mdbook-mermaid install`**: it overwrites this file.
- Stay on 11.x for now: Mermaid 12 changes default themes and looks.
- `swimlane-beta` is a beta syntax and may change. When upgrading Mermaid, rebuild and check every page.
