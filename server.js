/**
 * 此方法开启服务为兼容开发环境IE调试，devServer下IE报错暂未解决
 * 需BrowserRouter -> HashRouter
 * 需解开common里的new MiniCssExtractPlugin()
 * 热更新还需配置
 */
const express = require('express')
const webpack = require('webpack')
const path = require('path')
const webpackDevMiddleware = require('webpack-dev-middleware')
const  { createProxyMiddleware } =require('http-proxy-middleware')
const webpackHotMiddleware  = require('webpack-hot-middleware')
const  openbrowser = require('openbrowser');
const app = express()
const config = require('./webpack/webpack.dev.js')
const compiler = webpack(config)


app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
)

app.use(webpackHotMiddleware(compiler)); 


app.use('/api',createProxyMiddleware({ target: 'http://localhost:8010/', changeOrigin: true }));
app.get('*', function (request, response){
  const filePath = path.join(__dirname, './release') + '/index.html';
  response.sendFile(filePath)
})
// 创建一个 Web server
const server = app.listen(3001, serverError => {
  if (serverError) {
      return console.error(serverError);
  }
  console.log(`Listening at http://localhost:3001`);
  openbrowser(`http://localhost:3001`);
});

// 终止服务
process.on('SIGTERM', () => {
  console.log('Stopping dev server');
  server.close(() => {
      process.exit(0);
  });
});