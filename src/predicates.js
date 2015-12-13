import {and, True, False} from './booleans'
import {sub} from './numerals'

// `isZero` takes a value and returns Church encoded `True` if it is a Church encoded `zero` and `False` otherwise
// ```javascript
// isZero(zero) // => True
// isZero(one) // => False
// ```
export const isZero = a => a(_ => False)(True)

// `leq` takes two numerals and returns True if the first is less than or equal to the first and False otherwise
// ```javascript
// leq(one)(three) // => True
// leq(three)(three) // => True
// leq(four)(three) // => False
// ```
export const lte = a => b => isZero(sub(a)(b))

// `eq` takes two numerals and returns True if the first is equal to the first and False otherwise
// ```javascript
// eq(three)(three) // => True
// eq(four)(three) // => False
// ```
export const eq = a => b => and(lte(a)(b))(lte(b)(a))
