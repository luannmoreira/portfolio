import "./App.css";
import { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router";
import { I18nextProvider, useTranslation } from "react-i18next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { i18n } from "./i18n";

// Lazy — Home is the landing route (loaded eagerly above so the first
// paint isn't gated on a chunk fetch); the rest split into their own
// chunks, fetched on navigation. /now and /uses folded into Home/About
// as anchor sections rather than routes — skills and the uses/workspace
// section live on /about now.
const About = lazy(() => import("./pages/About"));
const Resume = lazy(() => import("./pages/Resume"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./components/NotFound"));

// The persistent shell, mounted once for the app's lifetime as the parent
// route wrapping every page via <Outlet> — the right place for
// <ScrollRestoration/> (sets history.scrollRestoration = "manual" on
// mount, restored on unmount, so it should only ever mount/unmount with
// the whole app, not per-page). Requires a data router (createBrowserRouter
// below), not the declarative <BrowserRouter>.
//
// <ScrollRestoration/> renders null in a plain Vite SPA like this one (no
// React Router "framework mode"/SSR) — verified by reading its source: it
// calls the real scroll-restoration hook unconditionally before an early
// `if (no framework context) return null`, so the actual save/restore
// behavior (sessionStorage position tracking, scroll-to-top on new
// navigations, hash-scroll, real position restore on back/forward) all
// still runs; only the SSR anti-flash <script> tag it would otherwise
// render is skipped, and that's irrelevant here since a client-only SPA has
// no server-rendered HTML to flash before hydration in the first place.
// The equivalent hook (useScrollRestoration) is NOT reliably usable
// directly: this installed version only exports it as
// UNSAFE_useScrollRestoration, an explicitly unstable/internal name —
// <ScrollRestoration/> itself, by contrast, is a normal stable public
// export.
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
        className="flex flex-1 flex-col pt-32 focus:outline-none print:pt-0"
      >
        <Suspense fallback={null}>
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
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/resume", element: <Resume /> },
      { path: "/projects", element: <Projects /> },
      { path: "/contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

const productionRouter = createBrowserRouter(routes);

interface AppProps {
  /** Injectable for tests (a fresh createMemoryRouter per test) — defaults
   * to the real browser router in production. Mirrors React Router's own
   * documented pattern for testing data-router apps. Typed off
   * createBrowserRouter's own return value rather than a guessed exported
   * type name (react-router's public data-router type isn't re-exported
   * under an obvious name). */
  router?: ReturnType<typeof createBrowserRouter>;
}

// I18nextProvider lives here: this is the one place that makes every test
// rendering <App /> (App.test.tsx and friends) work against the real
// translation resources with no per-test wiring, while standalone
// component tests use the renderWithI18n helper (test-i18n.tsx) instead.
function App({ router = productionRouter }: AppProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <RouterProvider router={router} />
    </I18nextProvider>
  );
}

export default App;
