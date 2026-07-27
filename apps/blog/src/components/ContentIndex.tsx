import { useState } from "react";
import { Link } from "react-router";
import {
  loadContent,
  type ContentEntry,
  type ContentType,
} from "../content/loader";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

interface ContentIndexProps {
  type: ContentType;
  basePath: string;
  heading: string;
}

const HERO_COPY: Partial<Record<ContentType, string>> = {
  post: "Thoughts on software architecture, production systems, and the occasional real bug — written down as they happen.",
  adr: "Architecture decisions made on this project, and the reasoning behind them — a running log, not a retrospective.",
};

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

function formatDate(date: string): string {
  const [year, month, day] = date.split("-");
  return `${day} ${MONTHS[Number(month) - 1]} ${year}`;
}

function TagChip({
  tag,
  active,
  onClick,
}: {
  tag: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "rounded-full bg-primary px-4 py-1.5 font-label-mono text-label-mono text-on-primary"
          : "rounded-full bg-surface-container-low px-4 py-1.5 font-label-mono text-label-mono text-secondary transition-colors hover:bg-surface-container-high"
      }
    >
      {tag}
    </button>
  );
}

function FeaturedCard({
  entry,
  basePath,
}: {
  entry: ContentEntry;
  basePath: string;
}) {
  return (
    <Link
      to={`${basePath}/${entry.slug}`}
      className="group relative flex flex-col justify-between border border-outline-variant bg-surface-container-lowest p-stack-sm transition-all duration-300 hover:border-primary md:col-span-8"
    >
      <div className="mb-4 flex items-start justify-between">
        <span className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface-variant">
          Latest Entry
        </span>
        <div>
          <span className="font-label-mono text-label-mono text-on-surface-variant">
            {formatDate(entry.date)}
          </span>
          <span className="ml-4 font-label-mono text-caption text-secondary">
            {entry.readingTime}
          </span>
        </div>
      </div>
      <div>
        <h2 className="mb-4 font-headline-lg text-headline-lg text-on-background transition-colors">
          {entry.title}
        </h2>
        <p className="mb-6 line-clamp-3 font-body-md text-body-md text-on-surface-variant">
          {entry.excerpt}
        </p>
      </div>
      <div className="flex items-center gap-3">
        {entry.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="font-label-mono text-caption text-secondary"
          >
            #{tag}
          </span>
        ))}
        <div className="ml-auto">
          <span
            className="material-symbols-outlined text-primary transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          >
            arrow_forward
          </span>
        </div>
      </div>
    </Link>
  );
}

function SideCard({
  entry,
  basePath,
}: {
  entry: ContentEntry;
  basePath: string;
}) {
  return (
    <Link
      to={`${basePath}/${entry.slug}`}
      className="flex flex-col border border-outline-variant bg-surface-container-lowest p-stack-sm transition-all duration-300 hover:border-primary md:col-span-4"
    >
      <span className="mb-2 font-label-mono text-label-mono text-on-surface-variant">
        {formatDate(entry.date)}
      </span>
      <span className="mb-2 block font-label-mono text-caption text-secondary">
        {entry.readingTime}
      </span>
      <h3 className="mb-4 font-headline-md text-headline-md text-on-background">
        {entry.title}
      </h3>
      <p className="mb-6 font-body-md text-body-md text-on-surface-variant">
        {entry.excerpt}
      </p>
      {entry.tags[0] && (
        <div className="mt-auto flex items-center gap-3">
          <span className="font-label-mono text-caption text-secondary">
            #{entry.tags[0]}
          </span>
        </div>
      )}
    </Link>
  );
}

function ContentIndex({ type, basePath, heading }: ContentIndexProps) {
  const entries = loadContent().filter(
    (entry) => entry.type === type && !entry.draft
  );
  const allTags = [...new Set(entries.flatMap((entry) => entry.tags))].sort();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useDocumentMeta(`${heading} — Blog`);

  const visible = activeTag
    ? entries.filter((entry) => entry.tags.includes(activeTag))
    : entries;
  const [featured, ...rest] = visible;
  const sideCards = rest.slice(0, 3);
  const archive = rest.slice(3);

  return (
    <div className="mx-auto max-w-container-max px-margin-mobile pt-32 md:px-gutter">
      <header className="mb-stack-md max-w-3xl">
        <h1 className="mb-stack-sm font-display text-display text-on-background">
          {heading}
        </h1>
        {HERO_COPY[type] && (
          <p className="font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
            {HERO_COPY[type]}
          </p>
        )}
      </header>

      {allTags.length > 0 && (
        <section className="mb-stack-md flex flex-wrap gap-4">
          <TagChip
            tag="All"
            active={activeTag === null}
            onClick={() => setActiveTag(null)}
          />
          {allTags.map((tag) => (
            <TagChip
              key={tag}
              tag={`#${tag}`}
              active={activeTag === tag}
              onClick={() => setActiveTag(tag)}
            />
          ))}
        </section>
      )}

      {!featured && (
        <p className="py-stack-md font-body-md text-body-md text-on-surface-variant">
          Nothing here yet.
        </p>
      )}

      {featured && (
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-12">
          <FeaturedCard entry={featured} basePath={basePath} />
          {sideCards.map((entry) => (
            <SideCard key={entry.slug} entry={entry} basePath={basePath} />
          ))}
        </div>
      )}

      {archive.length > 0 && (
        <section className="mb-stack-lg mt-stack-lg">
          <div className="mb-stack-sm flex items-center gap-4">
            <h2 className="font-headline-lg text-headline-lg text-on-background">
              Earlier Entries
            </h2>
            <div className="h-px flex-grow bg-outline-variant" />
          </div>
          <div>
            {archive.map((entry) => (
              <Link
                key={entry.slug}
                to={`${basePath}/${entry.slug}`}
                className="group flex flex-col border-b border-outline-variant px-2 py-6 transition-colors hover:bg-surface-container-low md:flex-row md:items-center"
              >
                <span className="w-32 shrink-0 font-label-mono text-label-mono text-secondary">
                  {formatDate(entry.date)}
                </span>
                <span className="flex-grow font-headline-md text-headline-md text-on-background transition-all group-hover:pl-4">
                  {entry.title}
                </span>
                <div className="mt-2 flex gap-2 md:mt-0">
                  {entry.tags[0] && (
                    <span className="rounded-sm bg-surface-container px-2 py-0.5 font-label-mono text-caption text-on-surface-variant">
                      #{entry.tags[0]}
                    </span>
                  )}
                  <span className="ml-2 font-label-mono text-caption text-secondary">
                    {entry.readingTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ContentIndex;
