import { curry2 } from '@most/prelude'

export const assert = b => verify(assert, 'assertion failed', b)

export const assertThat = curry2((message, b) => verify(assertThat, message, b))

const verify = (stackTop, msg, b) =>
  b || fail(msg, stackTop)

const fail = (msg, stackTop) => {
  throw new AssertionError(msg, stackTop)
}

const captureStack = Error.captureStackTrace || tryToCaptureStack

function tryToCaptureStack (target, stackTop) {
  const { stack } = new Error()
  if (stack) {
    const index = stack.indexOf(`\n${stackTop}`)
    if (index >= 0) {
      target.stack = stack.slice(stack.indexOf(`\n${index + 1}`) + 1)
    }
  }
}

export class AssertionError extends Error {
  constructor (message, stackTop) {
    super(message)
    this.message = message
    captureStack(this, stackTop)
  }
}
