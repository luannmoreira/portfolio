# luanncurioso.dev

[![CI](https://github.com/luannmoreira/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/luannmoreira/portfolio/actions/workflows/ci.yml)

Personal website: portfolio, engineering blog, and the place I document how I
actually build software. The repo itself is part of the portfolio — CI gates,
accessibility checks, and architecture decisions are all real, not staged for
show.

**Live:** [luanncurioso.dev](https://luanncurioso.dev) · blog at
[luanncurioso.dev/blog](https://luanncurioso.dev/blog) · architecture decision
records at [luanncurioso.dev/adr](https://luanncurioso.dev/adr)

## Tech stack

- **Frontend** — React 18 + TypeScript, Vite, Tailwind CSS v4 (one shared
  token file drives both apps' design system)
- **Routing** — react-router v7 data routers (`createBrowserRouter`), chosen
  specifically so `<ScrollRestoration/>` works correctly
- **Content** — MDX for the blog (posts, project write-ups, ADRs), Zod-
  validated frontmatter, per-post code-splitting, Mermaid diagrams compiled
  to static SVG at build time
- **i18n** — react-i18next, English and Brazilian Portuguese, including
  locale-aware blog content with fallback for untranslated posts
- **Testing** — Vitest + Testing Library for units, Playwright +
  `@axe-core/playwright` for end-to-end and accessibility
- **CI/CD** — GitHub Actions (lint/typecheck/test/e2e/build on every push,
  Trivy image scanning), deploys to Cloudflare Pages on version tags

## Structure

This is a pnpm workspace monorepo:

```
apps/
  portfolio/               personal site/resume — BrowserRouter, no MDX
    src/pages/                route-level pages (Home, About, Resume, Projects)
    e2e/                       Playwright specs
  blog/                     engineering writing — BrowserRouter, MDX content pipeline
    content/{blog,projects,adr}/{en,pt-BR}/   authored MDX content, per locale
    src/content/               frontmatter schema, content loader, virtual content index
    src/mdx/                   authoring component registry (Callout, Terminal, FileTree, …)
    e2e/                       Playwright specs
packages/
  config-typescript/  config-eslint/  config-tailwind/   shared tooling config, no runtime code
  i18n/                     shared i18n runtime (react-i18next setup, locale resolution)
  ui/                       shared runtime UI (Navbar, LanguageSwitcher, focus-trap hook)
.github/workflows/
  ci.yml                    lint/typecheck/test/e2e/build on every push to main and every PR
  deploy.yml                build + deploy to Cloudflare Pages, version tags only
```

Each app is independently runnable and independently deployable, but both
ship together as one Cloudflare Pages build (the blog's build output gets
merged into the portfolio's `dist/blog`, so they share one origin/domain).
They never import each other's code directly — anything both need lives in
`packages/`, and only moves there once a second app actually needs it rather
than being extracted preemptively.

## Notable features

- **Dual-language content, not just UI strings.** Blog posts live under a
  locale subdirectory (`content/blog/en/`, `content/blog/pt-BR/`); an
  untranslated post falls back to English with a visible notice rather than
  breaking or silently hiding.
- **Accessibility is a CI gate, not an afterthought.** Every route is
  axe-checked in both light and dark themes as part of the e2e suite — a new
  route without that coverage is treated as an incomplete route.
- **Architecture Decision Records as real content.** Non-obvious engineering
  choices (why `BrowserRouter` over `HashRouter`, why one Dockerfile with
  multiple stages, etc.) are written up as ADRs and published at `/adr`,
  not left to a `git log -p` archaeology dig.
- **Real code-splitting for content.** Blog post metadata comes from a
  build-time virtual module, decoupled from the compiled MDX component, so
  nothing eagerly imports a post's JS just to read its title — each post
  ships its own chunk.
- **No flash of wrong theme.** The dark/light choice is read from
  `localStorage` and applied synchronously before first paint, in both apps
  independently (they're separate SPA bundles sharing one origin).

## Getting started

Two ways to run this locally — pick whichever fits.

### Directly with pnpm

Node version is pinned in `.node-version` (works with `fnm`/`nvm`/`volta`).
pnpm itself is pinned via `packageManager` in `package.json` — enable
[Corepack](https://nodejs.org/api/corepack.html) once (`corepack enable`) and
it installs the pinned pnpm version automatically on first use, or install
pnpm directly per its [own docs](https://pnpm.io/installation).

```sh
pnpm install
pnpm dev:portfolio       # run the portfolio app
pnpm dev:blog            # run the blog app
pnpm build:portfolio     # build the portfolio app
pnpm build:blog          # build the blog app
pnpm deploy              # build both apps and publish to Cloudflare Pages (luanncurioso.dev)
pnpm format               # format the whole repo with Prettier
```

`pnpm deploy` needs `CLOUDFLARE_API_TOKEN` set in the environment (or in a
gitignored `.env.local`) — most contributors will never need to run it
directly.

To run any other script directly against one app:
`pnpm --filter <portfolio|blog> <script>` (e.g. `pnpm --filter portfolio
test`, `pnpm --filter blog typecheck`).

### Testing

Each app has its own lint, typecheck, unit test, and end-to-end suite, run
per app:

```sh
pnpm --filter <portfolio|blog> lint        # ESLint (lint:fix to autofix)
pnpm --filter <portfolio|blog> typecheck   # tsc --noEmit
pnpm --filter <portfolio|blog> test        # Vitest (test:watch for watch mode)
pnpm --filter <portfolio|blog> e2e         # Playwright, includes axe-core accessibility checks
```

First e2e run needs the browsers installed once:
`pnpm --filter <portfolio|blog> exec playwright install --with-deps chromium`.

### With Docker Compose

No local Node/pnpm install needed — just Docker.

```sh
docker compose up --build
```

- Portfolio: http://localhost:5173/
- Blog: http://localhost:5174/

Both containers bind-mount the repo, so edits on the host hot-reload inside
the container exactly like running Vite directly. This is dev-only — neither
app runs as a server in production; both deploy as static builds.

## Content pipeline

Blog content (posts, project write-ups, ADRs) is authored as MDX under
`apps/blog/content/{blog,projects,adr}/<locale>/*.mdx`, one file per language
per slug. Frontmatter (`title`, `date`, `tags`, `excerpt`, `draft`) is
validated against a Zod schema at build time; `type` and `locale` are never
hand-written — both are derived from the file's own location, so a file can
never claim a type or language it doesn't actually live in. A Vite plugin
serves that parsed frontmatter through a virtual module, separate from the
compiled MDX components themselves, which is what keeps per-post code-
splitting real rather than accidentally defeated by an eager import.

Authoring components available inside MDX — `Callout`/`Note`/`Tip`/
`Warning`/`Tradeoff`, a `FileTree` family, and `Terminal` — are wired in
through an `MDXProvider`. Mermaid diagrams render to static SVG at build
time rather than shipping a client-side rendering library. `sitemap.xml` and
`rss.xml` are generated from the same content at build time.

## CI/CD

`.github/workflows/ci.yml` runs on every push to `main` and every pull
request: format check, lint/typecheck/test/build per app and per shared
package, a full Playwright e2e run (accessibility included) per app, and a
Trivy vulnerability scan of the dev Docker images. `.github/workflows/
deploy.yml` only fires on a version tag (`v*.*.*`) — merging to `main` never
deploys by itself; a deploy stays a deliberate, separate action.
