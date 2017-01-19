import { AssertionError } from './AssertionError'
import { curry2 } from '@most/prelude'

export { AssertionError }

class Outcome {
  constructor (ok, value) {
    this.ok = ok
    this.value = value
  }
}

const OK = new Outcome(true, 'OK')

const ok = () => OK
const fail = (value) => new Outcome(false, value)

export const assert = curry2((assertion, value) =>
  verify(assertion(value)))

const verify = outcome =>
  outcome.ok ? outcome : failAssert(assert, outcome.value)

export const eq = expected =>
  actual => expected === actual ? ok() : fail(`eq(${expected}, ${actual})`)

export const or = curry2((a1, a2) =>
  actual => _or(a1(actual), a2, actual))

const _or = (o1, a2, actual) => o1.ok ? o1 : a2(actual)

export const and = curry2((a1, a2) =>
  actual => _and(a1(actual), a2, actual))

const _and = (o1, a2, actual) => o1.ok ? a2(actual) : o1

const failAssert = (stackTop, msg) => {
  throw new AssertionError(msg, stackTop)
}

