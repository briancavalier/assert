import { curry2 } from '@most/prelude'
import { AssertionError } from './AssertionError'
export { AssertionError }

// Assert expected === actual.
// If so, return actual, otherwise throw AssertionError
export const eq = curry2((expected, actual) =>
  expected === actual
    ? actual
    : fail(`${expected} !== ${actual}`))

// Assert b is true.
// If so, return b, otherwise throw AssertionError
export const assert = eq(true)

// Throw an AssertionError with a stack trace that ends at
// the provided stackTop function, and the provided message.
// Useful for implementing new assertions.
export const fail = message => {
  throw new AssertionError(message, '@most/prelude')
}
