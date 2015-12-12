// Check out my [combinators-js](https://github.com/benji6/combinators-js) library for definitions of these functions.
// A [combinator](https://en.wikipedia.org/wiki/Combinatory_logic) is just a higher order function that uses only function application and earlier defined combinators to define a result from its arguments. Don't worry about the theory surrounding them, you only need to be able to read the definitions to understand this code. The reason I'm importing them is because they are highly useful and reusable when defining the functions in this library.
import {C, K, I, I__} from 'combinators-js'

// True takes 2 arguments and returns the first
export const True = K
// False takes 2 arguments and returns the second
export const False = K(I)

// If take a predicate and two values, returning the first value if the predicate is True and the second if the predicate is False
export const If = I__

export const and = a => b => a(b)(a)
export const or = a => b => a(a)(b)
export const not = C
export const xor = a => b => c => d => a(b(d)(c))(b(c)(d))
