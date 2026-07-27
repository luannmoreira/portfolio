import { Suspense, useState } from "react";
import { Link, useParams } from "react-router";
import {
  getPostComponent,
  loadContent,
  type ContentEntry,
} from "../content/loader";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import NotFound from "./NotFound";

interface PostProps {
  basePath: string;
}

const BASE_LABELS: Record<string, string> = {
  "/blog": "Blog",
  "/adr": "ADRs",
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatDate(date: string): string {
  const [year, month, day] = date.split("-");
  return `${MONTHS[Number(month) - 1]} ${Number(day)}, ${year}`;
}

function ShareRow({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const url = window.location.href;

  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mt-stack-md flex flex-col gap-4 border-t border-outline-variant pt-8">
      <span className="font-label-mono text-label-mono uppercase tracking-widest text-secondary">
        Share this entry
      </span>
      <div className="flex gap-6">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-secondary transition-colors duration-200 hover:text-primary"
        >
          <span
            className="material-symbols-outlined text-[20px]"
            aria-hidden="true"
          >
            share
          </span>
          <span className="font-caption text-caption">Twitter / X</span>
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-secondary transition-colors duration-200 hover:text-primary"
        >
          <span
            className="material-symbols-outlined text-[20px]"
            aria-hidden="true"
          >
            link
          </span>
          <span className="font-caption text-caption">LinkedIn</span>
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-2 text-secondary transition-colors duration-200 hover:text-primary"
        >
          <span
            className="material-symbols-outlined text-[20px]"
            aria-hidden="true"
          >
            content_copy
          </span>
          <span className="font-caption text-caption">
            {copied ? "Copied!" : "Copy Link"}
          </span>
        </button>
      </div>
    </div>
  );
}

function RelatedEntries({
  entries,
  basePath,
}: {
  entries: ContentEntry[];
  basePath: string;
}) {
  if (entries.length === 0) return null;

  return (
    <section className="border-t border-outline-variant bg-surface-container-low">
      <div className="mx-auto max-w-container-max px-margin-mobile py-stack-md md:px-gutter">
        <div className="mb-stack-sm flex items-end justify-between">
          <h2 className="font-headline-lg text-headline-lg text-on-background">
            More Entries
          </h2>
          <Link
            to={basePath}
            className="border-b border-secondary font-label-mono text-label-mono text-secondary transition-all hover:text-primary"
          >
            View Archive
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {entries.map((entry) => (
            <Link
              key={entry.slug}
              to={`${basePath}/${entry.slug}`}
              className="group block border border-outline-variant bg-surface-container-lowest p-gutter transition-all duration-300 hover:border-primary"
            >
              {entry.tags[0] && (
                <span className="mb-4 block font-label-mono text-label-mono text-secondary">
                  {entry.tags[0]}
                </span>
              )}
              <h3 className="mb-4 font-headline-md text-headline-md text-on-background transition-colors">
                {entry.title}
              </h3>
              <p className="line-clamp-2 text-on-surface-variant">
                {entry.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-2 text-caption font-bold uppercase tracking-wider text-primary">
                Read
                <span
                  className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  arrow_forward
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Post({ basePath }: PostProps) {
  const { slug } = useParams();
  const allEntries = loadContent();
  const PostBody = slug ? getPostComponent(slug) : undefined;
  const entry = slug ? allEntries.find((e) => e.slug === slug) : undefined;

  useDocumentMeta(
    entry ? `${entry.title} — Blog` : "Not Found — Blog",
    entry?.excerpt
  );

  if (!PostBody || !entry) {
    return <NotFound />;
  }

  const related = allEntries
    .filter(
      (candidate) =>
        candidate.type === entry.type &&
        candidate.slug !== entry.slug &&
        !candidate.draft
    )
    .slice(0, 2);

  return (
    <>
      <article className="mx-auto max-w-[800px] px-margin-mobile pb-stack-md pt-32 md:px-gutter">
        <nav className="mb-stack-sm" aria-label="Breadcrumb">
          <Link
            to={basePath}
            className="group flex items-center gap-2 text-secondary transition-all duration-200 hover:text-primary"
          >
            <span
              className="material-symbols-outlined text-[18px]"
              aria-hidden="true"
            >
              arrow_back
            </span>
            <span className="font-label-mono text-label-mono uppercase tracking-tight">
              Back to {BASE_LABELS[basePath] ?? "Index"}
            </span>
          </Link>
        </nav>
        <header className="mb-stack-md border-l-4 border-primary pl-gutter">
          {entry.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap items-center gap-4">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-surface-container-highest px-3 py-1 font-label-mono text-label-mono text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="mb-6 font-display text-display leading-tight text-on-background">
            {entry.title}
          </h1>
          <div className="flex items-center gap-6 font-caption text-caption text-secondary">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[16px]"
                aria-hidden="true"
              >
                calendar_today
              </span>
              <span>{formatDate(entry.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[16px]"
                aria-hidden="true"
              >
                schedule
              </span>
              <span>{entry.readingTime}</span>
            </div>
          </div>
        </header>
        <section className="prose font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
          <Suspense fallback={<p>Loading…</p>}>
            {/* eslint-disable-next-line react-hooks/static-components -- getPostComponent
                caches by slug (loader.ts), so this reference is stable across
                renders for a given slug; verified by loader.test.ts's
                reference-equality test. The rule can't see through the cache
                statically, but a runtime cache is the correct fix here — there's
                no fixed set of components to hoist to module scope since slugs
                come from a growing content collection, not known ahead of time. */}
            <PostBody />
          </Suspense>
        </section>
        <ShareRow title={entry.title} />
      </article>
      <RelatedEntries entries={related} basePath={basePath} />
    </>
  );
}

export default Post;
