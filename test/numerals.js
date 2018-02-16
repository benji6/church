import test from 'tape'
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
  decodeNumeral,
  encodeNumeral,
  succ,
  pred,
  add,
  sub,
  mult,
  exp,
} from '../src'

test('Numerals - values', t => {
  t.equal(decodeNumeral(zero), 0)
  t.equal(decodeNumeral(one), 1)
  t.equal(decodeNumeral(two), 2)
  t.equal(decodeNumeral(three), 3)
  t.equal(decodeNumeral(four), 4)
  t.equal(decodeNumeral(five), 5)
  t.equal(decodeNumeral(six), 6)
  t.equal(decodeNumeral(seven), 7)
  t.equal(decodeNumeral(eight), 8)
  t.equal(decodeNumeral(nine), 9)
  t.equal(decodeNumeral(ten), 10)
  t.end()
})

test('Numerals - successor', t => {
  t.equal(decodeNumeral(succ(zero)), 1)
  t.equal(decodeNumeral(succ(one)), 2)
  t.equal(decodeNumeral(succ(two)), 3)
  t.equal(decodeNumeral(succ(three)), 4)
  t.end()
})

test('Numerals - predecessor', t => {
  t.equal(decodeNumeral(pred(zero)), 0)
  t.equal(decodeNumeral(pred(one)), 0)
  t.equal(decodeNumeral(pred(two)), 1)
  t.equal(decodeNumeral(pred(three)), 2)
  t.end()
})

test('Numerals - add', t => {
  t.equal(decodeNumeral(add(zero)(zero)), 0)
  t.equal(decodeNumeral(add(two)(zero)), 2)
  t.equal(decodeNumeral(add(zero)(two)), 2)
  t.equal(decodeNumeral(add(one)(one)), 2)
  t.equal(decodeNumeral(add(two)(one)), 3)
  t.equal(decodeNumeral(add(one)(two)), 3)
  t.end()
})

test('Numerals - sub', t => {
  t.equal(decodeNumeral(sub(three)(zero)), 3)
  t.equal(decodeNumeral(sub(three)(one)), 2)
  t.equal(decodeNumeral(sub(three)(two)), 1)
  t.equal(decodeNumeral(sub(three)(three)), 0)
  t.equal(decodeNumeral(sub(one)(three)), 0)
  t.end()
})

test('Numerals - mult', t => {
  t.equal(decodeNumeral(mult(zero)(zero)), 0)
  t.equal(decodeNumeral(mult(zero)(ten)), 0)
  t.equal(decodeNumeral(mult(one)(one)), 1)
  t.equal(decodeNumeral(mult(one)(two)), 2)
  t.equal(decodeNumeral(mult(two)(five)), 10)
  t.equal(decodeNumeral(mult(three)(four)), 12)
  t.end()
})

test('Numerals - exp', t => {
  t.equal(decodeNumeral(exp(zero)(zero)), 1)
  t.equal(decodeNumeral(exp(ten)(zero)), 1)
  t.equal(decodeNumeral(exp(ten)(one)), 10)
  t.equal(decodeNumeral(exp(three)(two)), 9)
  t.equal(decodeNumeral(exp(three)(three)), 27)
  t.end()
})

test('Numerals - encodeNumeral', t => {
  t.equal(decodeNumeral(encodeNumeral(0)), 0)
  t.equal(decodeNumeral(encodeNumeral(1)), 1)
  t.equal(decodeNumeral(encodeNumeral(2)), 2)
  t.equal(decodeNumeral(encodeNumeral(3)), 3)
  t.equal(decodeNumeral(encodeNumeral(127)), 127)
  t.end()
})
