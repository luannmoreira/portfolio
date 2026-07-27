interface IconProps {
  viewBox: string;
  path: string;
  className?: string;
}

// Decorative by default — every current usage sits inside a link/button that
// already carries its own aria-label or visible text, so the icon itself
// shouldn't be announced a second time.
export default function Icon({ viewBox, path, className }: IconProps) {
  return (
    <svg
      viewBox={viewBox}
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={path} />
    </svg>
  );
}
