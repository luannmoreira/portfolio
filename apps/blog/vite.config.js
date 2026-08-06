import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeMermaid from "rehype-mermaid";
import tailwindcss from "@tailwindcss/vite";
import { feedPlugin } from "./src/feed/plugin.ts";
import { contentIndexPlugin } from "./src/content/contentIndexPlugin.ts";

export default defineConfig({
  plugins: [
    // enforce: "pre" so this runs before react()'s transform — @mdx-js/rollup
    // compiles .mdx to JSX that react() then still needs to process (Fast
    // Refresh, etc.), so react()'s own include is widened below to match.
    {
      enforce: "pre",
      ...mdx({
        // Without this, compiled MDX never calls useMDXComponents() at
        // all, so MDXProvider (9.8) has zero effect regardless of what's
        // passed to it — the compiled output just uses local/no-op
        // components unless told to source them from @mdx-js/react.
        providerImportSource: "@mdx-js/react",
        // remarkFrontmatter strips the YAML block out of the rendered
        // content; remarkMdxFrontmatter also exposes it as a `frontmatter`
        // named export (unused at runtime now — content/loader.ts reads
        // metadata from virtual:content-index instead, see
        // contentIndexPlugin.ts — but the stripping behavior is still
        // load-bearing, so both plugins stay).
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
        rehypePlugins: [
          // Must run before rehype-pretty-code: it targets the same
          // <pre><code class="language-mermaid"> shape rehype-pretty-code
          // would otherwise syntax-highlight as if it were plain code.
          [rehypeMermaid, { strategy: "inline-svg", colorScheme: "dark" }],
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          [
            rehypePrettyCode,
            { theme: { dark: "github-dark", light: "github-light" } },
          ],
        ],
      }),
    },
    react({ include: /\.(js|jsx|md|mdx|ts|tsx)$/ }),
    tailwindcss(),
    contentIndexPlugin(),
    feedPlugin(),
  ],
  // Deployed as a subfolder of the portfolio's Cloudflare Pages project
  // (dist/blog/) so the two apps share luanncurioso.dev — the app's own
  // routes are already absolute ("/blog", "/adr", see App.tsx), so this
  // only needs to fix up asset URLs, not add a router basename. Gated
  // behind BASE_PATH (set by the root "build:site" script) rather than
  // hardcoded: vite's `base` also changes where its own dev/preview server
  // serves the app from, which would break this app's independent
  // dev/build/e2e workflow (see SITE_URL in feed/plugin.ts for the same
  // set-only-at-merge-time pattern).
  base: process.env.BASE_PATH ?? "/",
  test: {
    environment: "jsdom",
    globals: true,
    clearMocks: true,
    setupFiles: "./src/test-setup.ts",
    // Scoped to src/ so Vitest never tries to run Playwright's e2e specs
    // as its own tests (same fix as portfolio's vite.config.js).
    include: ["src/**/*.{test,spec}.{js,jsx,ts,tsx}"],
  },
});
