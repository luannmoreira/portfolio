import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // No "base" yet — deploy target is deliberately undecided (see
  // ROADMAP.md Phase 7), so this stays at Vite's "/" default until a host
  // is picked.
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test-setup.ts",
    // Scoped to src/ so Vitest never tries to run Playwright's e2e specs
    // as its own tests (same fix as portfolio's vite.config.js).
    include: ["src/**/*.{test,spec}.{js,jsx,ts,tsx}"],
  },
});
