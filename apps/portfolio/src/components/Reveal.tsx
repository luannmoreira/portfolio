import type { ReactNode } from "react";
import { useReveal, type RevealVariant } from "../hooks/useReveal";

interface RevealProps {
  variant: RevealVariant;
  duration?: number;
  offset?: number;
  className?: string;
  children: ReactNode;
}

export default function Reveal({
  variant,
  duration = 500,
  offset = 0,
  className,
  children,
}: RevealProps) {
  const { ref, style } = useReveal<HTMLDivElement>({
    variant,
    duration,
    offset,
  });

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
