const webpack = require('webpack')

module.exports = runner => {
  const defines = {}

  Object.keys(runner.options.env).forEach(name => {
    defines[`process.env.${name}`] = process.env.hasOwnProperty(name)
      ? JSON.stringify(process.env[name])
      : JSON.stringify(runner.options.env[name])
  })

  return new webpack.DefinePlugin(defines)
}
