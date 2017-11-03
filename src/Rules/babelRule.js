module.exports = runner => {
  return {
    $id: 'babel',
    test: /\.js$/,
    loader: 'babel-loader',
    include: [
      runner.path.join(runner.options.appPath),
      runner.path.join(runner.options.testPath)
    ]
  }
}
