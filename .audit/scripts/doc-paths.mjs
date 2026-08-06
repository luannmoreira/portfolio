#!/usr/bin/env node
// Extracts every repo-relative file path and localhost URL mentioned in
// tracked docs and checks whether it still exists. Read-only.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const repoRoot = process.cwd();

function trackedMarkdownFiles() {
  const out = execFileSync(
    "git",
    ["ls-files", "*.md", "*.mdx", ".claude/docs/**/*.md"],
    { cwd: repoRoot, encoding: "utf8" }
  );
  return out.split("\n").filter(Boolean);
}

// Repo-relative paths written in backticks, e.g. `apps/portfolio/public/_redirects`
const PATH_RE =
  /`((?:\.\/)?(?:apps|packages|\.claude|\.github)\/[A-Za-z0-9_./-]+|[A-Za-z0-9_-]+\.(?:md|json|ya?ml))`/g;
const LOCALHOST_RE = /http:\/\/localhost:(\d+)/g;

const items = [];
let errors = 0;

for (const file of trackedMarkdownFiles()) {
  let content;
  try {
    content = readFileSync(join(repoRoot, file), "utf8");
  } catch {
    continue;
  }
  const lines = content.split("\n");

  lines.forEach((lineText, idx) => {
    let m;
    PATH_RE.lastIndex = 0;
    while ((m = PATH_RE.exec(lineText))) {
      const candidate = m[1];
      // Skip obvious non-paths (e.g. inline command flags that happen to match)
      if (candidate.includes(" ")) continue;
      const abs = join(repoRoot, candidate);
      const exists = existsSync(abs);
      if (!exists) errors++;
      items.push({
        file,
        line: idx + 1,
        reference: candidate,
        type: "path",
        exists,
        severity: exists ? "info" : "high",
        message: exists
          ? `path exists: ${candidate}`
          : `path does not exist: ${candidate}`,
      });
    }
    LOCALHOST_RE.lastIndex = 0;
    while ((m = LOCALHOST_RE.exec(lineText))) {
      items.push({
        file,
        line: idx + 1,
        reference: `http://localhost:${m[1]}`,
        type: "port",
        exists: null,
        severity: "info",
        message:
          "localhost URL — port existence not verifiable statically, cross-check against vite/playwright configs manually",
      });
    }
  });
}

const result = {
  tool: "doc-paths",
  command: "node .audit/scripts/doc-paths.mjs",
  exit_code: errors > 0 ? 1 : 0,
  ran_at: new Date().toISOString(),
  summary: { errors, warnings: 0, checked: items.length },
  items,
};

mkdirSync(join(repoRoot, ".audit/tools"), { recursive: true });
writeFileSync(
  join(repoRoot, ".audit/tools/doc-paths.json"),
  JSON.stringify(result, null, 2)
);
console.log(`doc-paths: ${items.length} references checked, ${errors} broken`);
process.exit(0);
