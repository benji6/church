import {and, not, True, False} from './booleans'
import {sub} from './numerals'

// `isZero` takes a value and returns Church encoded `True` if it is a Church encoded `zero` and `False` otherwise
// ```javascript
// isZero(zero) // => True
// isZero(one) // => False
// ```
export const isZero = a => a(_ => False)(True)

// `lte` takes two numerals and returns True if the first is less than or equal to the first and False otherwise
// ```javascript
// lte(two)(three) // => True
// lte(three)(three) // => True
// lte(four)(three) // => False
// ```
export const lte = a => b => isZero(sub(a)(b))

// `gte` takes two numerals and returns True if the first is greater than or equal to the first and False otherwise
// ```javascript
// gte(two)(three) // => False
// gte(three)(three) // => True
// gte(four)(three) // => True
// ```
export const gte = a => b => isZero(sub(b)(a))

// `lt` takes two numerals and returns True if the first is less than the first and False otherwise
// ```javascript
// lt(two)(three) // => True
// lt(three)(three) // => False
// lt(four)(three) // => False
// ```
export const lt = a => b => not(gte(a)(b))

// `gt` takes two numerals and returns True if the first is greater than the first and False otherwise
// ```javascript
// gt(two)(three) // => False
// gt(three)(three) // => False
// gt(four)(three) // => True
// ```
export const gt = a => b => not(lte(a)(b))

// `eq` takes two numerals and returns True if the first is equal to the first and False otherwise
// ```javascript
// eq(three)(three) // => True
// eq(four)(three) // => False
// ```
export const eq = a => b => and(lte(a)(b))(lte(b)(a))
