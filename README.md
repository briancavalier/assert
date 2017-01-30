# assert

Composable, strongly typed, curried test assertions. Use with any test framework that understands assertions that throw, like [Mocha](https://mochajs.org).

A few simple examples. See the [API docs](#API) for more.

```js
import { eq, is, assert } from '@briancavalier/assert'

// eq - value equality
eq(1, 1) // simple values
eq({ value: 'a' }, { value: 'a' }) // deep values
Promise.resolve(1).then(eq(1)) // curried

// is - reference equality
const a = {}
is(a, a) // same reference
is({}, {}) // AssertionError: not same reference
Promise.resolve(a).then(is(a)) // curried

// assert - strictly boolean expression
assert(true)
assert(typeof 1 === 'number')
assert(1) // AssertionError: not strictly true
```

## Get it

```sh
npm install --save-dev @briancavalier/assert
# or
yarn add --dev @briancavalier/assert
```

## API

All functions with arity > 1 are curried, and can be partially applied.  This makes for compact and convenient assertions:
 
```js
// Assert that a promise fulfills with 123 by
// partially applying eq()
const eq123 = eq(123)
promise.then(eq123)

// Or simply:
promise.then(eq(123))
```

### eq :: a &rarr; a &rarr; a

Assert _value equivalence_.  Compares primitives by `===` and non-primitives (objects, arrays, etc) structurally.  Returns the second arg if the two values are equivalent, otherwise throws AssertionError.

```js
eq(1, 1) //> 1
eq({ a: 'a' }, { a: 'a' }) //> { a: 'a' }
eq([1, 2, 3], [1, 2, 3]) //> [1, 2, 3]
eq([{ a: 'a' }, { b: 'b' }], [{ a: 'a' }, { b: 'b'}]) //> [{ a: 'a' }, { b: 'b'}]

eq(2, 1) //> AssertionError
eq([1, 2, 3], [1, 2]) //> AssertionError
eq({ a: 'a' }, { a: 'b' }) //> AssertionError
eq([{ a: 'a' }, { b: 'b' }], [{ a: 'a' }]) //> AssertionError
```

### is :: a &rarr; a &rarr; a

Assert _referential equivalence_.  Compares args by `===`.  Returns the second arg if the two values are `===`, otherwise throws AssertionError.

```js
is(1, 1) //> 1

is(2, 1) //> AssertionError
is({ a: 'a' }, { a: 'a' }) //> AssertionError
is([1, 2, 3], [1, 2, 3]) //> AssertionError
```

### assert :: boolean &rarr; boolean

Assert _strictly_ `true`. If so, return true, otherwise throws AssertionError.

```js
assert(true) //> true
assert(1 === 1) //> true

assert(false) //> AssertionError
assert(1 === '1') //> AssertionError
assert(1) //> AssertionError (1 !== true)
```

### throws :: (Error e) &rArr; (() &rarr; *) &rarr; e

Assert that a function throws.  If so, return the thrown value, otherwise throw AssertionError.

```js
throws(() => { throw new Error('oops') }) //> *returns* Error: oops

throws(() => {}) //> *throws* AssertionError
```

Make assertions on the thrown value via composition:

```js
// Import your favorite function composition lib
import { pipe } from 'ramda'
import { is, throws } from '@briancavalier/assert'

const expectedError = new Error('expected')

const throwsExpected = pipe(throws, is(expectedError))
throwsExpected(() => { throw expectedError }) //> returns expectedError
throwsExpected(() => { throw new Error() }) //> throws AssertionError: not same reference 
```

### rejects :: Promise e a &rarr; Promise (AssertionError a) e

Assert that a promise rejects.  in the same way `throws` "inverts" the throw/return outcome of a promise, `rejects` inverts the fate of a promise:

- Given a promise that rejects with `e`, returns a promise that fulfills with `e`.
- Given a promise that fulfills with `a`, returns a promise that rejects with an `AssertionError` whose `actual` value is `a`

```js
rejects(Promise.reject(e)) // fulfilled: e
rejects(Promise.resolve()) // rejected: AssertionError
```

It's simple to verify rejected promises using a test framework that allows returning promises:

```js
import { rejects, is } from '@briancavalier/assert'

it('rejects', () => {
  return rejects(Promise.reject(new Error()))
})

// Combine with other assertions, like `is`, to verify
// the rejection value.  For example:
it('rejects with expectedError', () => {
  const expectedError = new Error()
  const p = Promise.reject(expectedError)
  return rejects(p)
    .then(is(expectedError))
})
```

### where :: (a &rarr; b &rarr; boolean) &rarr; a &rarr; b &rarr; b

Assert that a binary predicate holds.  Lift a binary predicate into an assertion, allowing you to create custom assertions.

```js
const lessThan = (a, b) => b < a
where(lessThan, 10, 9) //> 9
where(lessThan, 10, 11) //> AssertionError

// Partially apply to create custom assertions
// Custom assertLessThan
const assertLessThan = where(lessThan)
assertLessThan(10, 9) //> 9
assertLessThan(10, 11) //> AssertionError
Promise.resolve(9).then(assertLessThan(10)) //> fulfilled: 9
Promise.resolve(11).then(assertLessThan(10)) //> rejected: AssertionError

// Custom assertInstanceOf
const instanceOf = (a, b) => b instanceof a
const assertInstanceOf = where(instanceOf)

const t = new Thing()
assertInstanceOf(Thing, t) //> t
assertInstanceOf(Thing, {}) //> AssertionError

// Further partially apply Constructor type to create
// specific assertInstanceOfThing
const assertInstanceOfThing = assertInstanceOf(Thing) 
assertInstanceOfThing(t) //> t
assertInstanceOfThing({}) //> AssertionError
```

### fail :: a &rarr; void

Throw an `AssertionError` with the provided message, which will be coerced to a string and used as the error message. Useful for implementing new assertions.

```js
fail('FAIL') //> AssertionError: FAIL
```

### AssertionError

Assertions throw AssertionError to indicate failure.  Typically, you should use `fail` instead of constructing an `AssertionError` directly. 

```js
const e = new AssertionError('FAIL', expected, actual)
```
