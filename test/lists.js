import test from 'tape'
import {
	foldl,
	foldr,
	map,
	mapIndexed,
	nil,
	node,
	range,
	repeat,
	zero,
	two,
	three,
} from '../src'

const flip = f => a => b => f(b)(a)
const addNormal = a => b => a + b
const l123 = node(1)(node(2)(node(3)(nil)))
const append = x => xs => [...xs, x]
const listToString = foldl(a => b => `${a} ${b}`)([])

const decodeNumber = a => a(b => b + 1)(0)

test('Lists - repeat', t => {
	t.equal(listToString(repeat('a')(three)), ' a a a')
	t.end()
})

test('Lists - range', t => {
	t.equal(listToString(map(decodeNumber)(range(zero)(three))), ' 0 1 2 3')
	t.equal(listToString(map(decodeNumber)(range(two)(three))), ' 2 3')
	t.end()
})

test('Lists - foldr', t => {
	t.equal(foldr(addNormal)(0)(l123), 6)
	t.deepEqual(foldr(flip(append))([])(l123), [3, 2, 1])
	t.end()
})

test('Lists - foldl', t => {
	t.equal(foldl(addNormal)(0)(l123), 6)
	t.deepEqual(foldl(flip(append))([])(l123), [1, 2, 3])
	t.end()
})

test('Lists - map', t => {
	t.equal(listToString(map(x => x * 2)(l123)), ' 2 4 6')
	t.end()
})

test('Lists - mapIndexed', t => {
	t.equal(listToString(mapIndexed(a => _ => a * 2)(l123)), ' 2 4 6')
	let i = 0
	mapIndexed(_ => b => t.equal(decodeNumber(b), i++))(l123)
	t.end()
})
