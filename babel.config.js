
module.exports = { 
  presets: [
    [
      '@babel/preset-env', 
      { 
        useBuiltIns: "entry",
        corejs: 3,
        targets: { // какие версии браузеров поддерживать
          edge: '17',
          ie: '11',
          firefox: '50',
          chrome: '64',
          safari: '11.1'
        },
      }
    ]
  ]
};