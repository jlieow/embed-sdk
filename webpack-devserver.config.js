var path = require('path')
var config = require('./config')

var user = require('./demo/demo_user.json')
var {
  createSignedUrl,
  acquireSession,
  generateTokens,
} = require('./server_utils/auth_utils')

var webpackConfig = {
  mode: 'development',
  entry: {
    demo: './demo/demo.ts',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'demo'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      config: path.join(__dirname, './config.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            declaration: false,
          },
        },
      },
    ],
  },
  devServer: {
    compress: true,
    contentBase: [path.join(__dirname, 'demo')],
    host: config.demo_host,
    port: config.demo_port,
    watchContentBase: true,
    before: (app) => {
      app.get('/auth', function (req, res) {
        // Authenticate the request is from a valid user here
        const src = req.query.src
        const url = createSignedUrl(src, user, config.host, config.secret)
        res.json({ url })
      })
      app.get('/auth-cookieless', async function (req, res) {
        try {
          const tokens = await acquireSession(
            config.api_url,
            config.client_id,
            config.client_secret,
            req.headers['user-agent'],
            user
          )
          res.json(tokens)
        } catch (err) {
          res.status(400).send({ message: err.message })
        }
      })
      app.get('/refresh-api-token', async function (req, res) {
        try {
          const tokens = await generateTokens(
            config.api_url,
            config.client_id,
            config.client_secret,
            req.headers['user-agent']
          )
          res.json(tokens)
        } catch (err) {
          res.status(400).send({ message: err.message })
        }
      })
    },
  },
}

module.exports = webpackConfig
