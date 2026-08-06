# Release Audit — luanncurioso.dev (portfolio + blog monorepo) — 2026-08-06 — commit 03b639a

## 1. Verdict

**BLOCKED** · Readiness 33/100 · Overall quality 6.2/10

5 critical findings, 4 of 9 blocking gates red. Estimated time to a clean **APPROVED WITH
RESERVATIONS** (Wave 1 only): ~1.5–2 days. Full **APPROVED** additionally needs Wave 2 (~3–4
more days) since Documentation and A11y both carry High findings that gate APPROVED outright.

## 2. Scoreboard

Mapped to this pipeline's 9 actual audit domains, not the rubric's original 11 — Code and
React/TS were run as one combined pass here, and Security/Deploy as one combined pass. See
§7 for why.

| Dimension              | Score | Crit | High | Med | Low | Lowered by                                                                     |
| ---------------------- | ----- | ---- | ---- | --- | --- | ------------------------------------------------------------------------------ |
| A11y (×2 weight)       | 2.5   | 2    | 2    | 1   | 0   | A11Y-001, A11Y-002, A11Y-003, A11Y-004, A11Y-005                               |
| Documentation (×2)     | 3.5   | 1    | 3    | 2   | 2   | DOCS-001, DOCS-002, DOCS-003, DOCS-004, DOCS-007, DOCS-008, DOCS-009, DOCS-010 |
| SEO                    | 4.0   | 1    | 3    | 2   | 0   | SEO-001, SEO-002, SEO-003, SEO-004, SEO-005, SEO-006                           |
| Tests                  | 6.0   | 1    | 1    | 2   | 1   | TEST-001, TEST-004, TEST-002, TEST-005, TEST-006                               |
| Performance            | 7.5   | 0    | 2    | 2   | 1   | PERF-001, PERF-002, PERF-003, PERF-004, PERF-005                               |
| Code / React-TS        | 8.5   | 0    | 1    | 0   | 3   | REACT-TS-001, REACT-TS-002, REACT-TS-003, REACT-TS-004                         |
| Architecture           | 8.5   | 0    | 0    | 2   | 7   | ARCH-001, ARCH-002, ARCH-003…011                                               |
| Security & Deploy (×2) | 9.0   | 0    | 0    | 2   | 4   | SEC-001, SEC-002, SEC-003, SEC-004, SEC-005, SEC-006                           |
| Content                | 9.5   | 0    | 0    | 1   | 1   | CONTENT-002, CONTENT-001/ARCH-009                                              |

**Overall (weighted mean, A11y/Documentation/Security weigh 2×):** 74 / 12 = **6.2 / 10**

## 3. Blockers (do now — Wave 1)

