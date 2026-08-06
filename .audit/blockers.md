# Phase 0 blockers

None. Every tool in the battery ran and produced output.

## Scope notes (not blockers — record for Phase 1 auditors)

- **depcheck** ran once at the repo root and only resolved root `package.json`'s own
  devDependencies (all 8 in use, 0 unused/missing). It is not workspace-aware by default, so it
  did **not** check `apps/portfolio`, `apps/blog`, `packages/i18n`, or `packages/ui` individually.
  `react-ts-auditor`/`arch-auditor` should either re-run `pnpm exec depcheck` inside each
  workspace package or rely on `knip`'s repo-wide unused-export findings instead.
- **trivy** ran in `config` mode against the `Dockerfile` only (misconfiguration scan — found the
  container runs as root, see `.audit/tools/trivy-config.raw.json`). A full `trivy image` scan of
  the built dev image was not run in Phase 0 — the `Dockerfile` is dev-only per `CLAUDE.md`
  standing decision 3, so this was judged lower priority than the deterministic battery. Can be
  added in Phase 1 if `security-deploy-auditor` wants it.
- **lhci** (Lighthouse CI) ran once per app in `staticDistDir` mode via Playwright's bundled
  Chromium (`CHROME_PATH` exported manually this run — not hardcoded into the `pnpm` script since
  the path is user-machine-specific; see `.claude/skills/run-audit-tools/SKILL.md` item 13).
  `numberOfRuns: 1`, not the 3–5 runs typical for stable medians — fine for a first pass, note the
  variance risk to `perf-auditor`.
- **ESLint** has no JSON reporter package wired (`eslint-formatter-json` etc. not installed);
  used ESLint's own built-in `-f json` flag instead, which worked and needed no extra dependency.
- **Domain — resolved.** `luanncurioso.dev` is canonical, confirmed by the user on 2026-08-05 and
  consistent with DNS, the `wrangler` project name, and the deploy script. `README.md`'s stale
  title and GitHub Pages deploy line were corrected in the same session. `seo-auditor` and
  `docs-auditor` should treat `luanncurioso.dev` as ground truth and flag any other domain as a
  defect, not the reverse.
