// Check out my [combinators-js](https://github.com/benji6/combinators-js) library for definitions of these functions.
// A [combinator](https://en.wikipedia.org/wiki/Combinatory_logic) is just a higher order function that uses only function application and earlier defined combinators to define a result from its arguments. Don't worry about the theory surrounding them, you only need to be able to read the definitions to understand this code. The reason I'm importing them is because they are highly useful and reusable when defining the functions in this library.
import {C, K, H, I, I__, M} from 'combinators-js'

// `True` takes 2 arguments and returns the first
// ```javascript
// True('first')('second') // => 'first'`
// ```
export const True = K

// `False` takes 2 arguments and returns the second
// ```javascript
// False('first')('second') // => 'second'
// ```
export const False = K(I)

// `If` takes a predicate and two values, returning the first value if the predicate is True and the second if the predicate is False
// ```javascript
// If(True)('then')('else') // => 'then'
// If(False)('then')('else') // => 'else'
// ```
export const If = I__

// Standard 'and'
// ```javascript
// and(True)(True) // => True
// and(True)(False) // => False
// ```
export const and = H(I)

// Standard 'or'
// ```javascript
// or(True)(False) // => True
// or(False)(False) // => False
// ```
export const or = I__(M)

// Standard 'not'
// ```javascript
// not(False) // => True
// not(True) // => False
// ```
export const not = C

// Standard 'xor'
// ```javascript
// xor(True)(False) // => True
// xor(True)(True) // => False
// ```
export const xor = a => b => c => d => a(b(d)(c))(b(c)(d))
