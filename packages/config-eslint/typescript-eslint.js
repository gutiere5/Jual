import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export const typescriptEslintConfig = defineConfig(
  ...tseslint.configs.strict,
  ...tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
);
