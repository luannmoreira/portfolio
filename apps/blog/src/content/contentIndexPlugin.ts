import type { Plugin } from "vite";
import { readContentEntries } from "./contentEntries";

// Serves loader.ts's metadata as a virtual module — plain serialized data,
// entirely decoupled from the compiled .mdx modules. That decoupling is the
// actual fix for 12.3's code-splitting bug: the previous eager glob pulled
// each file's "frontmatter" named export, but since the whole compiled .mdx
// module (frontmatter + component together) is one Rollup module, eagerly
// importing any export of it pulled the full component into the main chunk
// too — defeating the lazy glob loader.ts also uses for per-post bodies.
// Nothing here ever imports the .mdx files themselves, so that conflict
// can't recur.
const VIRTUAL_ID = "virtual:content-index";
const RESOLVED_VIRTUAL_ID = `\0${VIRTUAL_ID}`;

export function contentIndexPlugin(): Plugin {
  return {
    name: "blog-content-index",
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_VIRTUAL_ID;
    },
    load(id) {
      if (id !== RESOLVED_VIRTUAL_ID) return;
      return `export default ${JSON.stringify(readContentEntries())};`;
    },
  };
}
