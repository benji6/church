import test from 'tape'
import{decodeBoolean} from './_tools'
import {
	isZero,
  zero,
  one,
  two,
  three,
} from '../src'

test('Predicates - isZero', t => {
	t.equal(decodeBoolean(isZero(zero)), true)
	t.equal(decodeBoolean(isZero(one)), false)
	t.equal(decodeBoolean(isZero(two)), false)
	t.equal(decodeBoolean(isZero(three)), false)
	t.end()
})
