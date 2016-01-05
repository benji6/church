import {C} from 'combinators-js'
import test from 'tape'
import {decodeBoolean, decodeNumber} from './_tools'
import {
  all,
  foldl,
  foldr,
  gt,
  map,
  mapIndexed,
  nil,
  node,
  range,
  repeat,
  zero,
  one,
  two,
  three,
  four,
  ten
} from '../src'

const addNormal = a => b => a + b
const l123 = node(1)(node(2)(node(3)(nil)))
const append = x => xs => [...xs, x]
const listToString = foldl(a => b => `${a} ${b}`)([])
const oneTwoThree = range(one)(three)

test('Lists - all', t => {
  t.equal(decodeBoolean(all(gt(ten))(oneTwoThree)), true)
  t.equal(decodeBoolean(all(gt(four))(oneTwoThree)), true)
  t.equal(decodeBoolean(all(gt(three))(oneTwoThree)), false)
  t.equal(decodeBoolean(all(gt(two))(oneTwoThree)), false)
  t.equal(decodeBoolean(all(gt(one))(oneTwoThree)), false)
  t.equal(decodeBoolean(all(gt(zero))(oneTwoThree)), false)
  t.end()
})

test('Lists - foldl', t => {
  t.equal(foldl(addNormal)(0)(l123), 6)
  t.deepEqual(foldl(C(append))([])(l123), [1, 2, 3])
  t.end()
})

test('Lists - foldr', t => {
  t.equal(foldr(addNormal)(0)(l123), 6)
  t.deepEqual(foldr(C(append))([])(l123), [3, 2, 1])
  t.end()
})

test('Lists - map', t => {
  t.equal(listToString(map(x => x * 2)(l123)), ' 2 4 6')
  t.end()
})

test('Lists - mapIndexed', t => {
  t.equal(listToString(mapIndexed(a => _ => a * 2)(l123)), ' 2 4 6')
  let i = 0
  mapIndexed(_ => b => t.equal(decodeNumber(b), i++))(l123)
  t.end()
})

test('Lists - repeat', t => {
  t.equal(listToString(repeat('a')(three)), ' a a a')
  t.end()
})

test('Lists - range', t => {
  t.equal(listToString(map(decodeNumber)(range(zero)(three))), ' 0 1 2 3')
  t.equal(listToString(map(decodeNumber)(range(one)(three))), ' 1 2 3')
  t.equal(listToString(map(decodeNumber)(range(two)(three))), ' 2 3')
  t.end()
})
