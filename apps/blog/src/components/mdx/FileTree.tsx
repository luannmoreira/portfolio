import type { ReactNode } from "react";

interface FileTreeProps {
  children: ReactNode;
}

function FileTree({ children }: FileTreeProps) {
  return (
    <div className="rounded-md border border-slate-700 light:border-slate-300 bg-dark-600 light:bg-light-600 p-4 font-mono text-sm text-white light:text-dark-500">
      <ul>{children}</ul>
    </div>
  );
}

export default FileTree;
