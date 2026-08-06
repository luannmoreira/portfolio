# luanncurioso.dev

Personal website: portfolio, engineering blog, and the place I document how
I actually build software.

## Structure

This is a pnpm workspace monorepo:

```
apps/
  portfolio/   personal site (Vite + React + TypeScript)
  blog/        engineering blog — MDX content pipeline, authoring components, real routing
packages/
  config-typescript/  config-eslint/  config-tailwind/   shared config only, no runtime code
  i18n/                shared i18n runtime (react-i18next setup, locale resolution)
  ui/                   shared runtime UI (Navbar, LanguageSwitcher, focus-trap hook)
```

Each app is independently runnable and deployable. `packages/config-*` is shared tooling
config only; `packages/i18n` and `packages/ui` are shared runtime code, extracted into
`packages/` once both apps needed the same behavior rather than duplicated up front.

## Getting started

Two ways to run this locally — pick whichever fits.

### Directly with pnpm

Node version is pinned in `.node-version` (works with `fnm`/`nvm`/`volta`). pnpm itself is
pinned via `packageManager` in `package.json` — enable [Corepack](https://nodejs.org/api/corepack.html)
once (`corepack enable`) and it installs the pinned pnpm version automatically on first use, or
install pnpm directly per its [own docs](https://pnpm.io/installation).

```sh
pnpm install
pnpm dev:portfolio       # run the portfolio app
pnpm dev:blog            # run the blog app
pnpm build:portfolio     # build the portfolio app
pnpm build:blog          # build the blog app
pnpm deploy              # build both apps and publish to Cloudflare Pages (luanncurioso.dev)
pnpm format              # format the whole repo with Prettier
```

`pnpm deploy` needs `CLOUDFLARE_API_TOKEN` set in the environment (or in a gitignored
`.env.local`) — most contributors will never need to run it directly.

To run any other script directly against one app: `pnpm --filter <portfolio|blog> <script>`
(e.g. `pnpm --filter portfolio test`, `pnpm --filter blog typecheck`).

### Testing

Each app has its own lint, typecheck, unit test, and end-to-end suite, run per app:

```sh
pnpm --filter <portfolio|blog> lint        # ESLint (lint:fix to autofix)
pnpm --filter <portfolio|blog> typecheck   # tsc --noEmit
pnpm --filter <portfolio|blog> test        # Vitest (test:watch for watch mode)
pnpm --filter <portfolio|blog> e2e         # Playwright
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

Both containers bind-mount the repo, so edits on the host hot-reload
inside the container exactly like running Vite directly. This is
dev-only — neither app runs as a server in production; both deploy as
static builds.
