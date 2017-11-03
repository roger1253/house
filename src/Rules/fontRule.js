module.exports = runner => {
  const name = runner.path.posix.join(
    runner.options.assetsSubDirectory, 'fonts/[name].[hash:7].[ext]')

  return {
    $id: 'font',
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name
    }
  }
}
