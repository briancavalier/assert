# assert

Composable, strongly typed, curried test assertions. Use with any test framework that understands assertions that throw.

```js
import { eq, is, assert } from '@briancavalier/assert'

it('should be true', () => {
  assert(true)
})

it('should be equal', () => {
  is(123, 123)
})

it('should eventually be equivalent via partial application', () => {
  const expected = { name: 'Abe' }
  return Promise.resolve({ name: 'Abe' })
    .then(eq(expected))
})
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
eq([{ a: 'a' }, { b: 'b' }], [{ a: 'a' }, { b: 'b'}]) //> AssertionError
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

// Compose new assertion that a function throws expectedError
const throwsExpected = pipe(throws, is(expectedError))

const f = () => {
  throw expectedError
}

throwsExpected(f) //> PASS, returns expectedError

const g = () => {
  throw new Error('this should fail')
}

throwsExpected(g) //> FAIL, throws AssertionError
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
