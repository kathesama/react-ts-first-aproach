module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:security/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'security', 'react-hooks'],
  'ignorePatterns': ['*.spec.tsx', '*.test.tsx', '*.css', '*.svg', '*.scss'],
  rules: {
    'semi': ['error', 'always'],
    '@typescript-eslint/semi': ['error'],
    'no-unexpected-multiline': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'no-use-before-define': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    'no-unused-vars': 'warn',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.tsx'],
      },
    ],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'quotes': ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
    'max-len': ['error', { 'code': 130 }],

    // Comments
    'no-inline-comments': 'error',
    'line-comment-position': ['error', { 'position': 'above' }],
    'lines-around-comment': [
      'error',
      {
        'beforeBlockComment': true,
        'beforeLineComment': false,
        'allowBlockStart': true,
        'allowClassStart': true,
        'allowObjectStart': true,
        'allowArrayStart': true
      }
    ],
    'multiline-comment-style': ['error', 'bare-block'],
    'spaced-comment': ['error', 'always', { 'block': { 'balanced': true } }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
      },
    },
  },
};
