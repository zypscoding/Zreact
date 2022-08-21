const webpack = require('webpack');
const { merge } = require('webpack-merge')
const webpackCommon = require('./webpack.common')
const path = require('path');
module.exports = merge(webpackCommon, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 8082,
  },
})
