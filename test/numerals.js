import test from 'tape'
import {
	isZero,
	zero,
	one,
	two,
	three,
	succ,
	pred,
	add,
	sub,
} from '../src'

const decodeNumber = a => a(b => b + 1)(0)
const decodeBoolean = a => a(true)(false)

test('Numerals - values', t => {
	t.equal(decodeNumber(zero), 0)
	t.equal(decodeNumber(one), 1)
	t.equal(decodeNumber(two), 2)
	t.equal(decodeNumber(three), 3)
	t.end()
})

test('Numerals - isZero', t => {
	t.equal(decodeBoolean(isZero(zero)), true)
	t.equal(decodeBoolean(isZero(one)), false)
	t.equal(decodeBoolean(isZero(two)), false)
	t.equal(decodeBoolean(isZero(three)), false)
	t.end()
})

test('Numerals - successor', t => {
	t.equal(decodeNumber(succ(zero)), 1)
	t.equal(decodeNumber(succ(one)), 2)
	t.equal(decodeNumber(succ(two)), 3)
	t.equal(decodeNumber(succ(three)), 4)
	t.end()
})

test('Numerals - predecessor', t => {
	t.equal(decodeNumber(pred(zero)), 0)
	t.equal(decodeNumber(pred(one)), 0)
	t.equal(decodeNumber(pred(two)), 1)
	t.equal(decodeNumber(pred(three)), 2)
	t.end()
})

test('Numerals - add', t => {
	t.equal(decodeNumber(add(zero)(zero)), 0)
	t.equal(decodeNumber(add(two)(zero)), 2)
	t.equal(decodeNumber(add(zero)(two)), 2)
	t.equal(decodeNumber(add(one)(one)), 2)
	t.equal(decodeNumber(add(two)(one)), 3)
	t.equal(decodeNumber(add(one)(two)), 3)
	t.end()
})

test('Numerals - sub', t => {
	t.equal(decodeNumber(sub(three)(zero)), 3)
	t.equal(decodeNumber(sub(three)(one)), 2)
	t.equal(decodeNumber(sub(three)(two)), 1)
	t.equal(decodeNumber(sub(three)(three)), 0)
	t.end()
})
