export class AssertionError extends Error {
  constructor (message) {
    super(message)
    this.name = 'AssertionError'
    this.message = message
  }
}

