import fs from 'node:fs'
import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReactRefresh from 'eslint-plugin-react-refresh'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginImport from 'eslint-plugin-import'
import pluginPrettier from 'eslint-plugin-prettier'

// 👉 자동 import된 전역 변수 반영
const autoImportGlobals = JSON.parse(fs.readFileSync('./.eslintrc-auto-import.json', 'utf-8'))

// 👉 React를 반드시 포함
autoImportGlobals.globals.React = true

export default defineConfig([
  {
    ignores: ['dist', 'node_modules'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...autoImportGlobals.globals,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
      'jsx-a11y': pluginJsxA11y,
      import: pluginImport,
      prettier: pluginPrettier,
    },
    // 실제 린트 규칙 정의
    rules: {
      ...js.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginJsxA11y.configs.recommended.rules,
      // 추가된 사항 : prettier과 규칙 공유
      ...pluginPrettier.configs.recommended.rules,

      // JSX 사용 시 React 자동 인식
      'react/react-in-jsx-scope': 'off',

      'linebreak-style': ['warn', 'unix'], // or 'auto'

      // 리액트 프롭스 검사 끄기
      'react/prop-types': 'off',

      // useEffect 등 의존성에 대한 검사 끄기
      'react-hooks/exhaustive-deps': 'off',

      'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      'import/order': [
        'warn',
        {
          groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
        },
      ],

      'prettier/prettier': 'warn',
      // JavaScript 기본 권장 설정 추가 (no-unused-vars 등) ESLint 기본구성
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  // 검사 제외할 경로 설정 (빌드 결과물 등)
  globalIgnores(['**/dist/**', '**/coverage/**', '**/.output/**']),

  // JavaScript 기본 권장 설정 추가 (no-unused-vars 등) ESLint 기본구성
  js.configs.recommended,
])
