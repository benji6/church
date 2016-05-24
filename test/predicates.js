import test from 'tape'
import {decodeBoolean} from './_tools'
import {
  isZero,
  lte,
  gte,
  lt,
  gt,
  eq,
  zero,
  one,
  two,
  three,
  four
} from '../src'

test('Predicates - isZero', t => {
  t.true(decodeBoolean(isZero(zero)))
  t.false(decodeBoolean(isZero(one)))
  t.false(decodeBoolean(isZero(two)))
  t.false(decodeBoolean(isZero(three)))
  t.end()
})

test('Predicates - lte', t => {
  t.true(decodeBoolean(lte(two)(three)))
  t.true(decodeBoolean(lte(three)(three)))
  t.true(decodeBoolean(lte(zero)(zero)))
  t.false(decodeBoolean(lte(four)(three)))
  t.end()
})

test('Predicates - gte', t => {
  t.false(decodeBoolean(gte(two)(three)))
  t.true(decodeBoolean(gte(three)(three)))
  t.true(decodeBoolean(gte(zero)(zero)))
  t.true(decodeBoolean(gte(four)(three)))
  t.end()
})

test('Predicates - lt', t => {
  t.true(decodeBoolean(lt(two)(three)))
  t.false(decodeBoolean(lt(three)(three)))
  t.false(decodeBoolean(lt(zero)(zero)))
  t.false(decodeBoolean(lt(four)(three)))
  t.end()
})

test('Predicates - gt', t => {
  t.false(decodeBoolean(gt(two)(three)))
  t.false(decodeBoolean(gt(three)(three)))
  t.false(decodeBoolean(gt(zero)(zero)))
  t.true(decodeBoolean(gt(four)(three)))
  t.end()
})

test('Predicates - eq', t => {
  t.false(decodeBoolean(eq(two)(three)))
  t.true(decodeBoolean(eq(three)(three)))
  t.false(decodeBoolean(eq(four)(three)))
  t.end()
})
