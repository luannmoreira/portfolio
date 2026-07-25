import type { ReactNode } from "react";

interface FileTreeProps {
  children: ReactNode;
}

function FileTree({ children }: FileTreeProps) {
  return (
    <div className="rounded-md border border-slate-700 bg-dark-600 p-4 font-mono text-sm text-white">
      <ul>{children}</ul>
    </div>
  );
}

export default FileTree;
