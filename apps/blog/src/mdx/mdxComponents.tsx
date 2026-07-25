import Pre from "../components/mdx/Pre";
import Decision from "../components/mdx/Decision";
import Tradeoff from "../components/mdx/Tradeoff";
import Warning from "../components/mdx/Warning";
import Tip from "../components/mdx/Tip";
import Note from "../components/mdx/Note";
import FileTree from "../components/mdx/FileTree";
import FileTreeFolder from "../components/mdx/FileTreeFolder";
import FileTreeFile from "../components/mdx/FileTreeFile";
import Terminal from "../components/mdx/Terminal";

// The full authoring component registry (9.1-9.7), passed to MDXProvider.
// Fixed set, not a dynamic/config-driven registry — building configurability
// for a set that doesn't change would be speculative complexity.
export const mdxComponents = {
  pre: Pre,
  Decision,
  Tradeoff,
  Warning,
  Tip,
  Note,
  FileTree,
  FileTreeFolder,
  FileTreeFile,
  Terminal,
};
