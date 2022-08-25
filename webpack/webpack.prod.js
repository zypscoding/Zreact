
const webpack = require('webpack');
const { merge } = require('webpack-merge')
const webpackCommon = require('./webpack.common')
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = merge(webpackCommon, {
  mode: "production",
  plugins: [

    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      IS_DEV: 'false',  // DefinePlugin会解析定义的环境变量表达式, 当成JS执行
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(__dirname, '../static'),
            to: 'static'
          }
        ]
      }),
    ]
  }
})
