import { useDocumentMeta } from "../hooks/useDocumentMeta";

function NotFound() {
  useDocumentMeta("Not Found — Blog");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-dark-500 light:bg-light-500 text-white light:text-dark-500">
      <h1 className="text-3xl font-bold">Not Found</h1>
      <p>Page not found.</p>
    </div>
  );
}

export default NotFound;
