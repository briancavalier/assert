export class AssertionError extends Error {
  constructor (message, expected, actual, fn) {
    super(message)
    this.name = 'AssertionError'
    this.message = message
    this.expected = expected
    this.actual = actual

    /* istanbul ignore next */
    if (Error.captureStackTrace) {
      Error.captureStackTrace(
        this,
        typeof fn === 'function' ? fn : AssertionError
      )
    }
  }
}
