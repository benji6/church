// `pair` takes two values which are effectively stored as a two-tuple that can then be accessed by `first` and `second` detailed below. This is the V combinator
// ```javascript
// pair('first value')('second value')
// // => pair('first value')('second value')
// ```
export const pair = a => b => c => c(a)(b)

// when a pair is applied with `first` the first value in the pair is returned. This is TK in combinatory logic
// ```javascript
// pair('first value')('second value')(first)
// // => 'first value'
// ```
export const first = a => a(b => _ => b)

// when a pair is applied with `second` the first value in the pair is returned. This is TKI in combinatory logic
// ```javascript
// pair('first value')('second value')(second)
// // => 'second value'
// ```
export const second = a => a(_ => b => b)
