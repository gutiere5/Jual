import { frontendEslintConfig } from "@repo/eslint-config/frontend";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...frontendEslintConfig,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];