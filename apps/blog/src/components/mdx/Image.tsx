import type { ComponentPropsWithoutRef } from "react";
import { resolveAssetUrl } from "../../content/resolveAssetUrl";

// Substituted for the native <img> via MDXProvider. Markdown's optional
// title syntax (`![alt](/path "Caption")`) already compiles to a `title`
// prop on the resulting <img> — reused here as the caption rather than
// inventing new MDX authoring syntax for it.
function Image({ title, alt, src, ...props }: ComponentPropsWithoutRef<"img">) {
  // Authors write content-relative paths ("/content/..."); anything else
  // (an external "https://..." or protocol-relative "//host/..." URL)
  // passes through unresolved — the "//" exclusion matters because
  // startsWith("/") alone also matches protocol-relative URLs.
  const resolvedSrc =
    typeof src === "string" && src.startsWith("/") && !src.startsWith("//")
      ? resolveAssetUrl(src)
      : src;

  return (
    <figure>
      <img
        loading="lazy"
        decoding="async"
        alt={alt}
        src={resolvedSrc}
        {...props}
      />
      {title && (
        <figcaption className="mt-2 text-center font-caption text-caption text-secondary">
          {title}
        </figcaption>
      )}
    </figure>
  );
}

export default Image;
