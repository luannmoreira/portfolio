const js = require("@eslint/js");
const globals = require("globals");
const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const jsxA11y = require("eslint-plugin-jsx-a11y");
const tseslint = require("typescript-eslint");

// Shared across every app in this workspace: the universal ignores, JS
// recommended rules, and the React/TypeScript ruleset for app source code.
// Deliberately does NOT include eslint-config-prettier (each consumer must
// append it last, after its own local config blocks, so Prettier's rule
// overrides always win) or anything tied to a specific build/test tool
// (vite.config.js handling, test-file globals, etc.) — those vary per app
// and aren't guessable before a second consumer actually needs them.
module.exports = [
  {
    ignores: ["dist/**", "build/**", "node_modules/**"],
  },
  js.configs.recommended,
  {
    // Assumes the consuming app's source lives under src/ — true for every
    // app in this workspace so far. An app with a different layout can
    // still add its own override alongside this shared config.
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      "@typescript-eslint": tseslint.plugin,
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      ...tseslint.configs.recommended.reduce(
        (rules, config) => ({ ...rules, ...config.rules }),
        {}
      ),
      "react/prop-types": "off",
      // This is a writing-heavy site (blog/portfolio prose); forcing every
      // apostrophe in JSX text into an HTML entity hurts source readability
      // for no correctness benefit (raw ' and " render fine in JSX text).
      "react/no-unescaped-entities": "off",
      // TS's own noUnusedLocals-equivalent checking is handled by tsc, and
      // the plain no-unused-vars rule doesn't understand TS-only constructs
      // (type-only imports, etc.) — defer entirely to the TS-aware version.
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
];
