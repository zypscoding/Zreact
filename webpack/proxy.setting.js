const proxySetting = {
  '/api': {
    target: 'http://localhost:9999',
    changOrigin: true, //是否开启代理
    pathRewrite: {
      // /api开头的请求会到target下请求
      '^/api': '/api' // http://localhost:9999/api/XXXX
    }
    // pathRewrite: {  // /api开头的请求会到target下请求
    //   '^/api': ''   // 替换/api 为空字符 将http://localhost:9999/api/XXXX替换为http://localhost:9999/XXXX
    // }
  }
}
module.exports = proxySetting
