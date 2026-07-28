// Path data fetched directly from Google's Material Symbols CDN (the same
// source the removed "Material Symbols Outlined" webfont used) — inlined
// as SVG so consuming apps don't need a render-blocking icon font just for
// the hamburger toggle's two glyphs.
const PATHS = {
  menu: "M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z",
  close:
    "m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z",
};

interface MenuIconProps {
  open: boolean;
  className?: string;
}

export default function MenuIcon({ open, className }: MenuIconProps) {
  return (
    <svg
      viewBox="0 -960 960 960"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[open ? "close" : "menu"]} />
    </svg>
  );
}
