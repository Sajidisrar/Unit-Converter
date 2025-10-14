import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // React specific rules
      "react/no-unescaped-entities": "error",
      "react/jsx-no-target-blank": "error",
      "react-hooks/exhaustive-deps": "warn",
      
      // TypeScript specific rules
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "error",
      
      // General code quality
      "no-console": "off", // Allow console statements in development
      "no-debugger": "error",
      "prefer-const": "error",
      "no-var": "error"
    },
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "**/*.d.ts",
      "**/types/**",
      "**/.next/**",
      "**/node_modules/**",
    ],
  },
];

export default eslintConfig;
