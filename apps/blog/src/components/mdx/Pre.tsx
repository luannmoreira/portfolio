import { useRef, useState, type ComponentPropsWithoutRef } from "react";

// Substituted for the native <pre> via MDXProvider (wiring deferred to 9.8)
// — a transparent passthrough of whatever rehype-pretty-code renders, plus
// a copy button. Reads via a ref at click time rather than needing the raw
// source text separately, so it works regardless of how many <span> tokens
// Shiki split the code into.
function Pre(props: ComponentPropsWithoutRef<"pre">) {
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
        className="absolute right-2 top-2 rounded bg-dark-300 px-2 py-1 text-xs text-white"
      >
        <span aria-live="polite">{copied ? "Copied!" : "Copy"}</span>
      </button>
    </div>
  );
}

export default Pre;
