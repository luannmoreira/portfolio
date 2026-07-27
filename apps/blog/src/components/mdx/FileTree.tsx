import type { ReactNode } from "react";

interface FileTreeProps {
  children: ReactNode;
}

function FileTree({ children }: FileTreeProps) {
  return (
    <div className="rounded-md border border-slate-700 light:border-slate-300 bg-surface-container p-4 font-mono text-sm text-on-surface">
      <ul>{children}</ul>
    </div>
  );
}

export default FileTree;
