import type { ReactNode } from "react";
import { useInView } from "../hooks/useInView";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

type RevealVariant = "fade-up" | "fade-left" | "fade-right" | "flip-right";

interface RevealProps {
  variant: RevealVariant;
  duration?: number;
  offset?: number;
  className?: string;
  children: ReactNode;
}

const hiddenTransforms: Record<RevealVariant, string> = {
  "fade-up": "translateY(2rem)",
  "fade-left": "translateX(2rem)",
  "fade-right": "translateX(-2rem)",
  "flip-right": "perspective(2500px) rotateY(-100deg)",
};

export default function Reveal({
  variant,
  duration = 500,
  offset = 0,
  className,
  children,
}: RevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({ offset });
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div
        ref={ref}
        className={className}
        style={{ opacity: 1, transform: "none", transition: "none" }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "none" : hiddenTransforms[variant],
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
      }}
    >
      {children}
    </div>
  );
}
