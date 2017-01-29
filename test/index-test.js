import { describe, it } from 'mocha'
import { eq, is, assert, throws, rejects, fail, failAt } from '../src/index'
import { AssertionError } from '../src/AssertionError'

describe('eq', () => {
  it('should pass for equal primitives', () => {
    eq(1, eq(1, 1))
    eq(0, eq(0, 0))
    eq(-0, eq(-0, -0))
    eq(0, eq(-0, 0))
    eq('1', eq('1', '1'))
    eq(true, eq(true, true))
    eq(false, eq(false, false))
  })

  it('should fail for non-equal primitives', () => {
    throwsAssertionError(eq(1), 0)
    throwsAssertionError(eq('1'), '0')
    throwsAssertionError(eq(true), false)
  })

  const a1 = { value: 'a' }
  const a2 = { value: 'a'}
  const b = { value: 'b' }
  const c = {}
  const d = { value: 'd', extra: 'test' }

  it('should pass for equivalent objects', () => {
    eq(a1, eq(a1, a1))
    eq(a1, eq(a1, a2))
    eq(a1, eq(a1)(a2))
  })

  it('should fail for non-equivalent objects', () => {
    throwsAssertionError(eq(a1), b)
    throwsAssertionError(eq(a1), c)
    throwsAssertionError(eq(a1), d)
  })
})

describe('is', () => {
  const a = {}

  it('should pass for strictly equal', () => {
    is(a, is(a, a))
    is(a, is(a)(a))
  })

  it('should fail for not equal', () => {
    throwsAssertionError(is(1), 2)
    throwsAssertionError(is(1), '1')
    throwsAssertionError(is({}), {})
  })
})

describe('assert', () => {
  it('should pass for true', () => {
    assert(assert(true))
  })

  it('should fail for truthy', () => {
    throwsAssertionError(assert, 1)
    throwsAssertionError(assert, 'true')
    throwsAssertionError(assert, {})
    throwsAssertionError(assert, [])
  })

  it('should fail for false and falsy', () => {
    throwsAssertionError(assert, false)
    throwsAssertionError(assert, 0)
    throwsAssertionError(assert, '')
    throwsAssertionError(assert, null)
    throwsAssertionError(assert, undefined)
  })
})

describe('throws', () => {
  it('should pass when f throws', () => {
    const e = new Error()
    is(e, throws(() => { throw e }))
  })

  it('should fail when f returns', () => {
    throwsAssertionError(throws, () => {})
  })
})

describe('rejects', () => {
  it('should pass when p rejects', () => {
    const expected = new Error()
    return rejects(Promise.reject(expected))
      .then(is(expected))
  })

  it('should fail when p fulfills', () => {
    return rejects(rejects(Promise.resolve()))
      .then(e => assert(e instanceof AssertionError))
  })
})

describe('fail', () => {
  it('should fail with message', () => {
    const message = `${Math.random()}`
    try {
      fail(message)
      fail('Expected AssertionError')
    } catch(e) {
      assertIsAssertionError(e)
      eq(message, e.message)
    }
  })
})

describe('failAt', () => {
  it('should fail with message', () => {
    const message = `${Math.random()}`
    function test (message) {
      failAt(test, message)
    }

    try {
      test(message)
      fail('Expected AssertionError')
    } catch(e) {
      assertIsAssertionError(e)
      eq(message, e.message)
    }
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
