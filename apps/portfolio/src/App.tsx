import "./App.css";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
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

function AppRoutes() {
  const { t } = useTranslation();

  return (
    <BrowserRouter>
      <div className="flex min-h-screen w-full flex-col bg-background text-on-surface">
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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

// I18nextProvider lives here, not in index.tsx: this is the one place that
// makes every test rendering <App /> (App.test.tsx and friends) work
// against the real translation resources with no per-test wiring, while
// standalone component tests use the renderWithI18n helper (test-i18n.tsx)
// instead.
function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <AppRoutes />
    </I18nextProvider>
  );
}

export default App;
