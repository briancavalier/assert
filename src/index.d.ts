export type Predicate2<A, B> = (a: A, b: B) => boolean

export function where<A, B> (p: Predicate2<A, B>, a: A, b: B): B
export function where<A, B> (p: Predicate2<A, B>): (a: A, b: B) => B
export function where<A, B> (p: Predicate2<A, B>, a: A): (b: B) => B
export function where<A, B> (p: Predicate2<A, B>): (a: A) => (b: B) => B

export function eq<A> (expected: A, actual: A): A
export function eq<A> (expected: A): (actual: A) => A

export function is<A> (expected: A, actual: A): A
export function is<A> (expected: A): (actual: A) => A

export function assert (b: boolean): boolean

export function throws<E extends Error> (f: () => any): E

export function rejects<A, E extends Error> (p: Promise<A>): Promise<E>

export function fail<A> (message: A): never

export class AssertionError<A, B> extends Error {
  constructor (message: string, expected?: A, actual?: B, fn?: Function)
}
