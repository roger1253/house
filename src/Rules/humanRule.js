module.exports = runner => {
  return {
    $id: 'human',
    test: /vue-human[\/\\].*\.js$/,
    loader: 'babel-loader',
    exclude: /vue-human[\/\\](node_modules)[\/\\].*/
  }
}
