const path = require('path')

const ROOT_PATH = path.resolve(__dirname, '../')
const APP_NAME = path.parse(ROOT_PATH).name

module.exports = {
  ROOT_PATH,
  APP_NAME
}
