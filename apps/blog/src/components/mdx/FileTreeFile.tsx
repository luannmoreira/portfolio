interface FileTreeFileProps {
  name: string;
}

function FileTreeFile({ name }: FileTreeFileProps) {
  return (
    <li>
      <span className="flex items-center gap-1.5">
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          className="h-4 w-4 shrink-0 text-slate-400 light:text-slate-600"
          aria-hidden="true"
        >
          <path
            d="M4 2.5a1 1 0 011-1h5l5 5v11a1 1 0 01-1 1H5a1 1 0 01-1-1v-15z"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M10 1.5v4a1 1 0 001 1h4" strokeWidth="1.5" />
        </svg>
        {name}
      </span>
    </li>
  );
}

export default FileTreeFile;
