const config = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  rules: {
    'at-rule-empty-line-before': null,
    'max-nesting-depth': 2,
    'string-quotes': 'single',
    'order/properties-alphabetical-order': true,
  },
};

if (process.env.STYLELINT_ENV === 'sc') {
  config.processors = ['stylelint-processor-styled-components'];
  config.extends.push('stylelint-config-styled-components');
  config.syntax = 'scss';
}

module.exports = config;
