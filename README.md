# luannmoreira.dev

Personal website: portfolio, engineering blog, and the place I document how
I actually build software. Full context and migration plan live in
`ROADMAP.md` (not tracked in git — personal working file).

## Structure

This is a pnpm workspace monorepo:

```
apps/
  portfolio/   personal site (Vite + React + TypeScript)
  blog/        engineering blog (scaffolded — MDX content pipeline pending, see ROADMAP.md)
packages/      shared config: config-typescript, config-eslint, config-tailwind
```

Each app is independently runnable and deployable; they share tooling
config, not runtime code, unless a real duplication shows up.

## Getting started

Node version is pinned in `.node-version` (works with `fnm`/`nvm`/`volta`).

```sh
pnpm install
pnpm dev:portfolio       # run the portfolio app
pnpm dev:blog            # run the blog app
pnpm build:portfolio     # build the portfolio app
pnpm build:blog          # build the blog app
pnpm deploy              # publish the portfolio app to GitHub Pages (blog has no deploy target yet)
pnpm format              # format the whole repo with Prettier
```

To run any other script directly against one app: `pnpm --filter <portfolio|blog> <script>`
(e.g. `pnpm --filter portfolio test`, `pnpm --filter blog typecheck`).
