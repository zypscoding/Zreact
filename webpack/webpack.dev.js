const webpack = require('webpack')
const { merge } = require('webpack-merge')
const webpackCommon = require('./webpack.common')
const path = require('path')
const { ROOT_PATH } = require('./const.setting')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const proxySetting = require('./proxy.setting')
module.exports = merge(webpackCommon, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: 'true' // DefinePlugin会解析定义的环境变量表达式, 当成JS执行
    }),
    // new ReactRefreshWebpackPlugin() //热更新 (保留状态 测试无用 待研究) 不支持IE
  ],
  // devServer: {
  //   historyApiFallback: true, //解决history路由404问题
  //   hot: true,
  //   open: true,
  //   port: 3000,
  //   static: {
  //     directory: path.join(ROOT_PATH, './static') //托管静态资源static文件夹
  //   },
  //   proxy: {
  //     ...proxySetting
  //   },
  //   // client: {
  //   //   webSocketURL: 'ws://0.0.0.0:8080/ws',
  //   // },
  // }
})
