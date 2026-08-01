import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { MDXProvider } from "@mdx-js/react";
import { I18nextProvider, useTranslation } from "react-i18next";
import { mdxComponents } from "./mdx/mdxComponents";
import ContentIndex from "./components/ContentIndex";
import Post from "./components/Post";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { i18n } from "./i18n";

function AppRoutes() {
  const { t } = useTranslation();

  return (
    <MDXProvider components={mdxComponents}>
      <BrowserRouter>
        <div className="w-full bg-background text-on-surface">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:font-bold focus:text-on-primary"
          >
            {t("skipToContent")}
          </a>
          <Navbar />
          <main id="main-content" tabIndex={-1} className="focus:outline-none">
            <Routes>
              <Route path="/" element={<Navigate to="/blog" replace />} />
              <Route
                path="/blog"
                element={<ContentIndex type="post" basePath="/blog" />}
              />
              <Route path="/blog/:slug" element={<Post basePath="/blog" />} />
              <Route
                path="/adr"
                element={<ContentIndex type="adr" basePath="/adr" />}
              />
              <Route path="/adr/:slug" element={<Post basePath="/adr" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </MDXProvider>
  );
}

// I18nextProvider lives here, not in main.tsx: this is the one place that
// makes every test rendering <App /> work against the real translation
// resources with no per-test wiring, while standalone component tests use
// the renderWithI18n helper (test-i18n.tsx) instead. Mirrors
// apps/portfolio/src/App.tsx's exact structure.
function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <AppRoutes />
    </I18nextProvider>
  );
}

export default App;
