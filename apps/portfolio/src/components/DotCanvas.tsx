import { useRef } from "react";
import type { ElementType, MouseEvent, ReactNode } from "react";

interface DotCanvasProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

export default function DotCanvas({
  as: Tag = "div",
  className = "",
  children,
}: DotCanvasProps) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    ref.current?.style.setProperty("--dot-x", `${event.clientX - rect.left}px`);
    ref.current?.style.setProperty("--dot-y", `${event.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    ref.current?.style.setProperty("--dot-x", "-9999px");
    ref.current?.style.setProperty("--dot-y", "-9999px");
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`canvas-bg relative ${className}`}
    >
      {children}
    </Tag>
  );
}
