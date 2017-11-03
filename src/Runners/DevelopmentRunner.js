const util = require('util')
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

    this.webpackBuilder.addPlugin(this.use(require('../Plugins/WebpackHotModuleReplacementPlugin')))
  }

  run () {
    this.setDevelopmentWebpack()
    const config = this.webpackBuilder.create()
    console.log(util.inspect(config, {depth: null}))
    return config
  }
}

module.exports = DevelopmentRunner
