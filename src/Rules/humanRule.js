module.exports = runner => {
  return {
    test: /vue-human[\/\\].*\.js$/,
    loader: 'babel-loader',
    exclude: /vue-human[\/\\](node_modules)[\/\\].*/,
    options: require('./babelOptions')
  }
}
