import {I} from 'combinators-js'
import {True, False} from './booleans'

// Documentation to be written

export const zero = f => x => x
export const one = f => x => f(x)
export const two = f => x => f(f(x))
export const three = f => x => f(f(f(x)))

export const isZero = a => a(_ => False)(True)

export const add = m => n => f => x => n(f)(m(f)(x))
export const succ = n => f => x => n(f)(f(x))
export const pred = n => f => x => n(g => h => h(g(f)))(_ => x)(I)
export const sub = m => n => n(pred)(m)
