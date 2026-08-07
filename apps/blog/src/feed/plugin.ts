import { writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Plugin, ResolvedConfig } from "vite";
import { readContentEntries } from "../content/contentEntries";
import { DEFAULT_CONTENT_LOCALE } from "../content/contentDirs";
import { buildRss, buildSitemap } from "./generate";

// The root build:site/deploy scripts set SITE_URL=https://luanncurioso.dev,
// so this placeholder only kicks in for a standalone local `pnpm build:blog`
// (no other change needed once SITE_URL is set — see CLAUDE.md Gotchas).
const PLACEHOLDER_SITE_URL = "https://example.com";

export function feedPlugin(): Plugin {
  let config: ResolvedConfig;

  return {
    name: "blog-feed",
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    closeBundle() {
      if (config.command !== "build") return;

      const siteUrl = process.env.SITE_URL;
      if (!siteUrl) {
        this.warn(
          `SITE_URL is not set — sitemap.xml and rss.xml will use the ` +
            `placeholder ${PLACEHOLDER_SITE_URL}. Set SITE_URL (or run the ` +
            `root build:site/deploy scripts, which set it automatically) ` +
            `to get real URLs.`
        );
      }

      // A single English feed, no per-locale RSS (see generate.ts) — once
      // translations exist, readContentEntries() carries one raw entry per
      // locale for the same slug, so this filters back down to one entry
      // per post before building the sitemap/feed, same as always.
      const entries = readContentEntries().filter(
        (entry) => entry.locale === DEFAULT_CONTENT_LOCALE
      );
      const base = siteUrl ?? PLACEHOLDER_SITE_URL;

      writeFileSync(
        join(config.build.outDir, "sitemap.xml"),
        buildSitemap(entries, base)
      );
      writeFileSync(
        join(config.build.outDir, "rss.xml"),
        buildRss(entries, base)
      );
    },
  };
}
