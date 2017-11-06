const proxyMiddleware = require('http-proxy-middleware')

module.exports = (app, proxyTable) => {
  Object.keys(proxyTable).forEach(name => {
    let options = proxyTable[name]
    if (typeof options === 'string') options = { target: options }
    app.use(proxyMiddleware(options.filter || name, options))
  })
}
