const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = runner => {
  return new ExtractTextPlugin({
    filename: runner.parseAssetsFilename('css/[name].[contenthash].css')
  })
}
