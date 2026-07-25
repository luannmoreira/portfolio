import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

export default defineConfig({
  plugins: [
    // enforce: "pre" so this runs before react()'s transform — @mdx-js/rollup
    // compiles .mdx to JSX that react() then still needs to process (Fast
    // Refresh, etc.), so react()'s own include is widened below to match.
    {
      enforce: "pre",
      ...mdx({
        // frontmatter plugins must run first: remarkFrontmatter parses the
        // YAML block, remarkMdxFrontmatter turns it into a `frontmatter`
        // named export the content loader reads via import.meta.glob.
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          [rehypePrettyCode, { theme: "github-dark" }],
        ],
      }),
    },
    react({ include: /\.(js|jsx|md|mdx|ts|tsx)$/ }),
  ],
  // No "base" yet — deploy target is deliberately undecided (see
  // ROADMAP.md Phase 7), so this stays at Vite's "/" default until a host
  // is picked.
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test-setup.ts",
    // Scoped to src/ so Vitest never tries to run Playwright's e2e specs
    // as its own tests (same fix as portfolio's vite.config.js).
    include: ["src/**/*.{test,spec}.{js,jsx,ts,tsx}"],
  },
});
