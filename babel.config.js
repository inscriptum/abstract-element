const presets = [
  [
    "@babel/env",
    {
      targets: {
        ie: "11",
        firefox: "58",
      },
      useBuiltIns: "usage"
    }
  ]
];

module.exports = { presets };