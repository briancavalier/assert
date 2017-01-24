export function eq<A> (expected: A, actual: A): A
export function eq<A> (expected: A): (actual: A) => A

export function is<A> (expected: A, actual: A): A
export function is<A> (expected: A): (actual: A) => A

export function assert (b: boolean): boolean

export function throws <E extends Error> (f: () => any): E

export function fail (message: string): never

export class AssertionError<A, B> extends Error {
  constructor (message: string, expected?: A, actual?: B, fn?: Function)
}
