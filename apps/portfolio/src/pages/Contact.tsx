import ContactSection from "../components/Contact";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

function Contact() {
  useDocumentMeta(
    "Contact • Luann Curioso",
    "Get in touch about technical architecture, software performance, or potential collaborations on complex systems."
  );

  return <ContactSection />;
}

export default Contact;
