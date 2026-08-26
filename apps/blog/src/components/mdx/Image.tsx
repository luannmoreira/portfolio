import type { ComponentPropsWithoutRef } from "react";

// Substituted for the native <img> via MDXProvider. Markdown's optional
// title syntax (`![alt](/path "Caption")`) already compiles to a `title`
// prop on the resulting <img> — reused here as the caption rather than
// inventing new MDX authoring syntax for it.
function Image({ title, alt, ...props }: ComponentPropsWithoutRef<"img">) {
  return (
    <figure>
      <img loading="lazy" decoding="async" alt={alt} {...props} />
      {title && (
        <figcaption className="mt-2 text-center font-caption text-caption text-secondary">
          {title}
        </figcaption>
      )}
    </figure>
  );
}

export default Image;
