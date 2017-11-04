const util = require('util')
const express = require('express')
const webpackCli = require('webpack')
const BaseRunner = require('./BaseRunner')

class DevelopmentRunner extends BaseRunner {
  setDevelopmentWebpack () {
    // Extend webpack.entry.app, add webpack-hot-middleware file
    this.webpackBuilder.extend(webpack => {
      Object.keys(webpack.entry).forEach(name => {
        const file = this.path.join(__dirname, '../Utils/devClient.js')
        webpack.entry[name] = [file].concat(webpack.entry[name])
      })
      return webpack
    })

    this.webpackBuilder.merge({
      devtool: '#cheap-module-eval-source-map'
    })

    this.webpackBuilder.addPlugins([
      this.use(require('../Plugins/webpackHotPlugin')),
      this.use(require('../Plugins/webpackNoEmitPlugin')),
      this.use(require('../Plugins/htmlPlugin')),
      this.use(require('../Plugins/FriendlyErrorsPlugin'))
    ])
  }

  run () {
    this.setDevelopmentWebpack()
    console.log(this.webpackBuilder.webpack)
    const webpack = this.webpackBuilder.create()

    const app = express()
    const compiler = webpackCli(webpack)
    const port = this.options.port

    const devMiddleware = require('webpack-dev-middleware')(compiler, {
      publicPath: webpack.output.publicPath,
      quiet: true
    })

    const hotMiddleware = require('webpack-hot-middleware')(compiler, {
      log: () => {}
    })

    // force page reload when html-webpack-plugin template changes
    compiler.plugin('compilation', compilation => {
      compilation.plugin('html-webpack-plugin-after-emit', (data, callback) => {
        hotMiddleware.publish({ action: 'reload' })
        callback()
      })
    })

    // handle fallback for HTML5 history API
    app.use(require('connect-history-api-fallback')())

    // serve webpack bundle output
    app.use(devMiddleware)

    // enable hot-reload and state-preserving
    // compilation error display
    app.use(hotMiddleware)

    // serve pure static assets
    const staticPath = this.path.posix.join(
      this.options.assetsPublicPath, this.options.assetsSubDirectory)
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
}

module.exports = DevelopmentRunner
