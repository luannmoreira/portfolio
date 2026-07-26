import { Link } from "react-router";
import { loadContent, type ContentType } from "../content/loader";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

interface ContentIndexProps {
  type: ContentType;
  basePath: string;
  heading: string;
}

function ContentIndex({ type, basePath, heading }: ContentIndexProps) {
  const entries = loadContent().filter(
    (entry) => entry.type === type && !entry.draft
  );

  useDocumentMeta(`${heading} — Blog`);

  return (
    <div className="min-h-screen bg-dark-500 px-6 py-12 text-white">
      <h1 className="text-3xl font-bold">{heading}</h1>
      <ul className="mt-6 flex flex-col gap-6">
        {entries.map((entry) => (
          <li key={entry.slug}>
            <Link
              className="text-xl font-semibold underline"
              to={`${basePath}/${entry.slug}`}
            >
              {entry.title}
            </Link>
            <p className="text-sm text-gray-400">{entry.readingTime}</p>
            <p>{entry.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContentIndex;
