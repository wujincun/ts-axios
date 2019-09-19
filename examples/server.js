const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(webpackConfig)

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/dist/',
    stats: {
      colors: true,
      chunks: false
    }
  })
)
app.use(webpackHotMiddleware(compiler))
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
const router = express.Router()
simpleDemo()
baseDemo()
errorDemo()
extendsDemo()
interceptorDemo()
configDemo()
function simpleDemo() {
  router.get('/simple/get', function(req, res) {
    res.json({
      msg: 'hello world'
    })
  })
}
function baseDemo() {
  router.get('/base/get', function(req, res) {
    res.json(req.query)
  })
  router.post('/base/post', function(req, res) {
    res.json(req.body)
  })
  router.post('/base/buffer', function(req, res) {
    let msg = []
    req.on('data', chunk => {
      if (chunk) {
        msg.push(chunk)
      }
    })
    req.on('end', () => {
      let buf = Buffer.concat(msg)
      res.json(buf.toJSON())
    })
  })
}
function errorDemo() {
  router.get('/error/get', function(req, res) {
    if (Math.random() > 0.5) {
      res.json({
        msg: 'hello world'
      })
    } else {
      res.status(500)
      res.end()
    }
  })
  router.get('/error/timeout', function(req, res) {
    setTimeout(() => {
      res.json({
        msg: 'hello world'
      })
    }, 3000)
  })
}
function extendsDemo() {
  router.get('/extends/get', function(req, res) {
    res.json({
      msg: 'hello world'
    })
  })
  router.options('/extends/options', function(req, res) {
    res.end()
  })
  router.delete('/extends/delete', function(req, res) {
    res.end()
  })
  router.head('/extends/head', function(req, res) {
    res.end()
  })
  router.post('/extends/post', function(req, res) {
    res.json(req.body)
  })
  router.put('/extends/put', function(req, res) {
    res.end()
  })
  router.patch('/extends/patch', function(req, res) {
    res.end()
  })

  router.get('/extends/user', function(req, res) {
    res.json({
      code: 0,
      message: 'ok',
      result: {
        name: 'jack',
        age: '18'
      }
    })
  })
}
function interceptorDemo() {
  router.get('/interceptor/get', function(req, res) {
    res.end('hello')
  })
}
function configDemo() {
  router.post('/config/post', function(req, res) {
    res.json(req.body)
  })
}

app.use(router)

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on ${port}`)
})
