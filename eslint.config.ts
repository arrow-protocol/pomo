import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

export default defineConfig([
    {
        ignores: ["build/**", ".react-router/**", "node_modules/**"],
    },
    js.configs.recommended,
    tseslint.configs.recommended,
    reactHooks.configs.flat.recommended,
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        plugins: {
            "simple-import-sort": simpleImportSort,
        },
        rules: {
            "simple-import-sort/imports": [
                "error",
                {
                    groups: [
                        // CSS and other side-effect imports
                        ["^\\u0000"],

                        // Node built-ins
                        ["^node:"],

                        // React ecosystem: react, react-dom, react-router, etc.
                        ["^react(?:$|[-/])", "^@react(?:$|/)"],

                        // Other third-party packages
                        ["^@?\\w"],

                        // App aliases
                        ["^~(?:/|$)"],

                        // Relative imports
                        ["^\\."],
                    ],
                },
            ],

            "simple-import-sort/exports": "error",
        },
    },
    {
        files: ["**/*.cjs"],
        languageOptions: {
            sourceType: "commonjs",
        },
    },
]);
