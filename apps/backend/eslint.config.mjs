import { backendEslintConfig } from "@repo/eslint-config/backend";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...backendEslintConfig,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];