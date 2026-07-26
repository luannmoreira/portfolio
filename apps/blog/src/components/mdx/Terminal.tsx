import type { ReactNode } from "react";
import Pre from "./Pre";

interface TerminalProps {
  children: ReactNode;
}

// Reuses Pre for the content pane rather than reimplementing the copy
// button — a terminal session is just a code block with different chrome.
function Terminal({ children }: TerminalProps) {
  return (
    <div className="overflow-hidden rounded-md border border-slate-700 light:border-slate-300 bg-black light:bg-white">
      <div className="flex gap-1.5 border-b border-slate-700 light:border-slate-300 bg-dark-600 light:bg-light-600 px-3 py-2">
        <span className="h-3 w-3 rounded-full bg-red-500" />
        <span className="h-3 w-3 rounded-full bg-amber-500" />
        <span className="h-3 w-3 rounded-full bg-green-500" />
      </div>
      <Pre className="overflow-x-auto p-4 font-mono text-sm text-white light:text-dark-500">
        {children}
      </Pre>
    </div>
  );
}

export default Terminal;
