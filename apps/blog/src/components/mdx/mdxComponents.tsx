import Pre from "./Pre";
import Image from "./Image";
import Decision from "./Decision";
import Tradeoff from "./Tradeoff";
import Warning from "./Warning";
import Tip from "./Tip";
import Note from "./Note";
import FileTree from "./FileTree";
import FileTreeFolder from "./FileTreeFolder";
import FileTreeFile from "./FileTreeFile";
import Terminal from "./Terminal";

// The full authoring component registry (9.1-9.7), passed to MDXProvider.
// Fixed set, not a dynamic/config-driven registry — building configurability
// for a set that doesn't change would be speculative complexity.
export const mdxComponents = {
  pre: Pre,
  img: Image,
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
