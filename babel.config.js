const IS_DEV = process.env.NODE_ENV === 'development'
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: {
          version: 2
        },
        targets: {
          chrome: '60',
          firefox: '60',
          ie: '9',
          safari: '10',
          edge: '17'
        }
      }
    ]
  ],
  plugins: [
    IS_DEV && require.resolve('react-refresh/babel'), // 如果是开发模式,就启动react热更新插件
    '@babel/plugin-transform-runtime', //如果需要使用`generator`
    'transform-es2015-modules-commonjs' //混用module.exports 与 import
  ].filter(Boolean)[('@babel/plugin-proposal-decorators', { legacy: true })] //过滤空值
}
