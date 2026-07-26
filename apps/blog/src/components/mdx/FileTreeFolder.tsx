import type { ReactNode } from "react";

interface FileTreeFolderProps {
  name: string;
  children?: ReactNode;
}

function FileTreeFolder({ name, children }: FileTreeFolderProps) {
  return (
    <li>
      <span className="flex items-center gap-1.5">
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4 shrink-0 text-blue-400 light:text-blue-600"
          aria-hidden="true"
        >
          <path d="M2 5a1 1 0 011-1h4.586a1 1 0 01.707.293L9.914 5.8H17a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V5z" />
        </svg>
        {name}
      </span>
      {children && (
        <ul className="ml-2 border-l border-slate-700 light:border-slate-300 pl-3">
          {children}
        </ul>
      )}
    </li>
  );
}

export default FileTreeFolder;
