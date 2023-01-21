module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    // 'prettier/prettier': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react-hooks/rules-of-hooks': 'error', // Проверяем правила хуков
    'react-hooks/exhaustive-deps': 'warn', // Проверяем зависимости эффекта
    'max-len': [2, { code: 80, tabWidth: 2, ignoreUrls: true }],
    // 'react/forbid-prop-types': [0, { forbid: ['any'] }],
    'one-var': 'off',
    'import/no-named-default': 0,
    'react/prop-types': 0,
    'prefer-const': 0,
    'camelcase': 0,
    'react/jsx-props-no-spreading': 0,
  },
}
