import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { MDXProvider } from "@mdx-js/react";
import { mdxComponents } from "./mdx/mdxComponents";
import ContentIndex from "./components/ContentIndex";
import Post from "./components/Post";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <MDXProvider components={mdxComponents}>
      <BrowserRouter>
        <div className="w-full bg-background text-on-surface">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Navigate to="/blog" replace />} />
              <Route
                path="/blog"
                element={
                  <ContentIndex
                    type="post"
                    basePath="/blog"
                    heading="Writing"
                  />
                }
              />
              <Route path="/blog/:slug" element={<Post basePath="/blog" />} />
              <Route
                path="/adr"
                element={
                  <ContentIndex
                    type="adr"
                    basePath="/adr"
                    heading="Architecture Decision Records"
                  />
                }
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

export default App;
