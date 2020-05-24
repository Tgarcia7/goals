module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': [
      'warn',
      2,
      { 'SwitchCase': 1 }
    ],
    'quotes': [
      'warn',
      'single'
    ],
    'semi': [
      'warn',
      'never'
    ],
    'eqeqeq': [
      'warn'
    ],
    'no-multiple-empty-lines': [
      'warn', { 'max': 1 }
    ],
    'no-unused-vars': [2, {'vars': 'all', 'args': 'after-used'}]
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'indent': 'off',
        'vue/script-indent': [
          'warn', 2, { 'baseIndent': 1 }
        ]
      }
    }
  ],
  parserOptions: {
    parser: 'babel-eslint'
  }
}