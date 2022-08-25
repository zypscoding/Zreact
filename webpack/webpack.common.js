const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar')
const isDev = process.env.NODE_ENV === 'development'
const getCssLoaders = (importLoaders) => [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      modules: false,
      sourceMap: isDev,
      importLoaders,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      // plugins: {
      postcssOptions:
      {
        ident: 'postcss',
        // 修复一些和 flex 布局相关的 bug
        plugins: [require('postcss-flexbugs-fixes'),
        require('postcss-preset-env')({
          autoprefixer: {
            grid: true,
            flexbox: 'no-2009'
          },
          stage: 3,
        }),
        require('postcss-normalize')],
      }
      ,
      // },
      sourceMap: isDev,
    },
  },
]
// webpack的配置文件遵循着CommonJS规范
module.exports = {
  entry: {
    webUI: './src/index.tsx'
  },
  output: {
    publicPath: isDev ? '/' : './',
    path: path.resolve(__dirname, isDev ? '../dist' : '../release'),
    filename: isDev ? '[name].bundle.js' : '[name].[hash:8].bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: getCssLoaders(1),
      },
      {
        test: /\.less$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDev,
            }
          }]
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
            }
          }]
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|bmp)$/,
        // type: 'asset/resource', // 和file-loader类似(webpack5)
        use: [{
          loader: 'url-loader',
          options: {
            limit: 5 * 1024, //5kb
            outputPath: 'images',
            name: '[name].[hash:6].[ext]'
          }
        }],
        type: 'javascript/auto', //防止重复加载资源
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        // type: 'asset/inline', //和url-loader类似(webpack5)
        use: [{
          loader: 'url-loader',
          options: {
            name: 'fonts/[name].[hash:6].[ext]',
          }
        }]
      },
      {
        test: /\.(wav|mp3|ogg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "url-loader", options: {
              limit: 2000,
              name: "music/[name].[ext]",
              fallback: 'file-loader'
            }
          },
        ]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '探索demo',
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      favicon: './src/favicon.ico'
    }),
    new WebpackBar({
      name: isDev ? '正在启动' : '正在打包',
      color: '#fa8c16',
    }),
  ],

}
