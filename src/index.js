import { curry2 } from '@most/prelude'
import { AssertionError } from './AssertionError'

export { AssertionError }

export const assert = b => verify(assert, 'assertion failed', b)

export const assertThat = curry2((message, b) => verify(assertThat, message, b))

const verify = (stackTop, msg, b) =>
  b || fail(msg, stackTop)

const fail = (msg, stackTop) => {
  throw new AssertionError(msg, stackTop)
}

