import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import BlogIndex from "./components/BlogIndex";
import Post from "./components/Post";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<Post />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