**A11Y-001 · Critical · confidence 0.97** — Light-theme active nav-link text fails color
contrast: 4.41:1 measured against a required 4.5:1, on every route in both apps whenever that
route's own nav item is active. Root cause: `packages/config-tailwind/theme.css:133`'s
`--color-primary` (#2d7670) against the navbar's composited translucent background (~#e7eaed,
from `packages/ui/src/Navbar.tsx:103`'s `bg-surface-container/80` + backdrop-blur). This is
the same design-token seam both apps share, so one token fix clears it everywhere.
→ Fix: lighten `--color-primary` in `:root.light`, or drop the navbar's translucency, then
re-verify every other light-theme use of the token (buttons, links, focus ring). Effort: S.

**A11Y-002 · Critical · confidence 0.95** — Collapsed timeline detail panels
(`apps/portfolio/src/components/TimelineItem.tsx:158-212`) leave their links keyboard-focusable
while `aria-hidden="true"`. Fails in **both** themes, all locales/viewports on `/` — confirmed
on two separate milestone panels, so it's the general pattern for every milestone with links,
not a one-off. → Fix: `tabIndex={-1}` or native `inert` on the panel while collapsed (the pattern
`packages/ui/src/Navbar.tsx` already uses for its own overlay). Effort: S.

**TEST-001 · Critical · confidence 0.97** — 22 accessibility test titles flip pass/fail across
identical repeated runs (18 of them independent of A11Y-001/002, most likely a font/DOM-settle
race under parallel workers, not the two contrast/focus bugs above). Playwright's own `flaky`
stat reads 0 for both apps — it doesn't compare across `--repeat-each` runs, so this is real,
verified non-determinism invisible to the number this audit's own Phase 0 first reported.
Consequence: any CI run that lands on the "pass" side of this coin-flip ships a real regression
silently. → Fix: replace `apps/portfolio/e2e/accessibility.spec.ts:34`'s fixed
`waitForTimeout(1600)` (TEST-002) with an explicit settle condition
(`document.fonts.ready`-based), add the same explicit wait to blog's spec (which has none), then
re-run at `--repeat-each=4` and confirm zero titles flip. Effort: M.

**DOCS-001 · Critical · confidence 0.95** — README documents `pnpm deploy` with no mention that
`CLOUDFLARE_API_TOKEN` is required — the only place that's written down is the gitignored
`CLAUDE.md`, invisible to a fresh clone. A newcomer following README literally hits an opaque
`wrangler` auth failure with zero guidance anywhere they can see. → Fix: one line in README
stating the credential requirement. Effort: XS.

**SEO-001 · Critical · confidence 1.0** — Blog's `useDocumentMeta` hook
(`apps/blog/src/hooks/useDocumentMeta.ts:1-21`) only sets `title` and `description` — missing
every `og:*`/`twitter:*` tag and canonical URL that portfolio's equivalent hook already sets.
Every blog post and ADR shared on social media gets no preview card. → Fix: bring blog's hook up
to portfolio's existing implementation (the pattern to copy already exists in this repo).
Effort: S.

## 4. Roadmap by wave

| Wave                  | Content                                                                                                                                                | Exit gate                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| **1 — Blockers**      | A11Y-001, A11Y-002, TEST-001 (+TEST-002), DOCS-001, SEO-001                                                                                            | `verify-gate` gates 1–9 green                          |
| **2 — High priority** | A11Y-003, A11Y-004, DOCS-002/003/004, SEO-002/003/004, PERF-001+TEST-003 (merged, see §5 note), TEST-004, REACT-TS-001, PERF-002                       | Zero High in a11y/security/docs; journey coverage ≥80% |
| **3 — Performance**   | PERF-003, PERF-004, PERF-005; re-run `lhci` once the `tslib_1.__spreadArray` tooling bug is fixed (Core Web Vitals are currently unmeasured, not zero) | Real CWV numbers exist and meet targets                |
| **4 — Consistency**   | CONTENT-001/ARCH-009, CONTENT-002, A11Y-005, SEO-005/006, TEST-005/006                                                                                 | `cspell` dictionary applied; visual review             |
| **5 — Architecture**  | ARCH-001 (dir cycle), ARCH-002 (dead export), ARCH-003/004/006/008/011 (small cleanups)                                                                | Zero cycles (already true); no regressions             |
| **6 — Documentation** | DOCS-007, DOCS-008, DOCS-009, DOCS-010/ARCH-010, ARCH-005/007 (content decisions), SEC-001/002/005/006                                                 | Newcomer completes setup unaided                       |

**Order rationale:** performance work is placed after the a11y/docs/SEO blockers deliberately —
several of Wave 3's numbers (Lighthouse CWV) are currently `null` from a tooling bug, not
measured-and-bad, so there's nothing yet to optimize against with confidence. Architecture is
last per the audit's own ground rules: none of it is urgent, most of it is `effort: XS`
housekeeping, and touching it before the real bugs are fixed would be motion without progress.

## 5. Full backlog

| ID                     | Severity | Domain       | Title                                                                                                                                                            | Effort |
| ---------------------- | -------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| A11Y-001               | Critical | a11y         | Light-theme nav-link contrast 4.41:1 vs 4.5:1 required                                                                                                           | S      |
| A11Y-002               | Critical | a11y         | Collapsed timeline panels: focusable links while `aria-hidden`                                                                                                   | S      |
| TEST-001               | Critical | tests        | 22 a11y tests flip pass/fail across identical runs                                                                                                               | M      |
| DOCS-001               | Critical | docs         | README omits required `CLOUDFLARE_API_TOKEN` for `pnpm deploy`                                                                                                   | XS     |
| SEO-001                | Critical | seo          | Blog `useDocumentMeta` missing OG/Twitter/canonical entirely                                                                                                     | S      |
| A11Y-003               | High     | a11y         | Timeline "Detalhes"/"Mostrar tudo" buttons under 24×24px                                                                                                         | XS     |
| A11Y-004               | High     | a11y         | Blog empty tag-filter result has no live region                                                                                                                  | XS     |
| PERF-001 / TEST-003    | High     | perf+tests   | No catch-all route in portfolio → unmatched paths crash into React Router's raw error boundary (see §6 note — independently reproduced, not the homepage itself) | S      |
| PERF-002               | High     | perf         | Blog has zero route-level code splitting (51% unused bytes in main chunk)                                                                                        | S      |
| TEST-004               | High     | tests        | Blog skip-link ships with zero keyboard-nav e2e coverage                                                                                                         | S      |
| REACT-TS-001           | High     | react-ts     | `useLocale` state doesn't sync across instances — stale locale-formatted dates after switching language                                                          | S      |
| DOCS-002               | High     | docs         | README has zero testing/lint/typecheck guidance                                                                                                                  | S      |
| DOCS-003               | High     | docs         | `packages/i18n`/`ui`'s cross-app exports have zero JSDoc                                                                                                         | S      |
| DOCS-004               | High     | docs         | `CLAUDE.md` is the only architecture reference and is untracked (known, deferred by user to post-release)                                                        | M      |
| SEO-002                | High     | seo          | Blog `index.html` static template lacks OG/Twitter/canonical                                                                                                     | XS     |
| SEO-003                | High     | seo          | Blog posts lack JSON-LD `BlogPosting` schema                                                                                                                     | M      |
| SEO-004                | High     | seo          | Bilingual site (en/pt-BR) has no `hreflang` tags                                                                                                                 | M      |
| SEC-001                | Medium   | security     | No CSP/HSTS/Permissions-Policy on production                                                                                                                     | S      |
| SEC-003                | Medium   | security     | react-router HIGH advisory present but not exploitable (client-SPA only, no RSC)                                                                                 | M      |
| ARCH-001               | Medium   | arch         | Directory-level cycle: `content/`↔`feed/` (file-level clean per madge)                                                                                           | XS     |
| ARCH-002               | Medium   | arch         | `packages/i18n` exports dead `withLocale()` with a self-contradicting comment                                                                                    | XS     |
| DOCS-007               | Medium   | docs         | `packages/i18n` has no CI job, unlike `packages/ui`                                                                                                              | S      |
| DOCS-008               | Medium   | docs         | ADR pipeline shipped but never used for a real decision                                                                                                          | M      |
| PERF-003               | Medium   | perf         | Both locale bundles ship eagerly regardless of resolved locale                                                                                                   | S      |
| PERF-004               | Medium   | perf         | Google Fonts third-party-hosted, adds a request hop                                                                                                              | S      |
| TEST-002               | Medium   | tests        | Fixed `waitForTimeout(1600)` anti-pattern (root cause partner of TEST-001)                                                                                       | S      |
| TEST-005               | Medium   | tests        | No e2e for real theme-toggle click/persist behavior                                                                                                              | S      |
| SEO-005                | Medium   | seo          | Blog `ContentIndex` meta call omits description                                                                                                                  | XS     |
| SEO-006                | Medium   | seo          | No `BreadcrumbList` JSON-LD                                                                                                                                      | S      |
| CONTENT-002            | Medium   | content      | `GithubIcon` component misspells "GitHub" (aria-labels already correct)                                                                                          | S      |
| A11Y-005               | Medium   | a11y         | Timeline detail-panel links under 24×24px (lower confidence, judgment call)                                                                                      | XS     |
| REACT-TS-002           | Low      | react-ts     | `Post.tsx` copy-link timer has no unmount cleanup                                                                                                                | XS     |
| REACT-TS-003           | Low      | react-ts     | 2 knip-flagged dead type exports confirmed real                                                                                                                  | XS     |
| REACT-TS-004           | Low      | react-ts     | Unused `typescript-eslint` devDependency in `ui`/`i18n`                                                                                                          | XS     |
| PERF-005               | Low      | perf         | `reportWebVitals()` called with no callback — field CWV never collected                                                                                          | XS     |
| TEST-006               | Low      | tests        | Brittle `.text-plate` CSS-class selector in 2 e2e specs                                                                                                          | XS     |
| SEC-002                | Low      | security     | Hashed assets cached 4h instead of far-future immutable                                                                                                          | XS     |
| SEC-004                | Low      | security     | brace-expansion advisories are lint-tooling-only, not shipped                                                                                                    | XS     |
| SEC-005                | Low      | security     | Dockerfile has no `USER` directive (dev-only, not production)                                                                                                    | S      |
| SEC-006                | Low      | security     | `.dockerignore` doesn't exclude `.env*`                                                                                                                          | XS     |
| ARCH-003               | Low      | arch         | `pages/Contact.tsx` is a pure forwarding layer                                                                                                                   | XS     |
| ARCH-004               | Low      | arch         | `Reveal` component: over- and under-abstracted at once                                                                                                           | S      |
| ARCH-005               | Low      | arch         | Icon components byte-identical across apps; comment claims a precedent CLAUDE.md doesn't record                                                                  | S      |
| ARCH-006               | Low      | arch         | Both apps' i18n bootstrap files byte-identical                                                                                                                   | XS     |
| ARCH-007               | Low      | arch         | Unrouted `project` content type; ADR placeholder ships to sitemap/rss (product decision, pairs with DOCS-008)                                                    | XS     |
| ARCH-008               | Low      | arch         | `apps/portfolio/src/theme.css` holds component CSS, colliding by name with the real token file                                                                   | XS     |
| ARCH-009 / CONTENT-001 | Low      | arch+content | Portuguese component names/props (`Experiencia`, `Habilidades`, `anoEntrada`)                                                                                    | S      |
| ARCH-010 / DOCS-010    | Low      | arch+docs    | Root `package.json` name still reads `luannmoreira-dev`                                                                                                          | XS     |
| ARCH-011               | Low      | arch         | `apps/blog/src/mdx/` splits the MDX component registry from its own components                                                                                   | XS     |
| DOCS-009               | Low      | docs         | README never explains how to obtain `pnpm` itself                                                                                                                | XS     |

**Already fixed this session** (verified, not counted above): DOCS-005 (stale
"deploy target...decided" warning in `feed/plugin.ts`), DOCS-006 (dangling "SITE_URL below"
cross-reference in `vite.config.js`).

**Confirmed non-issues** (agents checked, found nothing — recorded so a future audit doesn't
re-derive them): DOCS-011 (linkinator's 2 "broken" links are false positives — no dev server was
running during the static scan, ports match `docker-compose.yml` exactly), SEO-007 through
SEO-010 (domain consistency, heading hierarchy, frontmatter, OG image all clean), CONTENT-003
through CONTENT-005 (library-generated identifier, consistent terminology, deliberate
`useTheme.ts` duplication per Standing decision 1), all 11 `CLAUDE.md` Standing decisions plus
the `## Conventions` section (checked independently by `arch-auditor`, none reported as
defects), zero circular dependencies at file level in either app (`madge`, confirmed twice),
zero secrets in 225 scanned commits (`gitleaks`), zero `Dockerfile` lint issues (`hadolint`).

## 6. Technical debt

| Item                                                                                                                          | Cost of carrying (per sprint)                                                     | Cost of paying                                            | Recommendation                                                                                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| No portfolio 404 route (PERF-001/TEST-003)                                                                                    | Real users hitting a stale/mistyped link see an unbranded dev-mode error screen   | 1 component + 1 route + e2e coverage, ~S effort           | Pay now — Wave 2, this is a real user-facing reliability gap, not cosmetic                                                                                                                                        |
| Untracked `CLAUDE.md`/`ROADMAP.md`-class knowledge (DOCS-004)                                                                 | A second machine/collaborator has zero access to routing/theming/deploy rationale | Extracting to a tracked `docs/ARCHITECTURE.md`, ~M effort | User already deferred this to post-release — correctly scoped as a policy decision, not a bug                                                                                                                     |
| `packages/i18n`'s `withLocale()` dead export (ARCH-002)                                                                       | Actively misleads the next reader with a false two-origin premise                 | Pure deletion, XS                                         | Pay now, zero blast radius, already proven by grep                                                                                                                                                                |
| Blog has no code-splitting beyond per-post MDX (PERF-002)                                                                     | Every blog page pays for `Post`+9 MDX components it may not render                | Mirror portfolio's existing `lazy()` pattern, S           | Pay in Wave 2 — the pattern to copy already exists in this repo                                                                                                                                                   |
| Two agents (`content-consistency`, `arch`) independently flagged the same Portuguese-identifier issue at different severities | Minor: two auditors spent overlapping effort                                      | N/A — synthesis already reconciled it                     | Fixed in this report; a future `content-consistency-auditor` run should re-check its own severity rubric against non-user-facing identifiers (it self-contradicted its own "High only for user-facing text" rule) |

## 7. Coverage and limits of this audit

**Sampling, by domain** (see each `.audit/findings/<domain>.json`'s own `scope` field for the
full statement): `react-ts` sampled 12 of 169 TS/TSX files (top-LOC + high-churn + one
cross-app hook). `a11y` covered 102 of 176 non-test files, route-representative not
exhaustive — `/resume` and `/projects` were not independently re-scanned beyond their existing
pass/fail status. `perf` measured only `/` (both apps) via a single Lighthouse run each — no
data exists for any other route, and the portfolio's `/` measurement is contaminated by
PERF-001 (see below), while the blog's `/` measurement actually captured the NotFound page, not
the blog index, due to LHCI's `staticDistDir` mode requesting the literal `index.html` path.
`tests` read all 14 e2e specs in full and parsed both real double-run JSON reports
programmatically; unit tests were grep-sampled, not individually read. `security-deploy`,
`docs`, `seo`, and `arch` each state near-total or graph-level coverage of their domain (see
their own `scope.sampling_criterion`).

**Tooling gaps, real not invented:** Lighthouse's Core Web Vitals audits (LCP, FCP, TBT, Speed
Index, TTI, overall performance score) all returned `null` — a `tslib_1.__spreadArray is not a
function` error in Lighthouse's own bundled `intl-messageformat` dependency, a tooling defect in
this run's environment, not in either app. Only CLS survived (portfolio 0.033, blog 0, single
run each — note the sample-size-1 caveat). This must be re-run in a clean environment before any
CWV finding beyond CLS can be trusted as a number rather than a code-review judgment.

