module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  rules: {
    'react/forbid-prop-types': ['error', {
      forbid: ['any'],
    }],
    'react/jsx-filename-extension': ['error', {
      extensions: ['.js'],
    }],
  },
};