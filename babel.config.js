const presets = [
  [
    "@babel/env",
    {
      targets: {
        ie: "11",
        firefox: "58",
      },
      useBuiltIns: "usage",
      corejs: 3
    }
  ]
];

module.exports = { presets };