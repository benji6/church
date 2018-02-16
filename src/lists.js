import {and, False, If, not, True} from './booleans'
import {first, pair, second} from './pairs'
import {lt} from './predicates'
import {add, pred, sub, succ, zero} from './numerals'

// Now lists are really cool.
// There are a few ways to implement them, this is how I've done it

// ## Basics

// `nil` represents the end of a list.
// It's necessary to define this so iterating functions know when to complete.
// All other nodes will have `False` as the first value in their pair
export const nil = pair(True)(True)

// `isNil` returns `True` if applied to `nil` and `False` otherwise
// ```javascript
// isNil(nil) // => True
// isNil(pair(False)(someValue)) // => False
// ```
export const isNil = first

// `cons` takes two values and returns a new node of those values
// ```javascript
// const list123 = cons(one)(cons(two)(cons(three)(nil)))
// // => This is our basic list of [one two three]
// ```
export const cons = a => b => pair(False)(pair(a)(b))

// `head` takes returns the first value in a list
// ```javascript
// head(list123) // => one
// ```
export const head = a => first(second(a))

// `tail` takes a list and returns a list of all values except the first
// ```javascript
// tail(list123) // => list of [two three]
// ```
export const tail = a => second(second(a))

// So now we have these simple functions defined we can build all our favourite list functions!

// ## Creating lists

// `range` takes two numerals and returns a new list of numbers from the first argument up to and including the second
// ```javascript
// range(one)(three) // => list of [one two three]
// range(three)(four) // => list of [three four]
// ```
export const range = a => b => sub(succ(b))(a)(c => cons(sub(b)(length(c)))(c))(nil)

// `repeat` takes a value and a numeral and returns a new list of length specified by second arguments filled with the provided value
// ```javascript
// repeat(one)(three) // => list of [one one one]
// repeat(True)(four) // => list of [True True True True]
// ```
export const repeat = a => b => b(c => cons(a)(c))(nil)

// ## Folds

// When you can fold you can derive all sorts of useful functions as we shall see shortly

// This is the Y combinator which we use to recursively call lambda exressions in our definitions below
const Y = a => (b => b(b))(b => a(c => b(b)(c)))

// `foldr` takes a reducing function (this takes two argumens, the list element then the accumulator), an initial value and a list. It then iterates over the list from right to left applying the reducing funcion to the initial value / result of previous reducing function and the current value in the list.
// ```javascript
// foldr(sum)(zero)(list123) // => six
// ```
export const foldr = Y(r => f => a => xs => If(isNil(xs))(_ => a)(_ => f(head(xs))(r(f)(a)(tail(xs))))())

// `foldl` behaves the same as `foldr` except it iterates across the list starting from the left and the reducing function takes the accumulator before the list element. The fact it can be defined in terms of `foldr` is pretty awesome
// ```javascript
// foldl(sum)(zero)(list123) // => six
// ```
export const foldl = f => a => xs => foldr(x => g => y => g(f(y)(x)))(x => x)(xs)(a)

// ## Growing a list

// `append` takes a value and a list then returns a list with the value appended
// ```javascript
// append(four)(list123) // => list of [one two three four]
// ```
export const append = x => xs => foldr(cons)(cons(x)(nil))(xs)

// `prepend` takes a value and a list then returns a list with the value prepended
// ```javascript
// prepend(zero)(list123) // => list of [zero one two three]
// ```
export const prepend = cons

// ## Shrinking a list

// `drop` takes a numeral n and a list and returns a new list with all but the first n values
// ```javascript
// drop(two)(list123) // => list of [three]
// ```
export const drop = n => xs => n(tail)(xs)

// `slice` takes two numerals and returns a new list starting from the first index up to and excluding the second index
// ```javascript
// slice(one)(three)(list123) // => list of [two three]
// slice(one)(two)(list123) // => list of [two]
// ```
export const slice = n => m => xs => take(pred(m))(drop(n)(xs))

// `take` takes a numeral n and a list and returns a new list of only the first n values
// ```javascript
// take(two)(list123) // => list of [one two]
// ```
export const take = n => foldl(acc => val => If(lt(length(acc))(n))(append(val)(acc))(acc))(nil)

