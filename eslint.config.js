import jseslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

import globals from 'globals';

/**
 * Flat config에서 사용 가능한 predefined configs
 * @see https://github.com/eslint/eslint/issues/18093
 */
export default tseslint.config(
  {
    ignores: ['**/*', '!**/src/**'],
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
      'react-refresh': eslintPluginReactRefresh,
    },
    extends: [jseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      // parser: tseslint.configs.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...eslintPluginReact.configs.recommended.rules,
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginReactRefresh.configs.recommended.rules,
      'no-console': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  /**
   * 적용되고 있는 typescript-eslint의 recommended configs
   * @see https://typescript-eslint.io/rules/?=recommended
   *
   * Configuration object를 추가하여 files 키에 *.{ts,tsx}를 적용하지 않아도 되는 이유
   * @see https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/flat/recommended.ts
   */
  tseslint.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
);
