const path = require('path')
const WebpackBuilder = require('../Builders/WebpackBuilder')
const defaultOptions = require('./defaultOptions')
const humanRule = require('../Rules/human')

class BaseRunner {
  /**
   * @constructor
   *
   * @param {Object} options some options
   */
  constructor (options) {
    this.path = path
    this.options = Object.assign({}, defaultOptions, options)
    this.webpackBuilder = new WebpackBuilder()
    this.setBaseWebpack()
  }

  /**
   * Set base webpack builder and config
   *
   * @public setBaseWebpack
   */
  setBaseWebpack () {
    this.webpackBuilder.merge({entry: {
      app: this.path.join(this.options.appPath, this.options.entryName)
    }})

    this.webpackBuilder.merge({output: {
      path: this.path.join(this.options.assetsRoot),
      filename: '[name].js',
      publicPath: path.join(this.options.assetsPublicPath)
    }})

    this.webpackBuilder.addExtensions(['.js', '.vue', '.json'])
    this.webpackBuilder.addRule(this.use(humanRule))
  }

  /**
   * Call some function, and send this to them for using context and methods
   *
   * @public use
   *
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  use (callback) {
    return callback.call(this, this)
  }

  /**
   * Important method for extended class
   *
   * @public run
   *
   * @return {Object} webpack config
   */
  run () {
    return this.webpackBuilder.create()
  }
}

module.exports = BaseRunner
