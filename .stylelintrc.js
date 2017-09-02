module.exports = {
  processors: ['stylelint-processor-styled-components'],
  extends: ['stylelint-config-standard', 'stylelint-config-styled-components'],
  syntax: 'scss',
  plugins: ['stylelint-order'],
  rules: {
    'at-rule-empty-line-before': null,
    'max-nesting-depth': 2,
    'string-quotes': 'single',
    'order/properties-alphabetical-order': true,
  },
};
