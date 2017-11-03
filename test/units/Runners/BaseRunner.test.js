const BaseRunner = require('../../../src/Runners/BaseRunner')

describe('BaseRunner.prototype.run()', () => {
  test('setBaseWebpack', () => {
    const runner = new BaseRunner()
    const config = runner.run()
    expect(config.resolve.extensions).toEqual(['.js', '.vue', '.json'])
  })
})
