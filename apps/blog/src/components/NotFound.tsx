import { useDocumentMeta } from "../hooks/useDocumentMeta";

function NotFound() {
  useDocumentMeta("Not Found — Blog");

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark-500 text-white">
      <p>Page not found.</p>
    </div>
  );
}

export default NotFound;
