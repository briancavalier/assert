import { describe, it } from 'mocha'
import { assert, assertThat, AssertionError } from '../../src/index'

describe('assert', () => {
  it('should pass for true', () => {
    assert(true)
  })

  it('should throw AssertionError for false', () => {
    try {
      assert(false)
    } catch(e) {
      assert(e instanceof AssertionError)
    }
  })
})

describe('assertThat', () => {
  it('should pass for true', () => {
    assertThat('pass', true)
  })

  it('should throw AssertionError for false', () => {
    try {
      assertThat('fail', false)
    } catch(e) {
      assert(e instanceof AssertionError)
    }
  })
})
