const globals = require("globals");
const tseslint = require("typescript-eslint");
const prettierConfig = require("eslint-config-prettier");
const sharedConfig = require("@portfolio/config-eslint");

module.exports = [
  ...sharedConfig,
  {
    files: ["*.config.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
  },
  {
    // Vite's own config loader supports ESM import/export regardless of
    // this package's CommonJS default, so this one file is the exception.
    files: ["vite.config.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
  },
  {
    // playwright.config.ts and the e2e specs run under Node, not the
    // browser-facing src/ ruleset from the shared config (no React/JSX
    // here). Both global sets: specs also pass page.evaluate() callbacks
    // that execute in-browser (document, getComputedStyle, etc.), inline
    // in the same file as the Node-side test code.
    files: ["playwright.config.ts", "e2e/**/*.ts"],
    languageOptions: {
      sourceType: "module",
      parser: tseslint.parser,
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },
  {
    files: ["src/**/*.test.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.vitest,
        ...globals.node,
      },
    },
  },
  // Must stay last: disables stylistic rules that conflict with Prettier,
  // and needs to win over every block above it, including local ones.
  prettierConfig,
];
