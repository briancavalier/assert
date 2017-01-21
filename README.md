# assert

Strongly typed, curried test assertions.

```js
import { assert, eq } from '@briancavalier/assert'

it('should be true', () => {
  assert(true)
})

it('should be equal', () => {
  eq(123, 123)
})

it('should eventually be 123 via partial application', () => {
  return Promise.resolve(123)
    .then(eq(123))
})
```

## Get it

```sh
npm install --save-dev @briancavalier/assert
# or
yarn add --dev @briancavalier/assert
```

## API

All functions are curried.

### eq :: a &rarr; a &rarr; a

Assert expected === actual.  If so, return actual, otherwise throw AssertionError.

```js
eq(1, 1) //> 1
eq(2, 1) //> AssertionError: 2 !== 1
```

### assert :: boolean &rarr; boolean

Assert b is true. If so, return b, otherwise throw AssertionError.

```js
assert(true) //> true
assert(1 === 1) //> true
assert(false) //> AssertionError: false !== true
assert(1 === '1') //> AssertionError: false !== true
```

### fail :: string &rarr; void

Throw an `AssertionError` with the provided message. Useful for implementing new assertions.

```js
fail('FAIL') //> AssertionError: FAIL
```

### AssertionError

Assertions throw AssertionError to indicate failure.  Typically, you should use `fail` instead of constructing an `AssertionError` directly. 

```js
const e = new AssertionError('')
```
