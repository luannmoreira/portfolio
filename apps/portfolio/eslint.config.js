const js = require("@eslint/js");
const globals = require("globals");
const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const jsxA11y = require("eslint-plugin-jsx-a11y");
const tseslint = require("typescript-eslint");
const prettierConfig = require("eslint-config-prettier");

module.exports = [
  {
    ignores: ["build/**", "node_modules/**"],
  },
  js.configs.recommended,
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
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
  {
    files: ["src/**/*.test.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
      },
    },
  },
  prettierConfig,
];