// ## Combining lists

// `concat` takes two lists and joins them together
// ```javascript
// concat(list123)(list123)
// // => list of [one two three one two three]
// ```
export const concat = xs => ys => foldr(cons)(ys)(xs)

// `zip` takes two lists and returns a list where each value is a list of the correspondingly indexed values in the input lists. The returned list is the length of the shorter input lists
// ```javascript
// zip(list123)(list246)
// // => list of lists [[1 2] [2 4] [3 6]]
// ```
export const zip = xs => ys => map(i => cons(nth(i)(xs))(cons(nth(i)(ys))(nil)))(range(zero)(pred(If(lt(length(xs))(length(ys)))(length(xs))(length(ys)))))

// `zipWith` takes a function and two lists and returns a list where each value is the value returned when the values in each of the given lists at the relevant index is applied to the supplied function. The returned list is the length of the shorter input lists
// ```javascript
// zipWith(add)(list123)(list246) // => list of [3 6 9]
// ```
export const zipWith = f => xs => ys => map(i => f(nth(i)(xs))(nth(i)(ys)))(range(zero)(pred(If(lt(length(xs))(length(ys)))(length(xs))(length(ys)))))

// ## Querying lists

// `all` takes a predicate and a list and returns `True` if every value applied with the predicate returns `True` and returns `False` otherwise
// ```javascript
// all(lt(zero))(list123) // => True
// all(lt(three))(list123) // => False
// ```
export const all = f => foldl(a => b => and(a)(f(b)))(True)

// `last` returns the last value in a list
// ```javascript
// last(list123) // => three
// ```
export const last = foldl(a => b => b)(nil)

// `length` returns the length of a list
// ```javascript
// length(list123) // => three
// ```
export const length = foldl(a => b => succ(a))(zero)

// `none` takes a predicate and a list and returns `True` if every value applied with the predicate returns `False` and returns `True` otherwise
// ```javascript
// all(lt(five))(list123) // => False
// all(lt(three))(list123) // => True
// ```
export const none = f => xs => not(all(f)(xs))

// `nth` takes a numeral n and a list and returns the value at index n
// ```javascript
// nth(zero)(list123) // => one
// nth(two)(list123) // => three
// ```
export const nth = n => xs => head(n(tail)(xs))

// `sum` takes a list of numerals and sums it
// ```javascript
// sum(list123) // => six
// ```
export const sum = foldl(add)(zero)

// ## Transforming lists

// `filter` takes a predicate and a list and returns a list comprised only by those values for which the predicate returns `True`
// ```javascript
// filter(lt(two)(list123) // => list of [three]
// ```
export const filter = f => foldr(val => acc => If(f(val))(cons(val)(acc))(acc))(nil)

// `map` takes a function and a list and returns a new list with the function applied to every function in the given list
// ```javascript
// map(mult(two))(list123) // => list of [two four six]
// ```
export const map = f => foldr(val => acc => cons(f(val))(acc))(nil)

// `reverse` takes a list and reverses it
// ```javascript
// reverse(list123) // => list of [three two one]
// ```
export const reverse = foldl(a => b => cons(b)(a))(nil)

// `reject` takes a predicate and a list and returns a list comprised only by those values for which the predicate returns `False`
// ```javascript
// reject(gte(two)(list123) // => list of [three]
// ```
export const reject = f => foldr(val => acc => If(f(val))(acc)(cons(val)(acc)))(nil)

// ## Encoding & Decoding

// `encodeList` takes a JS array and returns a corresponding Church encoded list
// ```javascript
// encodeList([1, 2, 3]) // => list of [1 2 3]
// ```
export const encodeList = xs => xs.reduceRight((ys, x) => prepend(x)(ys), nil)

// `decodeList` takes a Church encoded list and returns a corresponding JS array (notw that this will not decode any Church encoded values in the list)
// ```javascript
// decodeList(list123) // => [One, Two, Three]
// ```
export const decodeList = foldl(xs => x => xs.concat([x]))([])
