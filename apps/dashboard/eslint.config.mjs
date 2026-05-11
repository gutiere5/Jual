import { baseEslintConfig } from '@repo/eslint-config/base';
import { frontendEslintConfig } from '@repo/eslint-config/frontend';
import { testEslintConfig } from '@repo/eslint-config/test';
import { typescriptEslintConfig } from '@repo/eslint-config/typescript';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...baseEslintConfig,
  ...frontendEslintConfig,
  ...typescriptEslintConfig,
  ...testEslintConfig,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
