export class AssertionError extends Error {
  constructor (message) {
    super(message)
    this.name = 'AssertionError'
    this.message = message

    /* istanbul ignore else */
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this)
    }
  }
}

