interface SunIconProps {
  className?: string;
}

// Built from plain trigonometry rather than a transcribed third-party icon
// path: a filled circle (r=4) at center (12,12), plus 8 stroked rays at
// 45°-increments, each spanning radius 6→9 from center
// (cos/sin(angle) * radius, added to the 12,12 center). Every coordinate
// below can be checked by hand — e.g. 45°: cos=sin=0.7071,
// 12 ± 4.24 (r=6) and 12 ± 6.36 (r=9) — instead of trusted from memory,
// which is how the previous version of this icon ended up with a
// malformed, asymmetric bottom ray.
export default function SunIcon({ className }: SunIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="4" stroke="none" />
      <line x1="18" y1="12" x2="21" y2="12" />
      <line x1="16.24" y1="16.24" x2="18.36" y2="18.36" />
      <line x1="12" y1="18" x2="12" y2="21" />
      <line x1="7.76" y1="16.24" x2="5.64" y2="18.36" />
      <line x1="6" y1="12" x2="3" y2="12" />
      <line x1="7.76" y1="7.76" x2="5.64" y2="5.64" />
      <line x1="12" y1="6" x2="12" y2="3" />
      <line x1="16.24" y1="7.76" x2="18.36" y2="5.64" />
    </svg>
  );
}
