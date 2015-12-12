import {I, K, V} from 'combinators-js'

export const pair = V
export const first = a => a(K)
export const second = a => a(K(I))
