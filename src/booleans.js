// Check out my [combinators-js](https://github.com/benji6/combinators-js) library if you are interested in combinatory logic.
// A [combinator](https://en.wikipedia.org/wiki/Combinatory_logic) is just a higher order function that uses only function application and earlier defined combinators to define a result from its arguments. Most of the functions declared here can be defined very simply in terms of combinators.

// `True` takes 2 arguments and returns the first. This is the K combinator
// ```javascript
// True('first')('second') // => 'first'`
// ```
export const True = a => _ => a

// `False` takes 2 arguments and returns the second. This is the KI combinator
// ```javascript
// False('first')('second') // => 'second'
// ```
export const False = _ => a => a

// `If` takes a predicate and two values, returning the first value if the predicate is True and the second if the predicate is False. This is the I** combinator
// ```javascript
// If(True)('then')('else') // => 'then'
// If(False)('then')('else') // => 'else'
// ```
export const If = a => b => c => a(b)(c)

// `and`
// ```javascript
// and(True)(True) // => True
// and(True)(False) // => False
// ```
export const and = a => b => a(b)(a)

// `or`
// ```javascript
// or(True)(False) // => True
// or(False)(False) // => False
// ```
export const or = a => b => a(a)(b)

// `not` (this is the C combinator)
// ```javascript
// not(False) // => True
// not(True) // => False
// ```
export const not = a => b => c => a(c)(b)

// `xor`
// ```javascript
// xor(True)(False) // => True
// xor(True)(True) // => False
// ```
export const xor = a => b => c => d => a(b(d)(c))(b(c)(d))

// `decodeBoolean` takes a Church encoded boolean and returns the corresponding JS boolean
// ```javascript
// decodeBoolean(True) // => true
// decodeBoolean(False) // => false
// ```
export const decodeBoolean = a => a(true)(false)

// `encodeBoolean` takes a JS value and returns `True` if it is truthy
// and `False` otherwise
// ```javascript
// encodeBoolean(true) // => True
// encodeBoolean(false) // => False
// ```
export const encodeBoolean = a => a ? True : False
