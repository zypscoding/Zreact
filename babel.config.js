module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    IS_DEV && require.resolve('react-refresh/babel'),
    '@babel/plugin-transform-runtime' //如果需要使用`generator`
  ].filter(Boolean) //过滤空值
}
