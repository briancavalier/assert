import { curry2, id } from '@most/prelude'
import { AssertionError } from './AssertionError'
import isEqual from 'lodash.isequal'
import inspect from 'object-inspect'
export { AssertionError }

// Value equality: assert structural equivalence
// If so, return actual, otherwise throw AssertionError
export const eq = curry2((expected, actual) =>
  isEqual(expected, actual)
    ? actual
    : fail2(`not equivalent: eq(${inspect2(expected, actual)})`, expected, actual))

// Referential equality: assert expected === actual.
// If so, return actual, otherwise throw AssertionError
export const is = curry2((expected, actual) =>
  expected === actual
    ? actual
    : fail2(`not same reference: is(${inspect2(expected, actual)})`, expected, actual))

// Assert b is true.
// If so, return b, otherwise throw AssertionError
export const assert = b =>
  b === true || fail1(`not strictly true: assert(${inspect(b)})`, b)

// Assert f throws. If so, return the thrown value,
// otherwise throw AssertionError.
export const throws = f => {
  let x
  try {
    x = f()
  } catch (e) {
    return e
  }
  fail1(`did not throw, returned: ${inspect(x)}`, x)
}

// Assert p rejects.  Return a promise that rejects if p fulfills,
// and fulfills with p rejects.
export const rejects = p =>
  p.then(failRejects, id)

// Throw an assertion error that describes a rejects failure
const failRejects = x =>
  failAt(rejects, `did not reject, fulfilled: ${inspect(x)}`, undefined, x)

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

// Inspect both values and join into string
const inspect2 = (a, b) => `${inspect(a)}, ${inspect(b)}`
