const webpack = require('webpack')
const { merge } = require('webpack-merge')
const webpackCommon = require('./webpack.common')
const path = require('path');
module.exports = merge(webpackCommon, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      IS_DEV: 'true'  // DefinePlugin会解析定义的环境变量表达式, 当成JS执行
    })
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 8082,
    proxy: {
      '/api': {
        target: 'http://localhost:9999',
        changOrigin: true, //是否开启代理
        pathRewrite: {  // /api开头的请求会到target下请求
          '^/api': '/api'   // http://localhost:9999/api/XXXX
        }
        // pathRewrite: {  // /api开头的请求会到target下请求
        //   '^/api': ''   // 替换/api 为空字符 将http://localhost:9999/api/XXXX替换为http://localhost:9999/XXXX
        // }
      },
    }
  },
})
