const utils = require('./utils')
const express = require('express')
const app = express()
const server = utils.getLocalIp()
// const cors = require('cors')
// app.use(cors())
app.get('/api/v1/getUser', (req, res) => {
  res.send({
    name: 'zp',
    age: 18
  })
})
app.listen(9999, () => {
  console.log(`http://localhost:9999`)
})
