module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  rules: {
    'no-confusing-arrow': 'off',
    'react/forbid-prop-types': ['error', {
      forbid: ['any'],
    }],
    'react/jsx-filename-extension': ['error', {
      extensions: ['.js'],
    }],
    'react/sort-comp': ['error', {
      order: [
        'static-methods',
        'lifecycle',
        '/^on.+$/',
        'getters',
        'setters',
        '/^(get|set|clear)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
        'everything-else',
        '/^render.+$/',
        'render',
      ],
    }],
  },
};
