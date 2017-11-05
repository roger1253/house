const ProductionRunner = require('../src/Runners/ProductionRunner')
const path = require('path')

const runner = new ProductionRunner({
  appPath: path.join(process.cwd(), 'example')
})

runner.run()
