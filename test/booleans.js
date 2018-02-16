import test from 'tape'
import {
  True,
  False,
  and,
  or,
  xor,
  If,
  not,
  decodeBoolean,
  encodeBoolean,
} from '../src'

test('Booleans - true and false values', t => {
  t.true(decodeBoolean(True))
  t.false(decodeBoolean(False))
  t.end()
})

test('Booleans - and', t => {
  t.false(decodeBoolean(and(False)(False)))
  t.false(decodeBoolean(and(False)(True)))
  t.false(decodeBoolean(and(True)(False)))
  t.true(decodeBoolean(and(True)(True)))
  t.end()
})

test('Booleans - or', t => {
  t.false(decodeBoolean(or(False)(False)))
  t.true(decodeBoolean(or(False)(True)))
  t.true(decodeBoolean(or(True)(False)))
  t.true(decodeBoolean(or(True)(True)))
  t.end()
})

test('Booleans - xor', t => {
  t.false(decodeBoolean(xor(False)(False)))
  t.true(decodeBoolean(xor(False)(True)))
  t.true(decodeBoolean(xor(True)(False)))
  t.false(decodeBoolean(xor(True)(True)))
  t.end()
})

test('Booleans - not', t => {
  t.false(decodeBoolean(not(True)))
  t.true(decodeBoolean(not(False)))
  t.end()
})

test('Booleans - If', t => {
  t.true(If(True)(true)(false))
  t.false(If(False)(true)(false))
  t.end()
})

test('Booleans - encodeBoolean', t => {
  t.true(decodeBoolean(encodeBoolean(true)))
  t.true(decodeBoolean(encodeBoolean(1)))
  t.false(decodeBoolean(encodeBoolean(false)))
  t.false(decodeBoolean(encodeBoolean(0)))
  t.end()
})
