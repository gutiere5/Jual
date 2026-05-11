import { baseEslintConfig } from '@repo/eslint-config/base';
import { frontendEslintConfig } from '@repo/eslint-config/frontend';
import { testEslintConfig } from '@repo/eslint-config/test';
import { typescriptEslintConfig } from '@repo/eslint-config/typescript';

export default [
  ...testEslintConfig,
  ...frontendEslintConfig,
  ...typescriptEslintConfig,
  ...baseEslintConfig,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
