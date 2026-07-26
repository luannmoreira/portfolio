import Hero from "../components/Hero";
import Certs from "../components/Certs";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

// About/Habilidades/Experiencia moved to pages/About.tsx, Contact to
// pages/Contact.tsx. Certs stays here until 10.4 builds the Projects page
// that replaces its role.
function Home() {
  useDocumentMeta(
    "Luann Curioso",
    "Luann Curioso's portfolio — software engineer building for the web, from front-end interfaces to back-end programming and tests."
  );

  return (
    <>
      <Hero />
      <Certs />
    </>
  );
}

export default Home;
