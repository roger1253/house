module.exports = runner => {
  const name = runner.path.posix.join(
    runner.options.assetsSubDirectory, 'img/[name].[hash:7].[ext]')

  return {
    $id: 'image',
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name
    }
  }
}
