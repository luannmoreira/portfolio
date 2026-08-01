const globals = require("globals");
const prettierConfig = require("eslint-config-prettier");
const sharedConfig = require("@portfolio/config-eslint");

module.exports = [
  ...sharedConfig,
  {
    files: ["*.config.{js,ts}"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.node,
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
