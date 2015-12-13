import test from 'tape'
import{decodeBoolean} from './_tools'
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
  four,
} from '../src'

test('Predicates - isZero', t => {
	t.equal(decodeBoolean(isZero(zero)), true)
	t.equal(decodeBoolean(isZero(one)), false)
	t.equal(decodeBoolean(isZero(two)), false)
	t.equal(decodeBoolean(isZero(three)), false)
	t.end()
})

test('Predicates - lte', t => {
	t.equal(decodeBoolean(lte(two)(three)), true)
	t.equal(decodeBoolean(lte(three)(three)), true)
	t.equal(decodeBoolean(lte(zero)(zero)), true)
	t.equal(decodeBoolean(lte(four)(three)), false)
	t.end()
})

test('Predicates - gte', t => {
	t.equal(decodeBoolean(gte(two)(three)), false)
	t.equal(decodeBoolean(gte(three)(three)), true)
	t.equal(decodeBoolean(gte(zero)(zero)), true)
	t.equal(decodeBoolean(gte(four)(three)), true)
	t.end()
})

test('Predicates - lt', t => {
	t.equal(decodeBoolean(lt(two)(three)), true)
	t.equal(decodeBoolean(lt(three)(three)), false)
	t.equal(decodeBoolean(lt(zero)(zero)), false)
	t.equal(decodeBoolean(lt(four)(three)), false)
	t.end()
})

test('Predicates - gt', t => {
	t.equal(decodeBoolean(gt(two)(three)), false)
	t.equal(decodeBoolean(gt(three)(three)), false)
	t.equal(decodeBoolean(gt(zero)(zero)), false)
	t.equal(decodeBoolean(gt(four)(three)), true)
	t.end()
})

test('Predicates - eq', t => {
	t.equal(decodeBoolean(eq(two)(three)), false)
	t.equal(decodeBoolean(eq(three)(three)), true)
	t.equal(decodeBoolean(eq(four)(three)), false)
	t.end()
})
