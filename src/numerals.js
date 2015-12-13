import {I} from 'combinators-js'
import {True, False} from './booleans'

// This is how numerals are encoded. They take a function and a value then apply that function to the value or the previous result of application n times where n is the number being encoded. In JavaScript we can decode numerals simply like this:
// ```javascript
// const decodeNumber = a => a(b => b + 1)(0)
// decodeNumber(zero) // => 0
// decodeNumber(one) // => 1
// decodeNumber(two) // => 2
// decodeNumber(three) // => 3
// ```

export const zero = f => x => x
export const one = f => x => f(x)
export const two = f => x => f(f(x))
export const three = f => x => f(f(f(x)))
export const four = f => x => f(f(f(f(x))))
export const five = f => x => f(f(f(f(f(x)))))
export const six = f => x => f(f(f(f(f(f(x))))))
export const seven = f => x => f(f(f(f(f(f(f(x)))))))
export const eight = f => x => f(f(f(f(f(f(f(f(x))))))))
export const nine = f => x => f(f(f(f(f(f(f(f(f(x)))))))))
export const ten = f => x => f(f(f(f(f(f(f(f(f(f(x))))))))))
// `isZero` takes a value and returns Church encoded `True` if it is a Church encoded `zero` and `False` otherwise
// ```javascript
// isZero(zero) // => True
// isZero(one) // => False
// ```
export const isZero = a => a(_ => False)(True)
// `succ` takes a numeral and returns its successor
// ```javascript
// succ(three) // => four
// succ(four) // => five
// ```
export const succ = n => f => x => n(f)(f(x))
// `pred` takes a numeral and returns its predecessor. There is a catch here, if the number supplied is zero then zero will be returned
// ```javascript
// pred(five) // => four
// pred(four) // => three
// pred(zero) // => zero
// ```
export const pred = n => f => x => n(g => h => h(g(f)))(_ => x)(I)
// `add` takes two numerals and returns their sum
// ```javascript
// add(four)(three) // => seven
// ```
export const add = m => n => f => x => n(f)(m(f)(x))
// `sub` takes two numerals and returns their difference. Again there is catch in that if the difference is negative then zero will be returned
// ```javascript
// sub(three)(one) // => two
// sub(three)(two) // => one
// sub(three)(three) // => zero
// sub(three)(four) // => zero
// ```
export const sub = m => n => n(pred)(m)
// `mult` takes two numerals and returns their product
// ```javascript
// mult(two)(five) // => ten
// ```
export const mult = m => n => f => m(n(f))
// `exp` takes two numerals and returns the first to the power of the second
// ```javascript
// exp(ten)(zero) // => one
// exp(two)(two) // => four
// exp(three)(two) // => nine
// ```
export const exp = m => n => n(m)
