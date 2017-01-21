import { describe, it } from 'mocha'
import { eq, assert } from '../src/index'
import { AssertionError } from '../src/AssertionError'

describe('AssertionError', () => {
  it('should be an Error', () => {
    assert(new AssertionError('') instanceof Error)
  })

  it('should have expected name', () => {
    eq('AssertionError', new AssertionError('').name)
  })

  it('should have expected message', () => {
    const message = `${Math.random()}`
    eq(message, new AssertionError(message).message)
  })
})
