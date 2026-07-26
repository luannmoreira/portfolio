import AboutSection from "../components/About";
import Habilidades from "../components/Habilidades";
import Experiencia from "../components/Experiencia";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

function About() {
  useDocumentMeta(
    "About — Luann Curioso",
    "Background, skills, and experience — from the Secretariat for Economic Development of Mato Grosso to today's front-end and back-end work."
  );

  return (
    <>
      <AboutSection />
      <Habilidades />
      <Experiencia />
    </>
  );
}

export default About;
