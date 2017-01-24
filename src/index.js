import { curry2 } from '@most/prelude'
import { AssertionError } from './AssertionError'
import { default as isEqual } from 'lodash-es/isEqual'
export { AssertionError }

// Value equality: assert structural equivalence
// If so, return actual, otherwise throw AssertionError
export const eq = curry2((expected, actual) =>
  isEqual(expected, actual)
    ? actual
    : failWith2(`eq(${expected}, ${actual})`, expected, actual))

// Referential equality: assert expected === actual.
// If so, return actual, otherwise throw AssertionError
export const is = curry2((expected, actual) =>
  expected === actual
    ? actual
    : failWith2(`${expected} === ${actual}`, expected, actual))

// Assert b is true.
// If so, return b, otherwise throw AssertionError
export const assert = b =>
  b === true || failWith1('assertion failed', b)

// Assert f throws. If so, return the thrown value,
// otherwise throw AssertionError.
export const throws = f => {
  let x
  try {
    x = f()
  } catch (e) {
    return e
  }
  failWith1(`did not throw, returned ${x}`, x)
}

// Throw an AssertionError with the provided message.
// Useful for implementing new assertions.
export const fail = message =>
  failAt(fail, message, undefined, message)

// Throw an AssertionError with the provided message, expected,
// and actual values
// Useful for implementing new assertions.
const failWith1 = (message, actual) =>
  failAt(failWith1, message, undefined, actual)

// Throw an AssertionError with the provided message, expected,
// and actual values
// Useful for implementing new assertions.
const failWith2 = (message, expected, actual) =>
  failAt(failWith2, message, expected, actual)

// Throw an AssertionError with the provided message.
// On v8, the call stack will be trimmed at the provided
// function.
// Useful for implementing new assertions.
export const failAt = (fn, message, expected, actual) => {
  throw new AssertionError(message, expected, actual, fn)
}
