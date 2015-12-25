import test from 'tape'
import {pair, first, second} from '../src'

test('Pairs - pair, first, second', t => {
  const testPair = pair(true)(false)
  t.equal(first(testPair), true)
  t.equal(second(testPair), false)
  t.end()
})
