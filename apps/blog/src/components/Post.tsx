import { Suspense, useState } from "react";
import { Link, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { MDXProvider } from "@mdx-js/react";
import { formatDate, useLocale } from "@portfolio/i18n";
import {
  getPostComponent,
  loadContent,
  type ContentEntry,
} from "../content/loader";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { useScrollToHash } from "../hooks/useScrollToHash";
import { resolveAssetUrl } from "../content/resolveAssetUrl";
import { mdxComponents } from "./mdx/mdxComponents";
import NotFound from "./NotFound";
import MaterialIcon from "./icons/MaterialIcon";

interface PostProps {
  basePath: string;
}

// Matches useDocumentMeta.ts's own constant — this is the one other place
// in the app that needs the full production URL (for JSON-LD's `url`, which
// has to be absolute).
const SITE_URL = "https://luanncurioso.dev";

function BlogPostingJsonLd({
  entry,
  url,
}: {
  entry: ContentEntry;
  url: string;
}) {
  const json = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: entry.title,
    datePublished: entry.date,
    description: entry.excerpt,
    url,
    ...(entry.coverImage && {
      image: `${SITE_URL}${resolveAssetUrl(entry.coverImage)}`,
    }),
    author: {
      "@type": "Person",
      name: "Luann Curioso",
      url: SITE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

function BreadcrumbListJsonLd({
  baseLabel,
  baseUrl,
  title,
  url,
}: {
  baseLabel: string;
  baseUrl: string;
  title: string;
  url: string;
}) {
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: baseLabel, item: baseUrl },
      { "@type": "ListItem", position: 2, name: title, item: url },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

const BASE_LABEL_KEY: Record<string, string> = {
  "/blog": "blog",
  "/adr": "adr",
};

const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

function ShareRow({ title }: { title: string }) {
  const { t } = useTranslation();
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
        {t("post.shareThisEntry")}
      </span>
      <div className="flex gap-6">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-secondary transition-colors duration-200 hover:text-primary"
        >
          <MaterialIcon name="share" className="h-5 w-5" />
          <span className="font-caption text-caption">{t("post.twitter")}</span>
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-secondary transition-colors duration-200 hover:text-primary"
        >
          <MaterialIcon name="link" className="h-5 w-5" />
          <span className="font-caption text-caption">LinkedIn</span>
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-2 text-secondary transition-colors duration-200 hover:text-primary"
        >
          <MaterialIcon name="content_copy" className="h-5 w-5" />
          <span className="font-caption text-caption">
            {copied ? t("pre.copied") : t("post.copyLink")}
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
  const { t } = useTranslation();

  if (entries.length === 0) return null;

  return (
    <section className="border-t border-outline-variant bg-surface-container-low">
      <div className="mx-auto max-w-container-max px-margin-mobile py-stack-md md:px-gutter">
        <div className="mb-stack-sm flex items-end justify-between">
          <h2 className="font-headline-lg text-headline-lg text-on-background">
            {t("post.moreEntries")}
          </h2>
          <Link
            to={basePath}
            className="border-b border-secondary font-label-mono text-label-mono text-secondary transition-all hover:text-primary"
          >
            {t("post.viewArchive")}
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
                {t("post.read")}
                <MaterialIcon
                  name="arrow_forward"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Mounted as a sibling to <PostBody/> inside the same <Suspense> — see
// useScrollToHash for why the hash-scroll can't be triggered any higher in
// the tree.
function ScrollToHash() {
  useScrollToHash();
  return null;
}

function Post({ basePath }: PostProps) {
  const { t } = useTranslation();
  const [locale] = useLocale();
  const { slug } = useParams();
  const allEntries = loadContent(locale);
  const entry = slug ? allEntries.find((e) => e.slug === slug) : undefined;
  const PostBody = entry ? getPostComponent(entry) : undefined;

  useDocumentMeta(
    entry
      ? t("post.metaTitle", { title: entry.title })
      : t("notFound.metaTitle"),
    entry?.excerpt,
    entry?.coverImage
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

  const baseLabel = t(`post.baseLabel.${BASE_LABEL_KEY[basePath] ?? "index"}`);

  return (
    <>
      <BlogPostingJsonLd
        entry={entry}
        url={`${SITE_URL}${basePath}/${entry.slug}`}
      />
      <BreadcrumbListJsonLd
        baseLabel={baseLabel}
        baseUrl={`${SITE_URL}${basePath}`}
        title={entry.title}
        url={`${SITE_URL}${basePath}/${entry.slug}`}
      />
      <article className="mx-auto w-full max-w-[800px] px-margin-mobile pb-stack-md pt-32 md:px-gutter">
        <nav className="mb-stack-sm" aria-label={t("post.breadcrumbLabel")}>
          <Link
            to={basePath}
            className="group flex items-center gap-2 text-secondary transition-all duration-200 hover:text-primary"
          >
            <MaterialIcon name="arrow_back" className="h-[18px] w-[18px]" />
            <span className="font-label-mono text-label-mono uppercase tracking-tight">
              {t("post.backTo", { label: baseLabel })}
            </span>
          </Link>
        </nav>
        {entry.coverImage && (
          <img
            src={resolveAssetUrl(entry.coverImage)}
            alt={entry.title}
            className="mb-stack-md aspect-video w-full rounded object-cover"
          />
        )}
        <header className="mb-stack-md border-l-4 border-primary pl-gutter">
          {entry.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap items-center gap-4">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-outline-variant/30 bg-on-surface-variant/10 px-3 py-1 font-label-mono text-label-mono text-on-surface-variant light:border-outline-variant/70"
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
              <MaterialIcon name="calendar_today" className="h-4 w-4" />
              <span>{formatDate(entry.date, locale, DATE_OPTIONS)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MaterialIcon name="schedule" className="h-4 w-4" />
              <span>
                {t("post.readingTime", { count: entry.readingMinutes })}
              </span>
            </div>
          </div>
        </header>
        {entry.isFallback && (
          <p
            role="status"
            className="mb-stack-sm border border-outline-variant bg-surface-container-low px-gutter py-4 font-body-md text-body-md text-on-surface-variant"
          >
            {t("post.notTranslatedNotice")}
          </p>
        )}
        <section className="prose font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
          {/* Colocated with its only real consumer rather than provided at
              the app root (App.tsx) — keeps the MDX authoring component
              registry (Callout, Note, Tip, Warning, Tradeoff, the FileTree
              family, Terminal) out of the main bundle; it now loads inside
              Post's own lazy chunk instead (see App.tsx's lazy import). */}
          <MDXProvider components={mdxComponents}>
            <Suspense fallback={<p>{t("post.loading")}</p>}>
              {/* eslint-disable-next-line react-hooks/static-components -- getPostComponent
                  caches by slug (loader.ts), so this reference is stable across
                  renders for a given slug; verified by loader.test.ts's
                  reference-equality test. The rule can't see through the cache
                  statically, but a runtime cache is the correct fix here — there's
                  no fixed set of components to hoist to module scope since slugs
                  come from a growing content collection, not known ahead of time. */}
              <PostBody />
              <ScrollToHash />
            </Suspense>
          </MDXProvider>
        </section>
        <ShareRow title={entry.title} />
      </article>
      <RelatedEntries entries={related} basePath={basePath} />
    </>
  );
}

export default Post;
