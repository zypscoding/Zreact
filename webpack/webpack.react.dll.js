const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    react: ['react', 'react-dom/client']
  },
  output: {
    filename: '[name]_dll.js',
    path: path.resolve(__dirname, '../release'),
    library: '[name]_dll'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_dll',
      path: path.resolve(__dirname, '../release/manifest.json')
    })
  ]
}
