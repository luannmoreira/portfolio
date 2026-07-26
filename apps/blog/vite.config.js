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
          [rehypePrettyCode, { theme: "github-dark" }],
        ],
      }),
    },
    react({ include: /\.(js|jsx|md|mdx|ts|tsx)$/ }),
    contentIndexPlugin(),
    feedPlugin(),
  ],
  // No "base" yet — deploy target is deliberately undecided (see
  // ROADMAP.md Phase 7), so this stays at Vite's "/" default until a host
  // is picked.
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
