import "./App.css";
import { Suspense, lazy } from "react";
import { HashRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

// Lazy — Home is the landing route (loaded eagerly above so the first
// paint isn't gated on a chunk fetch); the rest split into their own
// chunks, fetched on navigation.
const About = lazy(() => import("./pages/About"));
const Resume = lazy(() => import("./pages/Resume"));
const Projects = lazy(() => import("./pages/Projects"));
const Uses = lazy(() => import("./pages/Uses"));
const Now = lazy(() => import("./pages/Now"));
const Contact = lazy(() => import("./pages/Contact"));

function App() {
  return (
    <HashRouter>
      <div className="w-full px-6 lg:px-20 xl:px-36 bg-dark-500 light:bg-light-500">
        <Navbar />
        <main>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/uses" element={<Uses />} />
              <Route path="/now" element={<Now />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
