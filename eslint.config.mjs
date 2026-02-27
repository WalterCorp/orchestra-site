import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // ✅ Désactivé intentionnellement — les données Sanity ne sont pas encore typées.
      // Backlog : typer proprement les structures Sanity (PortableTextBlock[], etc.)
      "@typescript-eslint/no-explicit-any": "off",

      // ✅ Warning uniquement — pas bloquant
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
]);

export default eslintConfig;
