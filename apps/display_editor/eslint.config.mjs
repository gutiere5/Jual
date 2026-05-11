import { baseEslintConfig } from '@repo/eslint-config/base';
import { frontendEslintConfig } from '@repo/eslint-config/frontend';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...baseEslintConfig,
  ...frontendEslintConfig,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
