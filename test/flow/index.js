// @flow
import { assert, assertThat } from '../../src/index'

assert(true)
assert(false)

assertThat('test', true)
assertThat('test', false)
