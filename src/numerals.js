// This is how numerals are encoded. They take a function and a value then apply that function to the value or the previous result of application n times where n is the number being encoded. In JavaScript we can decode numerals simply like this:
// ```javascript
// const decodeNumber = a => a(b => b + 1)(0)
// decodeNumber(zero) // => 0
// decodeNumber(one) // => 1
// decodeNumber(two) // => 2
// decodeNumber(three) // => 3
// ```

// zero is the KI combinator just like False - not very type safe!
export const zero = _ => x => x
// and one is the I* combinator
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

// `succ` takes a numeral and returns its successor
// ```javascript
// succ(three) // => four
// succ(four) // => five
// ```
export const succ = a => b => c => a(b)(b(c))

// `pred` takes a numeral and returns its predecessor. There is a catch here, if the number supplied is zero then zero will be returned
// ```javascript
// pred(five) // => four
// pred(four) // => three
// pred(zero) // => zero
// ```
export const pred = a => b => c => a(d => e => e(d(b)))(_ => c)(a => a)

// `add` takes two numerals and returns their sum
// ```javascript
// add(four)(three) // => seven
// ```
export const add = a => b => c => d => b(c)(a(c)(d))

// `sub` takes two numerals and returns their difference. Again there is catch in that if the difference is negative then zero will be returned
// ```javascript
// sub(three)(one) // => two
// sub(three)(two) // => one
// sub(three)(three) // => zero
// sub(three)(four) // => zero
// ```
export const sub = a => b => b(pred)(a)

// `mult` takes two numerals and returns their product. This is the B combinator
// ```javascript
// mult(two)(five) // => ten
// ```
export const mult = a => b => c => a(b(c))

// `exp` takes two numerals and returns the first to the power of the second. This is the T combinator
// ```javascript
// exp(ten)(zero) // => one
// exp(two)(two) // => four
// exp(three)(two) // => nine
// ```
export const exp = a => b => b(a)
