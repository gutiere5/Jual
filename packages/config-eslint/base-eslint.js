import eslintJS from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";

export const baseEslintConfig = [
  eslintConfigPrettier,
  eslintJS.configs.recommended,
  turboPlugin.configs["flat/recommended"],
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
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
<<<<<<< HEAD
      "no-console": "error",
=======
>>>>>>> 1db1489 (Implemented Zoom, Multi-selection options, and Copy and Paste features in the Editor page.)
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
