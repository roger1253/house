const webpack = require('webpack')

module.exports = runner => {
  return new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
    sourceMap: true
  })
}
