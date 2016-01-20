import {I, K, T, V} from 'combinators-js'

// `pair` takes two values which are effectively stored as a two-tuple that can then be accessed by `first` and `second` detailed below
// ```javascript
// pair('first value')('second value')
// // => pair('first value')('second value')
// ```
export const pair = V

// when a pair is applied with `first` the first value in the pair is returned
// ```javascript
// pair('first value')('second value')(first)
// // => 'first value'
// ```
export const first = T(K)

// when a pair is applied with `second` the first value in the pair is returned
// ```javascript
// pair('first value')('second value')(second)
// // => 'second value'
// ```
export const second = T(K(I))
