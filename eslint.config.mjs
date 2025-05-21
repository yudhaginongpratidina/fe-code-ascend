import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        rules: {
            "@typescript-eslint/no-explicit-any": "off",    // Disable TypeScript 'any' type errors
            "react-hooks/exhaustive-deps": "off",           // Disable React Hooks dependency warnings
            "@typescript-eslint/no-unused-vars": "off",     // Disable unused variables errors
            "@next/next/no-img-element": "off",             // Disable Next.js img element warnings
            "react/no-unescaped-entities": "off",           // Disable unescaped entities warnings
            "prefer-const": "off",                          // Disable prefer const warnings
        }
    }
];

export default eslintConfig;