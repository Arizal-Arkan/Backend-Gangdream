require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.SERVER_PORT || 2010
const bodyParser = require('body-parser')
const user = require('./main/routes/userRoute')
const score = require('./main/routes/scoreRoute')
const cors = require('cors')
const xss = require('x-xss-protection')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const whitelist = '127.0.0.1,192.168.6.136'
const corsOption = (req, callback) => {
  if (whitelist.split(',').indexOf(req.hostname) !== -1) {
    console.log('Success')
    return callback(null, {
      origin: true
    })
  } else {
    console.log('Failed')
    return callback('Not allowed by CORS', {
      origin: false
    })
  }
}
app.use(xss())
app.use(cors())
app.options('*', cors(corsOption))
app.listen(port, () => {
  console.log(`Kamu di ${port}`)
})
app.use('/user', user)
app.use('/score', score)