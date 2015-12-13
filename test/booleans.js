import test from 'tape'
import {decodeBoolean} from './_tools'
import {
	True,
	False,
	and,
	or,
	xor,
	If,
	not,
} from '../src'

test('Booleans - true and false values', t => {
	t.equal(decodeBoolean(True), true)
	t.equal(decodeBoolean(False), false)
	t.end()
})

test('Booleans - and', t => {
	t.equal(decodeBoolean(and(False)(False)), false)
	t.equal(decodeBoolean(and(False)(True)), false)
	t.equal(decodeBoolean(and(True)(False)), false)
	t.equal(decodeBoolean(and(True)(True)), true)
	t.end()
})

test('Booleans - or', t => {
	t.equal(decodeBoolean(or(False)(False)), false)
	t.equal(decodeBoolean(or(False)(True)), true)
	t.equal(decodeBoolean(or(True)(False)), true)
	t.equal(decodeBoolean(or(True)(True)), true)
	t.end()
})

test('Booleans - xor', t => {
	t.equal(decodeBoolean(xor(False)(False)), false)
	t.equal(decodeBoolean(xor(False)(True)), true)
	t.equal(decodeBoolean(xor(True)(False)), true)
	t.equal(decodeBoolean(xor(True)(True)), false)
	t.end()
})

test('Booleans - not', t => {
	t.equal(decodeBoolean(not(True)), false)
	t.equal(decodeBoolean(not(False)), true)
	t.end()
})

test('Booleans - If', t => {
	t.equal(If(True)(true)(false), true)
	t.equal(If(False)(true)(false), false)
	t.end()
})
