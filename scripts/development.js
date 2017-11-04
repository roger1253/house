const DevelopmentRunner = require('../src/Runners/DevelopmentRunner')
const path = require('path')

const runner = new DevelopmentRunner({
  appPath: path.join(process.cwd(), 'example')
})

runner.run()
