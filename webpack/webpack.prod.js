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
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false
      }),
      // new CopyWebpackPlugin({
      //   patterns: [
      //     {
      //       from: path.join(__dirname, 'static'),
      //       // to: 'asset'
      //     }
      //   ]
      // }),
    ]
  }
})
