import { describe, it } from 'mocha'
import { fail, eq, assert, AssertionError } from '../src/index'

describe('fail', () => {
  it('should throw AssertionError with message', () => {
    const message = `${Math.random()}`
    try {
      fail(message)
    } catch(e) {
      assertIsAssertionError(e)
      eq(message, e.message)
    }
  })
})

describe('eq', () => {
  const a = {}

  it('should pass when strictly equal', () => {
    eq(a, eq(a, a))
    eq(a, eq(a)(a))
  })

  it('should throw AssertionError for not equal', () => {
    throwsAssertionError(eq(1), 2)
    throwsAssertionError(eq(1), '1')
    throwsAssertionError(eq({}), {})
  })
})

describe('assert', () => {
  it('should pass for true', () => {
    assert(true)
  })

  it('should throw AssertionError for false', () => {
    throwsAssertionError(assert, false)
  })
})

function assertIsAssertionError (e) {
  if(!(e instanceof AssertionError) || e.name !== 'AssertionError') {
    throw new AssertionError(`expected AssertionError, but threw: ${e.stack}`, assertIsAssertionError)
  }

  return e
}

function throwsAssertionError (f, a) {
  let r
  try {
    r = f(a)
  } catch(e) {
    assertIsAssertionError(e)
    return
  }

  throw new AssertionError(`expected AssertionError, but returned: ${r}`, throwsAssertionError)
}
