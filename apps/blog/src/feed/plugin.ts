import { writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Plugin, ResolvedConfig } from "vite";
import { readContentEntries } from "./contentEntries";
import { buildRss, buildSitemap } from "./generate";

// Blog's deploy target is deliberately undecided (ROADMAP.md) — SITE_URL
// isn't set anywhere yet, so this falls back to an obvious placeholder
// rather than guessing a real domain. Whoever wires up deployment sets
// SITE_URL then, and sitemap.xml/rss.xml start pointing at real URLs
// without any other change here.
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
            `placeholder ${PLACEHOLDER_SITE_URL}. Set SITE_URL once the ` +
            `blog's deploy target is decided.`
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