**A cross-check worth recording as methodology, not just a finding:** `perf-auditor` reported a
"critical homepage crash" from Lighthouse's raw output (a real `console.error` plus an LCP
element matching React Router's own default error-boundary text). Rather than accept that at
face value, I independently reproduced it with a real headless browser against the app's own
`pnpm preview` server: `/` on its own renders cleanly, no errors. `/index.html` (what LHCI
literally requested) and any nonexistent path both crash — because, per `test-auditor`'s
separately-derived TEST-003, the portfolio has no catch-all route at all. Two auditors, working
independently from different evidence (a Lighthouse audit vs. a route-config read), converged on
the same real defect from two directions — which is exactly the kind of cross-validation this
methodology is supposed to produce, and exactly why Phase 2 re-verifies rather than concatenates.
The severity was downgraded from the originally-reported Critical to High once reproduction
showed the homepage itself is not broken, only unmatched paths.

**One auditor (`arch`) initially reported "completed" without writing its output file** — a
false completion claim caught by checking the filesystem directly rather than trusting the
agent's own summary, then resolved by resuming the same agent with the discrepancy stated
explicitly. Recorded here because it's exactly the failure mode this audit's own operating
rules exist to catch, and it's worth knowing it happened even though the eventual output was
verified sound.

**Declared, not fabricated:** the "tested journey coverage ≥80%" figure used in Wave 2's exit
gate and the Production Readiness Score (§8) below is an estimate from `test-auditor`'s journey
map, not a tool-measured percentage — most journeys have some coverage, with clear named gaps
(404, blog keyboard-nav, theme-persist). Treat it as directional, not precise.

## 8. Engineering maturity

Against the median senior-engineer personal portfolio/blog site, this repo is **above median on
architecture and content discipline, below median on shipped-vs-tested parity**. The monorepo
shape, extract-on-second-use packaging, deterministic tool battery, and the fact that an audit
this thorough was runnable at all (real `.audit/facts.json` recon, zero circular dependencies,
zero secrets in history, a working MDX pipeline with per-post code-splitting already correct)
put it well ahead of a typical single-developer site. What pulls the readiness score down is not
sloppiness — it's a **coverage gap between what the test suite claims to guarantee and what it
actually currently guarantees**: the axe accessibility gate that's supposed to catch exactly
this class of defect (CLAUDE.md's own testing philosophy) is real, comprehensive, and currently
unreliable (TEST-001), which is how two genuine a11y regressions (A11Y-001, A11Y-002) shipped
past it. That's a fixable, well-understood problem — not an indictment of the project's overall
engineering approach.
