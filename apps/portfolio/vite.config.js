import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // GH Pages serves this repo at /portfolio/, not the domain root. CRA read
  // this from package.json's "homepage" field automatically; Vite has no
  // equivalent, so it's set explicitly here. Hardcoded rather than derived
  // from "homepage" deliberately — this deployment target is temporary, so
  // this whole block should just be deleted (or set to "/") once hosting
  // moves elsewhere, not kept in sync with a config field going away anyway.
  base: "/portfolio/",
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test-setup.ts",
    // Vitest's default include pattern also matches e2e/*.spec.ts, which
    // import Playwright's own (incompatible) test()/describe() — scope to
    // src/ so Vitest never tries to run Playwright's specs as its own.
    include: ["src/**/*.{test,spec}.{js,jsx,ts,tsx}"],
  },
});
