import eslint_typescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslint_plugin_import from 'eslint-plugin-import';
import eslint_prettier from 'eslint-plugin-prettier';
import eslint_react from 'eslint-plugin-react';
import eslint_reactHooks from 'eslint-plugin-react-hooks';
import eslint_unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';

export default [
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      'public/',
      '.idea/',
      '.vscode/',
      'package.json',
      'package-lock.json',
    ],
  },
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: eslint_react,
      '@typescript-eslint': eslint_typescript,
      'react-hooks': eslint_reactHooks,
      prettier: eslint_prettier,
      import: eslint_plugin_import,
      'unused-imports': eslint_unusedImports,
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      // Remove unused vars and imports
      // Remove unused imports (you already have the plugin)
      'unused-imports/no-unused-imports': 'error',

      // Remove unused variables
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // Turn off the base rule to avoid conflicts
      '@typescript-eslint/no-unused-vars': 'off',
      // Base ESLint rules

      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'consistent-return': 'off',
      quotes: ['error', 'single', { avoidEscape: true }],
      'comma-dangle': ['warn', 'only-multiline'],
      camelcase: 'off',

      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',

      // React
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.jsx', '.tsx'] },
      ],
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-sort-props': 'off',
      'react/prop-types': 'off',
      'react/no-array-index-key': 'off',
      'react/require-default-props': 'off',

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Imports
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-extraneous-dependencies': [
        'warn',
        {
          devDependencies: [
            'vite.config.{js,ts}',
            'vitest.config.{js,ts}',
            'vitest/setup.{js,tsx}',
            '**/*.test.{js,ts,jsx,tsx}', // test files
            '**/*.spec.{js,ts,jsx,tsx}', // spec files

            // explicitly allow dev-only packages
            '**/reportWebVitals.ts',
            'eslint.config.{js,ts}',
            'web-vitals',
            'globals',
            'eslint-plugin-react',
            '@typescript-eslint/eslint-plugin',
            'eslint-plugin-prettier',
            'eslint-plugin-react-hooks',
            'eslint-plugin-import',
            '@typescript-eslint/parser',
            'mocks/*',
            'vitest/*',
            'playwright.config.{js,ts}', // playwright config
          ],
        },
      ],

      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          ts: 'never',
          tsx: 'never',
          json: 'always',
          json5: 'always',
        },
      ],
      'import/prefer-default-export': 'off',
      'import/first': 'warn',
      'import/newline-after-import': 'warn',
      'import/no-duplicates': 'warn',

      // Prettier
      'prettier/prettier': ['error', { singleQuote: true }],

      complexity: ['error', 11], // default
    },
  },
  // Override for TSX components
  {
    files: ['**/*.tsx'],
    rules: {
      complexity: ['warn', 20], // allow more complexity for components
    },
  },
  {
    files: ['vitest/*', 'eslint.config.js'],
    rules: {
      'unused-imports/no-unused-imports': 'off',
      'unused-imports/no-unused-vars': 'off',
    },
  },
];
