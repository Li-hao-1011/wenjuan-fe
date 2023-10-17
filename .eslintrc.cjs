module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite-env.d.ts', '.eslintignore'],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh', 'react', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': ['off', { allowConstantExport: true }],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react/prop-types': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
