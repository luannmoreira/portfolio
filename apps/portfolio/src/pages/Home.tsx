import Hero from "../components/Hero";
import Certs from "../components/Certs";

// About/Habilidades/Experiencia moved to pages/About.tsx, Contact to
// pages/Contact.tsx. Certs stays here until 10.4 builds the Projects page
// that replaces its role.
function Home() {
  return (
    <>
      <Hero />
      <Certs />
    </>
  );
}

export default Home;
