import { toString } from "mdast-util-to-string";
import { valueToEstree } from "estree-util-value-to-estree";
import { define } from "unist-util-mdx-define";

// Computes reading time from the document's text at MDX-compile time and
// exposes it as a `readingTime` export — the same mechanism
// remark-mdx-frontmatter uses for its `frontmatter` export (reusing its own
// `unist-util-mdx-define` dependency to inject the AST node correctly).
//
// Needed because raw .mdx text isn't otherwise reachable at runtime:
// @mdx-js/rollup's transform filter strips query strings before matching
// the file extension, so a `?raw` import of the same file gets compiled as
// MDX too, rather than served as plain text.
export function remarkReadingTime() {
  return (tree, file) => {
    const text = toString(tree);
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));

    define(tree, file, {
      readingTime: valueToEstree(`${minutes} min read`),
    });
  };
}
