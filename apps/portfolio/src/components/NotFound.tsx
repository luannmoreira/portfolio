import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

function NotFound() {
  const { t } = useTranslation();
  useDocumentMeta(t("notFound.metaTitle"));

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-on-background">
      <h1 className="font-headline-lg text-headline-lg">
        {t("notFound.heading")}
      </h1>
      <p className="font-body-md text-body-md text-on-surface-variant">
        {t("notFound.body")}
      </p>
      <Link
        to="/"
        className="font-label-mono text-label-mono text-primary underline underline-offset-4"
      >
        {t("notFound.backToHome")}
      </Link>
    </div>
  );
}

export default NotFound;
