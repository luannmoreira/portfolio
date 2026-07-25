import { BrowserRouter, Routes, Route } from "react-router";
import { MDXProvider } from "@mdx-js/react";
import { mdxComponents } from "./mdx/mdxComponents";
import Home from "./components/Home";
import ContentIndex from "./components/ContentIndex";
import Post from "./components/Post";
import NotFound from "./components/NotFound";

function App() {
  return (
    <MDXProvider components={mdxComponents}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/blog"
            element={
              <ContentIndex type="post" basePath="/blog" heading="Blog" />
            }
          />
          <Route path="/blog/:slug" element={<Post />} />
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
          <Route path="/adr/:slug" element={<Post />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </MDXProvider>
  );
}

export default App;
