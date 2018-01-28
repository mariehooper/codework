// https://stylelint.io/user-guide/configuration/

module.exports = {
  syntax: 'scss',
  processors: ['stylelint-processor-html'],
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  rules: {
    'at-rule-empty-line-before': null,
    'max-nesting-depth': 2,
    'string-quotes': 'single',
    'order/properties-alphabetical-order': true,
    'no-empty-source': null,
  }
}
