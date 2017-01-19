# assert

Strongly typed, curried test assertions.

```js
import { assert, assertThat } from '@briancavalier/assert'

it('should be true', () => {
  assert(true)
})

it('should be true with a message', () => {
  assertThat('is true', true)
})

it('should eventually be true with partially applied message', () => {
  return Promise.resolve(true)
    .then(assertThat('is true eventually'))
})
```
