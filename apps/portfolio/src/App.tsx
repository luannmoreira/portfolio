import "./App.css";
import { Suspense, lazy } from "react";
import { HashRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

// Lazy — Home is the landing route (loaded eagerly above so the first
// paint isn't gated on a chunk fetch); the rest split into their own
// chunks, fetched on navigation. /now, /uses, and /certifications all
// folded into Home/About as anchor sections rather than routes — skills,
// courses, and the uses/workspace section all live on /about now.
const About = lazy(() => import("./pages/About"));
const Resume = lazy(() => import("./pages/Resume"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));

function App() {
  return (
    <HashRouter>
      <div className="flex min-h-screen w-full flex-col bg-background text-on-surface">
        <Navbar />
        <main className="flex flex-1 flex-col">
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
    </HashRouter>
  );
}

export default App;
