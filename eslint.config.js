import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-plugin-prettier/recommended";

export default [
    { ignores: ["dist", "node_modules", "public"] },
    {
        files: ["**/*.{js,jsx}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
                __BUILD_VERSION__: "readonly",
            },
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
        },
        settings: { react: { version: "detect" } },
    },
    js.configs.recommended,
    react.configs.flat.recommended,
    react.configs.flat["jsx-runtime"],
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite,
    prettier,
    {
        // Build scripts are .mjs, which the **/*.{js,jsx} block above never
        // matches, so they were linted with no globals at all — `process` and
        // friends read as undefined.
        files: ["**/*.mjs"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: { ...globals.node },
        },
    },
    {
        files: ["**/*.test.{js,jsx}", "src/test/**/*.{js,jsx}"],
        languageOptions: {
            globals: {
                describe: "readonly",
                it: "readonly",
                expect: "readonly",
                vi: "readonly",
                beforeEach: "readonly",
                afterEach: "readonly",
            },
        },
    },
    {
        rules: {
            "react/prop-types": "off",
        },
    },
];
