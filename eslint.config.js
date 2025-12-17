import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import astro from 'eslint-plugin-astro';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
    {
        ignores: [
            "dist/**",
            ".astro/**",
            "node_modules/**",
            "**/*.json",
            "**/*.md",
            "**/*.mdx"
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...astro.configs.recommended,
    {
        files: ["**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}"],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser,
                ...globals.es2021,
            },
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
    },
    eslintConfigPrettier,
];