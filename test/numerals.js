import test from 'tape'
import {decodeNumber} from './_tools'
import {
  zero,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten,
  succ,
  pred,
  add,
  sub,
  mult,
  exp,
} from '../src'

test('Numerals - values', t => {
  t.equal(decodeNumber(zero), 0)
  t.equal(decodeNumber(one), 1)
  t.equal(decodeNumber(two), 2)
  t.equal(decodeNumber(three), 3)
  t.equal(decodeNumber(four), 4)
  t.equal(decodeNumber(five), 5)
  t.equal(decodeNumber(six), 6)
  t.equal(decodeNumber(seven), 7)
  t.equal(decodeNumber(eight), 8)
  t.equal(decodeNumber(nine), 9)
  t.equal(decodeNumber(ten), 10)
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
  t.equal(decodeNumber(sub(one)(three)), 0)
  t.end()
})

test('Numerals - mult', t => {
  t.equal(decodeNumber(mult(zero)(zero)), 0)
  t.equal(decodeNumber(mult(zero)(ten)), 0)
  t.equal(decodeNumber(mult(one)(one)), 1)
  t.equal(decodeNumber(mult(one)(two)), 2)
  t.equal(decodeNumber(mult(two)(five)), 10)
  t.equal(decodeNumber(mult(three)(four)), 12)
  t.end()
})

test('Numerals - exp', t => {
  t.equal(decodeNumber(exp(zero)(zero)), 1)
  t.equal(decodeNumber(exp(ten)(zero)), 1)
  t.equal(decodeNumber(exp(ten)(one)), 10)
  t.equal(decodeNumber(exp(three)(two)), 9)
  t.equal(decodeNumber(exp(three)(three)), 27)
  t.end()
})
