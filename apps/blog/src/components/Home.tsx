import { useDocumentMeta } from "../hooks/useDocumentMeta";

function Home() {
  useDocumentMeta(
    "Blog",
    "Long-form engineering writing — architecture decisions, real bugs, and how this site itself gets built."
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-dark-500 light:bg-light-500 text-white light:text-dark-500">
      <h1 className="text-3xl font-bold">Blog</h1>
      <p>Long-form engineering writing lands here soon.</p>
    </div>
  );
}

export default Home;
