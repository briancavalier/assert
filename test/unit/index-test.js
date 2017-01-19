import { describe, it } from 'mocha'
import { assert, eq } from '../../src/index'

describe('assert', () => {
  it('should pass for true', () => {
    assert(eq(1, 1))
  })
})
