import { useTranslation } from "react-i18next";
import ContactSection from "../components/Contact";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

function Contact() {
  const { t } = useTranslation();
  useDocumentMeta(t("contact.metaTitle"), t("contact.metaDescription"));

  return <ContactSection />;
}

export default Contact;
