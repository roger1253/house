const cssLoader = require('../Utils/cssLoaders')

module.exports = runner => {
  return {
    $id: 'vue',
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
      loaders: cssLoader(runner.options)
    }
  }
}
