const webpack = require('webpack')

module.exports = runner => {
  const defines = {}

  Object.keys(runner.options.env).forEach(name => {
    defines[`process.env.${name}`] = process.env.hasOwnProperty(name)
      ? process.env[name]
      : runner.options.env[name]
  })

  return new webpack.DefinePlugin(defines)
}
