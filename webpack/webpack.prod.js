const webpack = require('webpack')
const { merge } = require('webpack-merge')
const webpackCommon = require('./webpack.common')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const { ROOT_PATH } = require('./const.setting')
module.exports = merge(webpackCommon, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: 'false' // DefinePlugin会解析定义的环境变量表达式, 当成JS执行
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(ROOT_PATH, './static'),
          to: 'static',
          filter: (source) => {
            return source.includes('.js')
          }
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css' // 抽离css的输出目录和名称
    }),
    new CompressionPlugin({
      test: /.(js|css)$/,
      filename: '[path][base].gz',
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        },
      }),
      new CssMinimizerPlugin() // 压缩css
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          name: 'vendors',
          minChunks: 1,
          chunks: 'initial',
          minSize: 0,
          priority: 1
        },
        commons: {
          name: 'commons',
          minChunks: 2,
          chunks: 'initial',
          minSize: 0
        }
      }
    }
  }
})
