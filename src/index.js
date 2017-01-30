import { curry3, curry4, id } from '@most/prelude'
import { AssertionError } from './AssertionError'
import isEqual from 'lodash.isequal'
import inspect from 'object-inspect'
export { AssertionError }

const sameRef = (a, b) => a === b

const _where = curry3((m, p, a) =>
  p(a) === true ? a
    : fail1(_where, `${m}${inspectPredicate(p)}(${inspect(a)})`, a))

const _where2 = curry4((m, p2, a, b) =>
  p2(a, b) === true ? b
    : fail2(`${m}${inspectPredicate(p2)}(${inspect2(a, b)})`, a, b))

// Assert a unary boolean predicate holds
// Given a predicate p, return an assertion that passes if
// p(a) holds, and throws AssertionError otherwise
export const where = _where('failed: ')

// Assert a binary boolean predicate holds
// Given a predicate p2, return an assertion that passes if
// p2(a, b) holds, and throws AssertionError otherwise
export const where2 = _where2('failed: ')

// Value equality: assert structural equivalence
// If so, return actual, otherwise throw AssertionError
export const eq = _where2('not equal: ', isEqual)

// Referential equality: assert expected === actual.
// If so, return actual, otherwise throw AssertionError
export const is = _where2('not same reference: ', sameRef)

// Assert b is true.
// If so, return b, otherwise throw AssertionError
export const assert = _where('not true: ', id)

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

// Try not very hard to return a string representing a predicate
const inspectPredicate = f => f === sameRef ? 'is' : f === isEqual ? 'eq' : f.name || ''
