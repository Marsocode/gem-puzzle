module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  ignorePatterns: ['/dist'],
  rules: {
    'linebreak-style': 0,
    'no-param-reassign': 0,
  },
};
