const typescript = require('typescript');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    extraFileExtensions: ['.svelte'],
    sourceType: 'module',
    ecmaVersion: 2021,
  },
  rules: {
    semi: ['error', 'always'],
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    'tsdoc/syntax': 'warn',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/prefer-default-export': 'off',
    'import/no-mutable-exports': 0,
    'no-labels': 0,
    'no-restricted-syntax': 0,
  },
  overrides: [
    {
      files: ['**/*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        project: ['./tsconfig.json']
      },
      rules: {
        'import/no-unresolved': 'off',
        'no-inner-declarations': 'off',
        'import/first': 'off',
        'import/no-duplicates': 'off',
        'import/no-mutable-exports': 'off',
        'import/extensions': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
      },
    },
  ],
  settings: {
    'import/extensions': ['.js', '.ts'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
      typescript: {},
    },
  },
  plugins: ['eslint-plugin-svelte', '@typescript-eslint', 'eslint-plugin-tsdoc'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:eslint-comments/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  ignorePatterns: ['*.cjs', 'scripts/*.js', 'static/*.js', 'src/service-worker.ts', 'svelte.config.js', 'scripts/js/*.ts'],
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
};