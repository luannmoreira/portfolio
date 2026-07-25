import { Suspense } from "react";
import { useParams } from "react-router";
import { getPostComponent } from "../content/loader";
import NotFound from "./NotFound";

function Post() {
  const { slug } = useParams();
  const PostBody = slug ? getPostComponent(slug) : undefined;

  if (!PostBody) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-dark-500 px-6 py-12 text-white">
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
