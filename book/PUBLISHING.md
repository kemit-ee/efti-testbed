# Publishing the book (handoff notes)

For whoever pushes this: a person or another Claude instance with access to the GitHub account. Goal: get the mdBook live at **https://kemit-ee.github.io/efti-testbed/**.

## State of things

- Branch **`planning/v0.3`**, based on `planning/v0.2`. It is already merged into `origin/main` (PR #45), so a PR from this branch shows only the v0.3 and book changes.
- Tag **`v0.3`** (annotated) points at the tip of `planning/v0.3`. It marks architecture v0.3 and the first public book.
- Two commits: `architecture/v0.3.md`, then the book (`book/`), the CI workflow (`.github/workflows/book.yml`) and a `.gitignore` entry for `_site/`.
- **Nothing has been pushed.** The remote is `origin` = `https://github.com/kemit-ee/efti-testbed`.
- Local `main` is stale (behind `origin/main`). Ignore it and do not merge locally.

## How publishing works

`.github/workflows/book.yml` does two things:

| Event | What happens |
|---|---|
| Pull request touching `book/**` or the workflow | **Build only**, no deploy. This is the check. |
| Push to `main` touching `book/**` or the workflow (e.g. merging the PR) | Build, then **deploy to GitHub Pages**. |
| `workflow_dispatch` (manual run) | Same as push, only if run on `main`. |

The deploy job runs **only on `refs/heads/main`**. Pushing a branch or the tag deploys nothing. Merging to `main` is the publish step.

It builds with `mdbook` 0.4.52 and `mdbook-mermaid` 0.14.1 (installed with `cargo install`, cached). The first run compiles them and takes several minutes. Output goes to `_site/` at the repo root.

## Steps

1. **Check auth.** `gh auth status`. Pushing `.github/workflows/*` needs a token with the **`workflow`** scope. If the push is rejected for that reason: `gh auth refresh -h github.com -s workflow` (interactive, so ask the user).
2. **Push the branch and the tag.**
   ```
   git push -u origin planning/v0.3
   git push origin v0.3
   ```
   Do not force-push. Do not move or delete the `v0.3` tag.
3. **Open a PR into `main`.**
   ```
   gh pr create --base main --head planning/v0.3 \
     --title "v0.3: architecture and public mdBook" \
     --body "Adds architecture v0.3 (code confidentiality, zero-touch deployment, security testing) and the mdBook for kemit-ee.github.io/efti-testbed. See book/PUBLISHING.md."
   gh pr checks --watch
   ```
   The `build` check must pass (it runs `mdbook build book`).
4. **Enable GitHub Pages once (needs repo admin), before merging.**
   ```
   gh api repos/kemit-ee/efti-testbed/pages
   ```
   - If that returns 404 (Pages not enabled): `gh api -X POST repos/kemit-ee/efti-testbed/pages -f build_type=workflow`
   - If it exists but `build_type` is not `workflow`: `gh api -X PUT repos/kemit-ee/efti-testbed/pages -f build_type=workflow`
   - If you lack admin rights: ask the user to set **Settings → Pages → Source = GitHub Actions**.

   Also check `gh repo view kemit-ee/efti-testbed --json visibility`. On a private repo, Pages needs a paid plan.
5. **Merge the PR with a merge commit** (`gh pr merge <n> --merge`), not squash or rebase. This matches how PR #45 was merged and keeps the `v0.3` tag in `main`'s history. **Merging publishes the site, so only do it if the user has asked you to publish.** If `main` is protected or needs review, stop and tell the user.
6. **Watch the deploy.** `gh run list --workflow book.yml` then `gh run watch <id>`. The `deploy` job prints the page URL.

## Verify

- `curl -sI https://kemit-ee.github.io/efti-testbed/ | head -1` should be `200`. Allow a minute after the deploy.
- Mermaid renders in the **browser**, so curl cannot prove the diagrams work. If a headless browser exists, screenshot `.../partner-journey.html` and check that the swimlane (three coloured lanes: Operator, Partner, Testbed) is drawn:
  ```
  google-chrome --headless --no-sandbox --virtual-time-budget=8000 --window-size=1100,1500 \
    --screenshot=/tmp/check.png https://kemit-ee.github.io/efti-testbed/partner-journey.html
  ```

## If something fails

| Symptom | Likely cause and fix |
|---|---|
| Deploy job: Pages not enabled / `Not Found` | Step 4 was skipped. Enable Pages, then re-run the failed job. |
| Deploy job: "Branch ... is not allowed to deploy to github-pages" | Settings → Environments → `github-pages` → deployment branches: allow `main`. |
| Push rejected, mentions `workflow` scope | Step 1. |
| Build fails installing tools | Network or crates.io issue. Re-run. Versions are pinned in the workflow `env`. |
| Site is up but diagrams show raw text | `book/mermaid.min.js` is missing or was overwritten (see below). |
| Docs-only change does not redeploy | The path filter. Run `gh workflow run book.yml --ref main`. |
| 404 on all pages after a green deploy | Wait a minute. Then check Pages source and that `site-url` in `book/book.toml` is `/efti-testbed/`. |

## Do not

- **Do not run `mdbook-mermaid install`.** It overwrites `book/mermaid.min.js`, which is deliberately **Mermaid 11.17.2**. The book uses the beta `swimlane-beta` diagram type, which the bundled Mermaid does not support. See `book/README.md`.
- Do not upgrade Mermaid to 12.x without checking every page; 12.0 changes default themes and looks.
- Do not edit `_site/`. It is generated and git-ignored.
- Do not alter the `v0.3` tag. If something needs fixing after tagging, make a new commit and ask the user whether to tag again.

## Good to know

- Local builds with `mdbook` 0.4.40 print a version warning. That is harmless; CI uses 0.4.52.
- The book follows **architecture v0.3**. The 31 epics under `tasks/` are still written against v0.2. The book says so on the "How it is built and delivered" and "Technical documentation" pages.
- GitHub's own file preview of `book/src/*.md` may not render `swimlane-beta` diagrams. The published site will.
- The Welcome page links the repository. "Version history" ends with the author's contact details.
