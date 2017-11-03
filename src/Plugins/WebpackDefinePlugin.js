const webpack = require('webpack')

module.exports = runner => {
  const defines = {}

  Object.keys(runner.config.env).forEach(name => {
    defines[`process.env.${name}`] = process.env.hasOwnProperty(name)
      ? process.env[name]
      : runner.config.env[name]
  })

  return new webpack.DefinePlugin(defines)
}
