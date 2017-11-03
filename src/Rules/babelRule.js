module.exports = runner => {
  return {
    test: /\.js$/,
    loader: 'babel-loader',
    include: [
      runner.path.join(runner.options.appPath),
      runner.path.join(runner.options.testPath)
    ],
    options: {
      presets: [ 'es2015', 'stage-2' ],
      plugins: ['transform-runtime'],
      comments: false
    }
  }
}
