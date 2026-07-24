import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
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
  },
});
