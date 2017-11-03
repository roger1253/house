const cssLoaders = require('../Utils/cssLoaders')

module.exports = runner => {
  return {
    $id: 'vue',
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
      loaders: cssLoaders(runner.options)
    }
  }
}
