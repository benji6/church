import test from 'tape'
import {pair, first, second} from '../src'

test('Pairs - pair, first, second', t => {
  const testPair = pair(true)(false)
  t.true(first(testPair))
  t.false(second(testPair))
  t.end()
})
