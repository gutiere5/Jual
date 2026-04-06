import eslintJS from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import pluginQuery from "eslint-plugin-query";

export const baseEslintConfig = [
  eslintConfigPrettier,
  eslintJS.configs.recommended,
  turboPlugin.configs["flat/recommended"],
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...pluginQuery.configs["flat/recommended-strict"],
  {
    languageOptions: {
      ecmaVersion: "latest",
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "no-console": "error",
    },
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: "warn",
    },
  },
  {
    ignores: [
      "generated/",
      "dist/",
      "coverage/",
      ".turbo/",
      ".vite/",
      ".next/",
      "build/",
      "out/",
      ".cache/",
      "tmp/",
    ],
  },
];
