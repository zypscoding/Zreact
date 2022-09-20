const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar')
const { ROOT_PATH } = require('./const.setting')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const getCssLoaders = (importLoaders) => [
  isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      modules: false,
      sourceMap: isDev,
      importLoaders
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        ident: 'postcss',
        // 修复一些和 flex 布局相关的 bug
        plugins: [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              grid: true,
              flexbox: 'no-2009'
            },
            stage: 3
          }),
          require('postcss-normalize')
        ]
      },
      sourceMap: isDev
    }
  }
]
// webpack的配置文件遵循着CommonJS规范
module.exports = {
  entry: {
    webUI: path.resolve(ROOT_PATH, './src/index.tsx')
  },
  output: {
    publicPath: '/',
    path: path.resolve(ROOT_PATH, './release'),
    filename: isDev ? 'js/[name].bundle.js' : 'js/[name].[chunkhash:8].bundle.js',
    clean: true, // 在生成文件之前清空 output 目录
    environment: {
      //告诉 webpack 在生成的运行时代码中可以使用哪个版本的 ES 特性。 webpack5 默认支持es6语法(不支持IE)
      arrowFunction: false,
      const: false,
      destructuring: false,
      forOf: false,
      optionalChaining: false,
      templateLiteral: false
    }
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.mjs', '.json'],
    alias: {
      '@': path.join(ROOT_PATH, './src')
    },
    modules: [path.resolve(__dirname, '../node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, '../node_modules/react-router'), path.resolve(__dirname, '../node_modules/react-router-dom')],
        use: [
          // 'thread-loader', //不支持抽离css 启动时间大约600ms左右,适合规模比较大的项目
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              allowTsInNodeModules: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: getCssLoaders(1),
        include: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../node_modules/antd/dist/antd.css')]
      },
      {
        test: /\.less$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDev
            }
          }
        ],
        include: [path.resolve(__dirname, '../src')]
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'resolve-url-loader' //解决scss文件backgroundimg的url问题,需要sass-loader sourceMap
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true // <-- !!IMPORTANT!!
            }
          }
        ]
      },
      //webpack4 处理图片方式
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|bmp)$/,
        type: 'javascript/auto',
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024, //小于10kb转base64
              outputPath: 'images',
              name: '[name].[contenthash:6].[ext]',
              esModule: false
            }
          }
        ]
      },
      // webpack5 处理图标方式
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        },
        generator: {
          filename: 'fonts/[name].[contenthash:6].[ext]'
        }
      },
      {
        test: /.(mp4|mp3|aac|wav|webm|ogg|flac)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        },
        generator: {
          filename: 'media/[name].[contenthash:6].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'zReactDemo',
      template: path.resolve(ROOT_PATH, './public/index.html'),
      filename: 'index.html',
      favicon: path.resolve(ROOT_PATH, './static/favicon.ico'),
      inject: true //自动注入静态资源
    }),
    new WebpackBar({
      name: isDev ? '正在启动' : '正在打包',
      color: '#fa8c16'
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /\.\/locale/,
      contextRegExp: /moment/
    })
    // new MiniCssExtractPlugin() //npm run server开启用，有别于npm run dev
    // new webpack.DllReferencePlugin({
    //   manifest: path.resolve(__dirname, '../release/manifest.json')
    // }),
    // new AddAssetHtmlWebpackPlugin({
    //   filepath: path.resolve(__dirname, '../release/react_dll.js')
    // })
  ],
  cache: {
    type: 'filesystem' // 使用文件缓存webpack5持久化缓存
  }
}
