export class AssertionError extends Error {
  constructor (message, stackTop) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    captureStack(this, stackTop)
  }
}

function captureStack (target, stackTop) {
  /* istanbul ignore else */
  if (Error.captureStackTrace) {
    Error.captureStackTrace(target, stackTop)
  } else {
    const { stack } = new Error()
    if (stack) {
      const index = stack.indexOf(`\n${stackTop}`)
      if (index >= 0) {
        target.stack = stack.slice(stack.indexOf(`\n${index + 1}`) + 1)
      }
    }
  }
}
