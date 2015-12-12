import {I, K, V, Y} from 'combinators-js'
import {sub, pred, succ, zero} from './numerals'

export const nil = a => b => a()
export const node = a => b => c => d => d(V(a)(b))

export const repeat = a => b => b(c => node(a)(c))(nil)

// HACK: cheating with assignment
export const range = a => b => {
	let i = succ(b)
	return sub(i)(a)(c => node(i = pred(i))(c))(nil)
}

export const foldr = Y(recur => f => a => l => l(_ => a)(cell => f(recur(f)(a)(cell(K(I))))(cell(K))))
export const foldl = Y(recur => f => a => l => l(_ => a)(cell => recur(f)(f(a)(cell(K)))(cell(K(I)))))
export const map = f => l => foldr(acc => val => node(f(val))(acc))(nil)(l)

// HACK: cheating with assignment
export const mapIndexed = f => l => {
	let i = zero
	return foldr(acc => val => node(f(val)(pred(i = succ(i))))(acc))(nil)(l)
}
