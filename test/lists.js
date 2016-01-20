import test from 'tape'
import {decodeBoolean, decodeList, decodeNumber} from './_tools'
import {
  add,
  all,
  append,
  concat,
  cons,
  drop,
  filter,
  foldl,
  foldr,
  four,
  gt,
  gte,
  head,
  isNil,
  last,
  length,
  lt,
  map,
  mult,
  nil,
  none,
  nth,
  one,
  prepend,
  range,
  reject,
  repeat,
  reverse,
  six,
  slice,
  sum,
  tail,
  take,
  ten,
  three,
  two,
  zero,
  zip,
  zipWith
} from '../src'

const l123 = cons(one)(cons(two)(cons(three)(nil)))
const l1234 = cons(one)(cons(two)(cons(three)(cons(four)(nil))))
const l246 = cons(two)(cons(four)(cons(six)(nil)))
const push = xs => x => (xs.push(x), xs)

test('Lists - all', t => {
  t.true(decodeBoolean(all(gt(ten))(l123)))
  t.true(decodeBoolean(all(gt(four))(l123)))
  t.false(decodeBoolean(all(gt(three))(l123)))
  t.false(decodeBoolean(all(gt(two))(l123)))
  t.false(decodeBoolean(all(gt(one))(l123)))
  t.false(decodeBoolean(all(gt(zero))(l123)))
  t.end()
})

test('Lists - append', t => {
  t.deepEqual(decodeList(append(four)(l123)).map(decodeNumber), [1, 2, 3, 4])
  t.end()
})

test('Lists - concat', t => {
  t.deepEqual(decodeList(concat(l123)(l246)).map(decodeNumber), [1, 2, 3, 2, 4, 6])
  t.end()
})

test('Lists - cons', t => {
  const testList = cons(one)(cons(two)(cons(three)(nil)))
  t.equal(decodeNumber(head(testList)), 1)
  t.equal(decodeNumber(head(tail(testList))), 2)
  t.equal(decodeNumber(head(tail(tail(testList)))), 3)
  t.end()
})

test('Lists - drop', t => {
  t.deepEqual(decodeList(drop(one)(l123)).map(decodeNumber), [2, 3])
  t.deepEqual(decodeList(drop(two)(l123)).map(decodeNumber), [3])
  t.end()
})

test('Lists - filter', t => {
  t.deepEqual(decodeList(filter(lt(three))(l123)).map(decodeNumber), [])
  t.deepEqual(decodeList(filter(lt(two))(l123)).map(decodeNumber), [3])
  t.deepEqual(decodeList(filter(lt(one))(l123)).map(decodeNumber), [2, 3])
  t.end()
})

test('Lists - foldl', t => {
  t.equal(decodeNumber(foldl(add)(three)(l123)), 9)
  t.deepEqual(foldl(push)([])(l123).map(decodeNumber), [1, 2, 3])
  t.end()
})

test('Lists - foldr', t => {
  t.equal(decodeNumber(foldr(add)(three)(l123)), 9)
  t.deepEqual(foldr(push)([])(l123).map(decodeNumber), [3, 2, 1])
  t.end()
})

test('Lists - head', t => {
  t.equal(decodeNumber(head(l123)), 1)
  t.equal(decodeNumber(head(tail(l123))), 2)
  t.equal(decodeNumber(head(tail(tail(l123)))), 3)
  t.end()
})

test('Lists - isNil', t => {
  t.true(decodeBoolean(isNil(nil)))
  t.false(decodeBoolean(isNil(l123)))
  t.end()
})

test('Lists - last', t => {
  t.equals(decodeNumber(last(l123)), 3)
  t.end()
})

test('Lists - length', t => {
  t.equals(decodeNumber(length(l123)), 3)
  t.equals(decodeNumber(length(tail(l123))), 2)
  t.end()
})

test('Lists - map', t => {
  t.deepEqual(decodeList(map(mult(two))(l123)).map(decodeNumber), [2, 4, 6])
  t.end()
})

test('Lists - none', t => {
  t.false(decodeBoolean(none(gt(ten))(l123)))
  t.false(decodeBoolean(none(gt(four))(l123)))
  t.true(decodeBoolean(none(gt(three))(l123)))
  t.true(decodeBoolean(none(gt(two))(l123)))
  t.true(decodeBoolean(none(gt(one))(l123)))
  t.true(decodeBoolean(none(gt(zero))(l123)))
  t.end()
})

test('Lists - nth', t => {
  t.equal(decodeNumber(nth(zero)(l123)), 1)
  t.equal(decodeNumber(nth(one)(l123)), 2)
  t.equal(decodeNumber(nth(two)(l246)), 6)
  t.end()
})

test('Lists - prepend', t => {
  t.deepEqual(decodeList(prepend(zero)(l123)).map(decodeNumber), [0, 1, 2, 3])
  t.end()
})

test('Lists - range', t => {
  t.deepEqual(decodeList(range(zero)(three)).map(decodeNumber), [0, 1, 2, 3])
  t.deepEqual(decodeList(range(one)(three)).map(decodeNumber), [1, 2, 3])
  t.deepEqual(decodeList(range(two)(three)).map(decodeNumber), [2, 3])
  t.end()
})

test('Lists - reject', t => {
  t.deepEqual(decodeList(reject(gte(three))(l123)).map(decodeNumber), [])
  t.deepEqual(decodeList(reject(gte(two))(l123)).map(decodeNumber), [3])
  t.deepEqual(decodeList(reject(gte(one))(l123)).map(decodeNumber), [2, 3])
  t.end()
})

test('Lists - repeat', t => {
  t.deepEqual(decodeList(repeat('a')(three)), ['a', 'a', 'a'])
  t.end()
})

test('Lists - reverse', t => {
  t.deepEqual(decodeList(reverse(l123)).map(decodeNumber), [3, 2, 1])
  t.end()
})

test('Lists - slice', t => {
  t.deepEqual(decodeList(slice(one)(two)(l123)).map(decodeNumber), [2])
  t.deepEqual(decodeList(slice(one)(three)(l123)).map(decodeNumber), [2, 3])
  t.end()
})

test('Lists - sum', t => {
  t.deepEqual(decodeNumber(sum(l123)), 6)
  t.deepEqual(decodeNumber(sum(l246)), 12)
  t.end()
})

test('Lists - take', t => {
  t.deepEqual(decodeList(take(one)(l123)).map(decodeNumber), [1])
  t.deepEqual(decodeList(take(two)(l123)).map(decodeNumber), [1, 2])
  t.deepEqual(decodeList(take(three)(l123)).map(decodeNumber), [1, 2, 3])
  t.end()
})

test('Lists - tail', t => {
  t.equal(decodeNumber(head(tail(l123))), 2)
  t.equal(decodeNumber(head(tail(tail(l123)))), 3)
  t.end()
})

test('Lists - zip', t => {
  t.deepEqual(
    decodeList(zip(l123)(l246)).map(decodeList).map(xs => xs.map(decodeNumber)),
    [
      [1, 2],
      [2, 4],
      [3, 6]
    ]
  )
  t.deepEqual(
    decodeList(zip(l1234)(l246)).map(decodeList).map(xs => xs.map(decodeNumber)),
    [
      [1, 2],
      [2, 4],
      [3, 6]
    ]
  )
  t.end()
})

test('Lists - zipWith', t => {
  t.deepEqual(
    decodeList(zipWith(add)(l123)(l246)).map(decodeNumber),
    [3, 6, 9]
  )
  t.end()
})
