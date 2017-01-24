import { curry2 } from '@most/prelude'
import { AssertionError } from './AssertionError'
import { default as isEqual } from 'lodash-es/isEqual'
export { AssertionError }

// Value equality: assert structural equivalence
// If so, return actual, otherwise throw AssertionError
export const eq = curry2((expected, actual) =>
  isEqual(expected, actual)
    ? actual
    : fail2(`eq(${expected}, ${actual})`, expected, actual))

// Referential equality: assert expected === actual.
// If so, return actual, otherwise throw AssertionError
export const is = curry2((expected, actual) =>
  expected === actual
    ? actual
    : fail2(`${expected} === ${actual}`, expected, actual))

// Assert b is true.
// If so, return b, otherwise throw AssertionError
export const assert = b =>
  b === true || fail1('assertion failed', b)

// Assert f throws. If so, return the thrown value,
// otherwise throw AssertionError.
export const throws = f => {
  let x
  try {
    x = f()
  } catch (e) {
    return e
  }
  fail1(`did not throw, returned ${x}`, x)
}

// Throw an AssertionError with the provided value, which
// will be coerced to a string and used as the failure message.
export const fail = a =>
  failAt(fail, String(a), undefined, a)

// Throw an AssertionError with the provided message, expected,
// and actual values.
const fail1 = (message, actual) =>
  failAt(fail1, message, undefined, actual)

// Throw an AssertionError with the provided message, expected,
// and actual values.
const fail2 = (message, expected, actual) =>
  failAt(fail2, message, expected, actual)

// Throw an AssertionError with the provided message.
// On v8, the call stack will be trimmed at the provided
// function.
export const failAt = (fn, message, expected, actual) => {
  throw new AssertionError(message, expected, actual, fn)
}
