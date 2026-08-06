import { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router";
import { I18nextProvider, useTranslation } from "react-i18next";
import ContentIndex from "./components/ContentIndex";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { i18n } from "./i18n";

// Lazy — Post pulls in the full MDX authoring component registry
// (Callout/Note/Tip/Warning/Tradeoff/FileTree*/Terminal, see its own
// MDXProvider wrapping), which /blog and /adr's index pages never render.
// ContentIndex and NotFound stay eager: ContentIndex is the landing route
// (redirected to from "/"), and NotFound is small.
const Post = lazy(() => import("./components/Post"));
const NotFound = lazy(() => import("./components/NotFound"));

// The persistent shell, mounted once for the app's lifetime as the parent
// route wrapping every page via <Outlet> — the right place for
// <ScrollRestoration/> (sets history.scrollRestoration = "manual" on mount,
// restored on unmount, so it should only ever mount/unmount with the whole
// app, not per-page). Requires a data router (createBrowserRouter below),
// not the declarative <BrowserRouter>. Mirrors apps/portfolio/src/App.tsx's
// exact structure and reasoning — see that file's comment for why
// <ScrollRestoration/> (not the UNSAFE_-prefixed useScrollRestoration hook)
// is the right, stable way to get this in a plain Vite SPA.
function Layout() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-on-surface">
      <ScrollRestoration />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:font-bold focus:text-on-primary"
      >
        {t("skipToContent")}
      </a>
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex flex-1 flex-col focus:outline-none"
      >
        <Suspense fallback={<div className="min-h-[150vh]" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export const routes = [
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Navigate to="/blog" replace /> },
      { path: "/blog", element: <ContentIndex type="post" basePath="/blog" /> },
      { path: "/blog/:slug", element: <Post basePath="/blog" /> },
      { path: "/adr", element: <ContentIndex type="adr" basePath="/adr" /> },
      { path: "/adr/:slug", element: <Post basePath="/adr" /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

const productionRouter = createBrowserRouter(routes);

interface AppProps {
  /** Injectable for tests (a fresh createMemoryRouter per test) — defaults
   * to the real browser router in production. Mirrors
   * apps/portfolio/src/App.tsx's exact pattern. */
  router?: ReturnType<typeof createBrowserRouter>;
}

// I18nextProvider lives here, not in main.tsx: this is the one place that
// makes every test rendering <App /> work against the real translation
// resources with no per-test wiring, while standalone component tests use
// the renderWithI18n helper (test-i18n.tsx) instead.
function App({ router = productionRouter }: AppProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <RouterProvider router={router} />
    </I18nextProvider>
  );
}

export default App;
