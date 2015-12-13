import test from 'tape'
import{decodeBoolean} from './_tools'
import {
	isZero,
  lte,
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
	t.equal(decodeBoolean(lte(one)(three)), true)
	t.equal(decodeBoolean(lte(three)(three)), true)
	t.equal(decodeBoolean(lte(four)(three)), false)
	t.end()
})

test('Predicates - eq', t => {
	t.equal(decodeBoolean(eq(two)(three)), false)
	t.equal(decodeBoolean(eq(three)(three)), true)
	t.equal(decodeBoolean(eq(four)(three)), false)
	t.end()
})
