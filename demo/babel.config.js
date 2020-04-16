const presets = [
  [
    '@babel/env',
    {
      // "targets": "> 0.25%, not dead"
      targets: {
        esmodules: true
      }
      // modules: false,
      // useBuiltIns: 'usage',
      // corejs: 3
    }
  ]
];

const plugins = [
  // ['@babel/plugin-transform-runtime'],
  // '@babel/plugin-syntax-dynamic-import'
];

module.exports = { presets: undefined, plugins };
