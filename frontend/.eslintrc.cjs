module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'tailwind.config.js',
    'vite.config.js',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    // ✅ Core ESLint
    'no-unused-vars': ['warn', { varsIgnorePattern: '^React$' }],
    'no-duplicate-imports': 'error',

    // ✅ React
    'react/jsx-no-target-blank': 'off',
    'react/jsx-no-useless-fragment': 'warn',

    // ✅ React Refresh (for Vite or Fast Refresh)
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};
