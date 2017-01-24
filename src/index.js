import { curry2 } from '@most/prelude'
import { AssertionError } from './AssertionError'
import { default as isEqual } from 'lodash-es/isEqual'
export { AssertionError }

// Value equality: assert structural equivalence
// If so, return actual, otherwise throw AssertionError
export const eq = curry2((expected, actual) =>
  isEqual(expected, actual)
    ? actual
    : fail(`eq(${expected}, ${actual})`))

// Referential equality: assert expected === actual.
// If so, return actual, otherwise throw AssertionError
export const is = curry2((expected, actual) =>
  expected === actual
    ? actual
    : fail(`${expected} === ${actual}`))

// Assert b is true.
// If so, return b, otherwise throw AssertionError
export const assert = is(true)

// Assert f throws. If so, return the thrown value,
// otherwise throw AssertionError.
export const throws = f => {
  let x
  try {
    x = f()
  } catch (e) {
    return e
  }
  fail(`did not throw, returned ${x}`)
}

// Throw an AssertionError with the provided message.
// Useful for implementing new assertions.
export const fail = message =>
  failAt(fail, message)

// Throw an AssertionError with the provided message.
// On v8, the call stack will be trimmed at the provided
// function.
// Useful for implementing new assertions.
export const failAt = (fn, message) => {
  const e = new AssertionError(message)

  /* istanbul ignore next */
  if (Error.captureStackTrace) {
    Error.captureStackTrace(e, fn)
  }

  throw e
}
