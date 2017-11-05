const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = runner => {
  // copy custom static assets
  return new CopyWebpackPlugin([
    {
      from: path.join(process.cwd(), 'static'),
      to: runner.options.assetsSubDirectory,
      ignore: ['.*']
    }
  ])
}
