const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar')
const isDev = process.env.NODE_ENV === 'development'
// webpack的配置文件遵循着CommonJS规范
module.exports = {
  entry: {
    webUI: './src/index.tsx'
  },
  output: {
    publicPath: isDev ? '/' : './',
    path: path.resolve(__dirname, isDev ? '../dist' : '../release'),
    filename: isDev ? '[name].bundle.js' : '[name].[hash-8].bundle.js',
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
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/,
        type: 'asset/resource',
        // use: [{
        //   loader: 'url-loader',
        //   options: {
        //     limit: 5 * 1024, //5kb
        //     outputPath: 'images',
        //     name: '[name].[hash:6].[ext]'
        //   }
        // }]
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
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
      }

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
