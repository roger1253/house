const DevelopmentRunner = require('../../../src/Runners/DevelopmentRunner')

describe('DevelopmentRunner.prototype.run()', () => {
  test('run', () => {
    const runner = new DevelopmentRunner()
    const config = runner.run()
  })
})
