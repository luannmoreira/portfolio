#!/usr/bin/env node
// Extracts every fenced shell command from every tracked .md/.mdx file and
// checks whether the pnpm script it names actually exists. Read-only: never
// executes the extracted commands, only resolves them against package.json
// scripts (running e.g. `pnpm deploy` for real would not be safe here).
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const repoRoot = process.cwd();

function trackedMarkdownFiles() {
  const out = execFileSync(
    "git",
    ["ls-files", "*.md", "*.mdx", ".claude/docs/**/*.md"],
    { cwd: repoRoot, encoding: "utf8" }
  );
  return out.split("\n").filter(Boolean);
}

function loadWorkspaceScripts() {
  const scriptsByScope = {};
  const root = JSON.parse(readFileSync(join(repoRoot, "package.json"), "utf8"));
  scriptsByScope.root = Object.keys(root.scripts ?? {});
  for (const app of ["portfolio", "blog"]) {
    const pkgPath = join(repoRoot, "apps", app, "package.json");
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
      scriptsByScope[app] = Object.keys(pkg.scripts ?? {});
    } catch {
      scriptsByScope[app] = [];
    }
  }
  return scriptsByScope;
}

function extractFencedShellBlocks(content) {
  const blocks = [];
  const fenceRe = /```(sh|bash|shell)?\n([\s\S]*?)```/g;
  let match;
  while ((match = fenceRe.exec(content))) {
    if (match[1] && !["sh", "bash", "shell"].includes(match[1])) continue;
    const before = content.slice(0, match.index);
    const line = before.split("\n").length;
    blocks.push({ line, body: match[2] });
  }
  return blocks;
}

function resolvePnpmCommand(cmdLine, scopes) {
  // Matches: pnpm <script>  |  pnpm --filter <app> <script>  |  pnpm run <script>
  const filterMatch = cmdLine.match(
    /^pnpm\s+--filter\s+(\S+)\s+(?:run\s+)?(\S+)/
  );
  if (filterMatch) {
    const [, app, script] = filterMatch;
    const known = scopes[app] ?? [];
    return { scope: app, script, exists: known.includes(script) };
  }
  const rootMatch = cmdLine.match(/^pnpm\s+(?:run\s+)?([a-zA-Z0-9:_-]+)/);
  if (rootMatch) {
    const script = rootMatch[1];
    if (
      ["install", "add", "remove", "exec", "dlx", "view", "audit"].includes(
        script
      )
    ) {
      return null; // pnpm builtin, not a package.json script
    }
    return { scope: "root", script, exists: scopes.root.includes(script) };
  }
  return null;
}

const scopes = loadWorkspaceScripts();
const items = [];
let errors = 0;

for (const file of trackedMarkdownFiles()) {
  let content;
  try {
    content = readFileSync(join(repoRoot, file), "utf8");
  } catch {
    continue;
  }
  for (const block of extractFencedShellBlocks(content)) {
    const lines = block.body.split("\n");
    lines.forEach((raw, i) => {
      const cmdLine = raw.trim();
      if (!cmdLine || cmdLine.startsWith("#") || !cmdLine.startsWith("pnpm"))
        return;
      const resolved = resolvePnpmCommand(cmdLine, scopes);
      if (!resolved) return;
      if (!resolved.exists) errors++;
      items.push({
        file,
        line: block.line + i,
        command: cmdLine,
        scope: resolved.scope,
        script: resolved.script,
        exists: resolved.exists,
        severity: resolved.exists ? "info" : "critical",
        message: resolved.exists
          ? `script "${resolved.script}" exists in ${resolved.scope} package.json`
          : `script "${resolved.script}" does NOT exist in ${resolved.scope} package.json — documented command would fail`,
      });
    });
  }
}

const result = {
  tool: "doc-commands",
  command: "node .audit/scripts/doc-commands.mjs",
  exit_code: errors > 0 ? 1 : 0,
  ran_at: new Date().toISOString(),
  summary: { errors, warnings: 0, checked: items.length },
  items,
};

mkdirSync(join(repoRoot, ".audit/tools"), { recursive: true });
writeFileSync(
  join(repoRoot, ".audit/tools/doc-commands.json"),
  JSON.stringify(result, null, 2)
);
console.log(
  `doc-commands: ${items.length} pnpm commands checked, ${errors} broken`
);
process.exit(0); // findings, not a tool-runner failure
