export interface TechIconProps {
  path: string;
  className?: string;
}

// Renders a simple-icons path as monochrome (currentColor) rather than the
// brand's own hex color — this design system stays deliberately
// grayscale-plus-one-accent, so a wall of brand colors would fight the
// rest of the page rather than read as part of it.
export default function TechIcon({ path, className }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      role="presentation"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d={path} />
    </svg>
  );
}
