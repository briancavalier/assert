export function eq<A> (expected: A, actual: A): A
export function eq<A> (expected: A): (actual: A) => A

export function is<A> (expected: A, actual: A): A
export function is<A> (expected: A): (actual: A) => A

export function assert (b: boolean): boolean

export function fail (message: string): never

export class AssertionError extends Error {
  constructor (message: string)
}
