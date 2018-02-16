# church

[![npm version](https://badge.fury.io/js/church.svg)](https://badge.fury.io/js/church)
[![Build Status](https://travis-ci.org/benji6/church.svg?branch=master)](https://travis-ci.org/benji6/church)

Church encoding utility library for JavaScript

## Why?

I built this library mostly as a learning exercise, but the code is also available as an npm module that can be consumed and used to build JavaScript applications using basically nothing but functions. I'm not sure why you would want to do that though!

## What?

Church encoding is a way of encoding data using only functions. For instance, we can use functions to represent, booleans, numerals and lists. Higher-order functions are all you need for Turing completeness.

## How?

Check out the [docs](http://benji6.github.io/church/docs/).

### Install

`npm i church`

### Examples

```javascript
import {
  decodeList,
  decodeNumeral,
  encodeList,
  encodeNumeral,
  five,
  If,
  lt,
  map,
  mult,
  one,
  range,
  three,
  two,
} from 'church'

const twoFourSix = map(mult(two))(range(one)(three))
// => church encoded list of [two four six]

const twoFourSixJs = decodeList(twoFourSix).map(decodeNumeral)
// => [2, 4, 6] (standard JS array of standard JS numbers)

encodeList(twoFourSixJs.map(encodeNumeral))
// => church encoded list of [two four six] again

map(x => If(lt(x)(five))(five)(x))(twoFourSix)
// => church encoded list of [five five six]
```

### Resources

- [combinators-js](https://github.com/benji6/combinators-js) - a library of combinators in JS I wrote
- [http://raganwald.com/2015/02/13/functional-quantum-electrodynamics.html](http://raganwald.com/2015/02/13/functional-quantum-electrodynamics.html) - totally mind-blowing article, this repo probably would not exist if I hadn't read it
- [https://en.wikipedia.org/wiki/Church_encoding](https://en.wikipedia.org/wiki/Church_encoding)
- [http://dictionary.sensagent.com/Church%20encoding/en-en/](http://dictionary.sensagent.com/Church%20encoding/en-en/)
