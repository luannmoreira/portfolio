# luannmoreira.dev

Personal website: portfolio, engineering blog, and the place I document how
I actually build software. Full context and migration plan live in
`ROADMAP.md` (not tracked in git — personal working file).

## Structure

This is a pnpm workspace monorepo:

```
apps/
  portfolio/   personal site (currently CRA — migrating to Vite + TypeScript)
  blog/        engineering blog (planned — MDX-based, see ROADMAP.md)
packages/      shared config (typescript/eslint/tailwind) — added once blog exists
```

Each app is independently runnable and deployable; they share tooling
config, not runtime code, unless a real duplication shows up.

## Getting started

Node version is pinned in `.node-version` (works with `fnm`/`nvm`/`volta`).

```sh
pnpm install
pnpm start     # runs the portfolio app
pnpm build     # builds the portfolio app
pnpm deploy    # publishes the portfolio app to GitHub Pages
```

To target a specific app directly: `pnpm --filter portfolio <script>`.
