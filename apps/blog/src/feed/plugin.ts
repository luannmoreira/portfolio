import { writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Plugin, ResolvedConfig } from "vite";
import { readContentEntries } from "../content/contentEntries";
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

      const entries = readContentEntries();
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
