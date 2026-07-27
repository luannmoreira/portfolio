import { Link } from "react-router";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

function NotFound() {
  useDocumentMeta("Not Found — Blog");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-on-background">
      <h1 className="font-headline-lg text-headline-lg">Not Found</h1>
      <p className="font-body-md text-body-md text-on-surface-variant">
        Page not found.
      </p>
      <Link
        to="/blog"
        className="font-label-mono text-label-mono text-primary underline underline-offset-4"
      >
        Back to Blog
      </Link>
    </div>
  );
}

export default NotFound;
