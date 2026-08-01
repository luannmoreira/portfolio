import { useRef, useState, type ComponentPropsWithoutRef } from "react";
import { useTranslation } from "react-i18next";

// Substituted for the native <pre> via MDXProvider (wiring deferred to 9.8)
// — a transparent passthrough of whatever rehype-pretty-code renders, plus
// a copy button. Reads via a ref at click time rather than needing the raw
// source text separately, so it works regardless of how many <span> tokens
// Shiki split the code into.
function Pre(props: ComponentPropsWithoutRef<"pre">) {
  const { t } = useTranslation();
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const text = preRef.current?.textContent ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="group relative">
      <pre ref={preRef} {...props} />
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-2 top-2 rounded bg-surface-container-high px-2 py-1 text-xs text-on-surface"
      >
        <span aria-live="polite">
          {copied ? t("pre.copied") : t("pre.copy")}
        </span>
      </button>
    </div>
  );
}

export default Pre;
