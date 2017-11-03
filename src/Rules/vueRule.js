module.exports = runner => {
  return {
    $id: 'vue',
    test: /\.vue$/,
    loader: 'vue-loader'
    // options: this.getVueLoader()
  }
}
