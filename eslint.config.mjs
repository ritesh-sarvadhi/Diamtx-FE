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
      "@typescript-eslint/no-explicit-any": "off",
      // 🔹 Disable "prefer-const"
      "prefer-const": "off",

      // 🔹 Disable unused vars warnings (both TS + JS)
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",

      // 🔹 Disable missing display name for components
      "react/display-name": "off",

      // 🔹 Disable unescaped entities (like quotes inside JSX)
      "react/no-unescaped-entities": "off",

      // 🔹 Disable anonymous default export warnings
      "import/no-anonymous-default-export": "off",

      // 🔹 Disable react-hooks exhaustive deps warning
      "react-hooks/exhaustive-deps": "off",
      "no-unused-disable": "off"
    },
  }
];

export default eslintConfig;
