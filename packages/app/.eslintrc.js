module.exports = {
  env: {
    node: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    extraFileExtensions: ['.ts, .tsx'],
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['custom-rule'],
  rules: {
    'custom-rule/my-rule': 'error',
    'custom-rule/my-other-rule': 'error'
  },
};
