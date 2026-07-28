import ContactSection from "../components/Contact";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

function Contact() {
  useDocumentMeta(
    "Contact • Luann Curioso",
    "Get in touch — I love making contact and networking, even when I'm not job hunting."
  );

  return <ContactSection />;
}

export default Contact;
