import { Suspense } from "react";
import { useParams } from "react-router";
import { getPostComponent, loadContent } from "../content/loader";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import NotFound from "./NotFound";

function Post() {
  const { slug } = useParams();
  const PostBody = slug ? getPostComponent(slug) : undefined;
  const entry = slug ? loadContent().find((e) => e.slug === slug) : undefined;

  useDocumentMeta(
    entry ? `${entry.title} — Blog` : "Not Found — Blog",
    entry?.excerpt
  );

  if (!PostBody || !entry) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-dark-500 px-6 py-12 text-white">
      <h1 className="text-3xl font-bold">{entry.title}</h1>
      <p className="text-sm text-gray-400">{entry.readingTime}</p>
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
    </div>
  );
}

export default Post;
