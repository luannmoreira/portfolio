import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
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
