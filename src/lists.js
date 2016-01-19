import {C, Y} from 'combinators-js'
import {and, False, If, not, True} from './booleans'
import {first, pair, second} from './pairs'
import {sub, succ, zero} from './numerals'

// Now lists are really cool. There are a few ways to implement them, this is how I've done it

// ## Basics

// `nil` represents the empty node.
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
// range(True)(four) // => list of [True True True True]
// ```
export const repeat = a => b => b(c => cons(a)(c))(nil)

// ## Folds

// When you can fold you can derive all sorts of useful functions as we shall see shortly

// `foldl` takes a reducing function, an initial value and a list. It then iterates over the list from left to right (assuming the list is ordered left to right) applying the reducing funcion to the initial value / result of previous reducing function and the current value in the list.
// ```javascript
// foldl(sum)(zero)(list123) // => six
// ```
export const foldl = Y(r => f => a => l => If(isNil(l))(_ => a)(_ => r(f)(f(a)(head(l)))(tail(l)))())

// `foldr` behaves the same as foldl except it iterates across the list in reverse order
// ```javascript
// foldl(sum)(zero)(list123) // => six
// ```
export const foldr = Y(r => f => a => l => If(isNil(l))(_ => a)(_ => f(r(f)(a)(tail(l)))(head(l)))())

// ## Growing a list

// `append` takes a value and a list then returns a list with the value appended
// ```javascript
// append(four)(list123) // => list of [one two three four]
// ```
export const append = x => xs => foldr(C(cons))(cons(x)(nil))(xs)

// `concat` takes two lists and joins them together
// ```javascript
// concat(list123)(list123)
// // => list of [one two three one two three]
// ```
export const concat = xs => ys => foldr(C(cons))(ys)(xs)

// ## Shrinking a list

// `drop` takes a numeral n and a list and returns a new list with all but the first n values
// ```javascript
// drop(two)(list123) // => list of [three]
// ```
export const drop = n => xs => n(tail)(xs)

// `filter` takes a predicate and a list and returns a list comprised only by those values for which the predicate returns `True`
// ```javascript
// filter(lt(two)(list123) // => list of [three]
// ```
export const filter = f => foldr(acc => val => If(f(val))(cons(val)(acc))(acc))(nil)

// ## Querying a list

// `all` takes a predicate and a list and returns `True` if every value applied with the predicate returns `True` and returns `False` otherwise
// ```javascript
// all(lt(zero))(list123) // => True
// all(lt(three))(list123) // => False
// ```
export const all = f => foldl(a => b => and(a)(f(b)))(True)

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

// ## Changing lists

// `map` takes a function and a list and returns a new list with the function applied to every function in the given list
// ```javascript
// map(mult(two))(list123) // => list of [two four six]
// ```
export const map = f => foldr(acc => val => cons(f(val))(acc))(nil)
