import "./App.css";
import { HashRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Resume from "./pages/Resume";
import Projects from "./pages/Projects";
import Uses from "./pages/Uses";
import Now from "./pages/Now";
import Contact from "./pages/Contact";

function App() {
  return (
    <HashRouter>
      <div className="w-100 px-6 lg:px-20 xl:px-36 bg-dark-500">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/uses" element={<Uses />} />
            <Route path="/now" element={<Now />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
