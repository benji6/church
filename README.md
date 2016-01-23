# church

[![npm version](https://badge.fury.io/js/church.svg)](https://badge.fury.io/js/church)
[![Build Status](https://travis-ci.org/benji6/church.svg?branch=master)](https://travis-ci.org/benji6/church)

Church encoding utility library for JavaScript

### Why?

I built this library mostly as a learning exercise, but the code is also available as an npm module that can be consumed and used to build JavaScript applications using basically nothing but functions. I'm not sure why you would want to do that though!

### What?

Church encoding is a way of encoding data using only functions. For instance, we can use functions to represent, booleans, numerals and lists. Higher-order functions are all you need for Turing completeness.

### How?

Check out the [docs](http://benji6.github.io/church/docs/).

### Install

`npm i church`

```javascript
import {five, If, lt, map, mult, one, range, three, two} from 'church'
const twoFourSix = map(mult(two))(range(one)(three))
// => church encoded list of [two four six]

map(x => If(lt(x)(five))(five)(x))(twoFourSix)
// => church encoded list of [five five six]
```

The code is written in ES2015 and transpiled to ES5. You can consume the ES2015 source directly using [Rollup](https://github.com/rollup/rollup).

### Contributing

Please do! I am no mathematician or computer scientist, so I am sure there are loads of improvements that could be made here.

### Resources

- [combinators-js](https://github.com/benji6/combinators-js) - a library of combinators in JS I wrote
- [http://raganwald.com/2015/02/13/functional-quantum-electrodynamics.html](http://raganwald.com/2015/02/13/functional-quantum-electrodynamics.html) - totally mind-blowing article, this repo probably would not exist if I hadn't read it
- [https://en.wikipedia.org/wiki/Church_encoding](https://en.wikipedia.org/wiki/Church_encoding)
- [http://dictionary.sensagent.com/Church%20encoding/en-en/](http://dictionary.sensagent.com/Church%20encoding/en-en/)
