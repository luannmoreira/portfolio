import { Link } from "react-router";
import { loadContent } from "../content/loader";

function BlogIndex() {
  const posts = loadContent().filter(
    (entry) => entry.type === "post" && !entry.draft
  );

  return (
    <div className="min-h-screen bg-dark-500 px-6 py-12 text-white">
      <h1 className="text-3xl font-bold">Blog</h1>
      <ul className="mt-6 flex flex-col gap-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              className="text-xl font-semibold underline"
              to={`/blog/${post.slug}`}
            >
              {post.title}
            </Link>
            <p className="text-sm text-dark-50">{post.readingTime}</p>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlogIndex;
