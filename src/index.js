import { AssertionError } from './AssertionError'
import { curry2 } from '@most/prelude'

export { AssertionError }

export const fail = (message) => failAssert(assert, message)

export const assert = assertion =>
  typeof assertion === 'boolean'
    ? assertion || failAssert(assert, 'assertion failed')
    : assertion.assert()

export const eq = curry2((expected, actual) => new Eq(expected, actual))

class Eq {
  constructor (expected, actual) {
    this.expected = expected
    this.actual = actual
  }

  assert () {
    return this.expected === this.actual || fail(`eq(${this.expected}, ${this.actual})`)
  }
}

export const or = curry2((a1, a2) => new Or(a1, a2))

class Or {
  constructor (a1, a2) {
    this.a1 = a1
    this.a2 = a2
  }

  assert () {
    return this.a1.assert() || this.a2.assert()
  }
}

export const and = curry2((a1, a2) => new And(a1, a2))

class And {
  constructor (a1, a2) {
    this.a1 = a1
    this.a2 = a2
  }

  assert () {
    return this.a1.assert() && this.a2.assert()
  }
}

const failAssert = (stackTop, msg) => {
  throw new AssertionError(msg, stackTop)
}

