const WebpackBuilder = require('../../../src/Builders/WebpackBuilder')

describe('WebpackBuilder.prototype.extend()', () => {
  test('success', () => {
    const builder = new WebpackBuilder()
    const expected = { app: 'main.js' }

    builder.extend(webpack => {
      webpack.entry = expected
      return webpack
    })

    const webpack = builder.create()
    expect(webpack.entry).toEqual(expected)
  })

  test('throw undefined', () => {
    const builder = new WebpackBuilder()
    const expected = { app: 'main.js' }

    expect(() => {
      builder.extend(webpack => {
        webpack.entry = expected
      })
    }).toThrowError('You need return a webpack config.')
  })

  test('throw need object value', () => {
    const builder = new WebpackBuilder()
    const expected = { app: 'main.js' }

    expect(() => {
      builder.extend(webpack => {
        return 'Hi, house.'
      })
    }).toThrowError('You need return a object webpack config')
  })
})

describe('WebpackBuilder.prototype.addExtension()', () => {
  const builder = new WebpackBuilder()

  test('addExtension', () => {
    builder.addExtension('.js')
    const webpack = builder.create()
    const expected = ['.js']
    expect(webpack.resolve.extensions).toEqual(expected)
  })
})

describe('WebpackBuilder.prototype.addExtensions()', () => {
  const builder = new WebpackBuilder()

  test('addExtensions', () => {
    const expected = ['.js', '.json', '.css']
    builder.addExtensions(expected)
    const webpack = builder.create()
    expect(webpack.resolve.extensions).toEqual(expected)
  })
})

describe('WebpackBuilder.prototype.addRule()', () => {
  const builder = new WebpackBuilder()

  test('addRule', () => {
    const expected = {
      $id: 'human'
    }

    builder.addRule(expected)
    const webpack = builder.create()
    expect(webpack.module.rules).toEqual([ expected ])
  })
})

describe('WebpackBuilder.prototype.addRules()', () => {
  const builder = new WebpackBuilder()

  test('addRules', () => {
    const expected = [
      { $id: 'human' },
      { $id: 'robot' }
    ]

    builder.addRules(expected)
    const webpack = builder.create()
    expect(webpack.module.rules).toEqual(expected)
  })
})

describe('WebpackBuilder.prototype.removeRuleById()', () => {
  const builder = new WebpackBuilder()

  test('remove two human', () => {
    const expected = [
      { $id: 'human' },
      { $id: 'human'}
    ]

    builder.addRules(expected)
    builder.removeRuleById('human')
    const webpack = builder.create()
    expect(webpack.module.rules).toEqual([])
  })

  test('remove human and reserve robot', () => {
    const expected = [
      { $id: 'human' },
      { $id: 'robot'}
    ]

    builder.addRules(expected)
    builder.removeRuleById('human')
    const webpack = builder.create()
    expect(webpack.module.rules).toEqual([ { $id: 'robot'} ])
  })
})
