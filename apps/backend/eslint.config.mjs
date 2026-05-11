import { backendEslintConfig } from "@repo/eslint-config/backend";
import { typescriptEslintConfig } from "@repo/eslint-config/typescript";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...backendEslintConfig,
  ...typescriptEslintConfig,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
