import { describe, it } from 'mocha'
import { assert, eq, or, and } from '../../src/index'

describe('assert', () => {
  it('should pass for true', () => {
    assert(eq(1), 1)
    assert(or(eq(1), eq(2)), 1)
    assert(and(eq(1), eq(1)), 1)
  })
})
