import {I, I_, K, V, Y} from 'combinators-js'
import {not, and, True} from './booleans'
import {sub, pred, succ, zero} from './numerals'
//
// *** NB Work is still in progress on lists, I'm not happy with the implementations right now os don't consider this stable***
//

// Documentation to be written

export const nil = I_
export const node = a => b => c => d => d(V(a)(b))

export const foldr = Y(recur => f => a => l => l(K(a))(cell => f(recur(f)(a)(cell(K(I))))(cell(K))))
export const foldl = Y(recur => f => a => l => l(K(a))(cell => recur(f)(f(a)(cell(K)))(cell(K(I)))))

export const all = f => foldl(a => b => and(a)(f(b)))(True)
export const map = f => foldr(acc => val => node(f(val))(acc))(nil)
export const none = f => xs => not(all(f)(xs))
export const repeat = a => b => b(c => node(a)(c))(nil)

// HACK: cheating with assignment
export const range = a => b => {
  let i = succ(b)
  return sub(i)(a)(c => node(i = pred(i))(c))(nil)
}

// HACK: cheating with assignment
export const mapIndexed = f => l => {
  let i = zero
  return foldr(acc => val => node(f(val)(pred(i = succ(i))))(acc))(nil)(l)
}
