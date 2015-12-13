import {True, False} from './booleans'

// `isZero` takes a value and returns Church encoded `True` if it is a Church encoded `zero` and `False` otherwise
// ```javascript
// isZero(zero) // => True
// isZero(one) // => False
// ```
export const isZero = a => a(_ => False)(True)
