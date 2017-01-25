import { describe, it } from 'mocha'
import { eq, is, assert } from '../src/index'
import { AssertionError } from '../src/AssertionError'

describe('AssertionError', () => {
  it('should be an Error', () => {
    assert(new AssertionError('') instanceof Error)
  })

  it('should have expected name', () => {
    eq('AssertionError', new AssertionError('').name)
  })

  it('should have expected message, expected, actual', () => {
    const message = `${Math.random()}`
    const expected = {}
    const actual = {}

    const e = new AssertionError(message, expected, actual)

    eq(message, e.message)
    is(expected, e.expected)
    is(actual, e.actual)
  })
})
