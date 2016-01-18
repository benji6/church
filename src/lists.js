import {Y} from 'combinators-js'
import {and, False, If, not, True} from './booleans'
import {first, pair, second} from './pairs'
import {sub, succ, zero} from './numerals'

//
// *** NB Work is still in progress on lists, I'm not happy with the implementations right now so don't consider this stable***
//

// Documentation to be written

const flip = f => a => b => f(b)(a)

export const nil = pair(True)(True)
export const isNil = first
export const cons = a => b => pair(False)(pair(a)(b))
export const head = a => first(second(a))
export const tail = a => second(second(a))

export const range = a => b => sub(succ(b))(a)(c => cons(sub(b)(length(c)))(c))(nil)
export const repeat = a => b => b(c => cons(a)(c))(nil)

export const foldl = Y(r => f => a => l => If(isNil(l))(_ => a)(_ => r(f)(f(a)(head(l)))(tail(l)))())
export const foldr = Y(r => f => a => l => If(isNil(l))(_ => a)(_ => f(r(f)(a)(tail(l)))(head(l)))())

export const append = x => xs => foldr(flip(cons))(cons(x)(nil))(xs)
export const concat = xs => ys => foldr(flip(cons))(ys)(xs)
export const map = f => foldr(acc => val => cons(f(val))(acc))(nil)

export const all = f => foldl(a => b => and(a)(f(b)))(True)
export const length = foldl(a => b => succ(a))(zero)
export const none = f => xs => not(all(f)(xs))
