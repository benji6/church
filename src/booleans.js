import {C, K, I} from 'combinators-js'

export const True = K
export const False = K(I)
export const and = a => b => a(b)(a)
export const or = a => b => a(a)(b)
export const not = C
export const xor = a => b => c => d => a(b(d)(c))(b(c)(d))
export const If = a => b => c => a(b)(c)
