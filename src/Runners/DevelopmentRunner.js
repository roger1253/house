const BaseRunner = require('./BaseRunner')

class DevelopmentRunner extends BaseRunner {
  /**
   * @constructor
   */
  constructor (...args) {
    super(...args)
    this.setDevelopmentWebpack()
  }

  /**
   * Extend development webpack config
   *
   * @public setDevelopmentWebpack
   * @return {this}
   */
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

    return this
  }

  /**
   * Run runner
   *
   * @public run
   * @return {Object}
   */
  run () {
    return require('../Utils/devServer').call(this, {
      webpack: this.webpackBuilder.create(),
      port: this.options.port,
      proxyTable: this.options.proxyTable,
      assetsPublicPath: this.options.assetsPublicPath,
      assetsSubDirectory: this.options.assetsSubDirectory
    })
  }
}

module.exports = DevelopmentRunner
