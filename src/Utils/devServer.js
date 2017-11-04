const path = require('path')
const express = require('express')
const webpackCli = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const connectHistoryApiFallback = require('connect-history-api-fallback')

module.exports = ({ webpack, port, proxyTable, assetsPublicPath, assetsSubDirectory }) => {
  const app = express()
  const compiler = webpackCli(webpack)

  const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpack.output.publicPath,
    quiet: true
  })

  const hotMiddleware = webpackHotMiddleware(compiler, {
    log: () => {}
  })

  // force page reload when html-webpack-plugin template changes
  compiler.plugin('compilation', compilation => {
    compilation.plugin('html-webpack-plugin-after-emit', (data, callback) => {
      hotMiddleware.publish({ action: 'reload' })
      callback()
    })
  })

  // proxy api requests
  Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
      options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
  })

  // handle fallback for HTML5 history API
  app.use(connectHistoryApiFallback())

  // serve webpack bundle output
  app.use(devMiddleware)

  // enable hot-reload and state-preserving
  // compilation error display
  app.use(hotMiddleware)

  // serve pure static assets
  const staticPath = path.posix.join(assetsPublicPath, assetsSubDirectory)
  app.use(staticPath, express.static('./static'))

  const uri = 'http://localhost:' + port

  let _resolve
  const readyPromise = new Promise(resolve => {
    _resolve = resolve
  })

  console.log('> Starting dev server...')
  devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n')
    _resolve()
  })

  const server = app.listen(port)

  return {
    ready: readyPromise,
    close: () => {
      server.close()
    }
  }
}
