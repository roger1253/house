module.exports = runner => {
  return {
    test: /\.js$/,
    loader: 'babel-loader',
    include: [
      runner.path.join(runner.options.appPath),
      runner.path.join(runner.options.testPath)
    ]
  }
}
