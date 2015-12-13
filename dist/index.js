'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.mapIndexed = exports.map = exports.foldl = exports.foldr = exports.range = exports.repeat = exports.node = exports.nil = exports.second = exports.first = exports.pair = exports.eq = exports.gt = exports.lt = exports.gte = exports.lte = exports.isZero = exports.exp = exports.mult = exports.sub = exports.add = exports.pred = exports.succ = exports.ten = exports.nine = exports.eight = exports.seven = exports.six = exports.five = exports.four = exports.three = exports.two = exports.one = exports.zero = exports.xor = exports.not = exports.or = exports.and = exports.If = exports.False = exports.True = undefined;

var _combinatorsJs = require('combinators-js');

// `True` takes 2 arguments and returns the first
// ```javascript
// True('first')('second') // => 'first'`
// ```
var True = _combinatorsJs.K;
// `False` takes 2 arguments and returns the second
// ```javascript
// False('first')('second') // => 'second'
// ```
var False = (0, _combinatorsJs.K)(_combinatorsJs.I);
// `If` takes a predicate and two values, returning the first value if the predicate is True and the second if the predicate is False
// ```javascript
// If(True)('then')('else') // => 'then'
// If(False)('then')('else') // => 'else'
// ```
var If = _combinatorsJs.I__;
// Standard 'and'
// ```javascript
// and(True)(True) // => True
// and(True)(False) // => False
// ```
var and = function and(a) {
	return function (b) {
		return a(b)(a);
	};
};
// Standard 'or'
// ```javascript
// or(True)(False) // => True
// or(False)(False) // => False
// ```
var or = function or(a) {
	return function (b) {
		return a(a)(b);
	};
};
// Standard 'not'
// ```javascript
// not(False) // => True
// not(True) // => False
// ```
var not = _combinatorsJs.C;
// Standard 'xor'
// ```javascript
// xor(True)(False) // => True
// xor(True)(True) // => False
// ```
var xor = function xor(a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return a(b(d)(c))(b(c)(d));
			};
		};
	};
};

// This is how numerals are encoded. They take a function and a value then apply that function to the value or the previous result of application n times where n is the number being encoded. In JavaScript we can decode numerals simply like this:
// ```javascript
// const decodeNumber = a => a(b => b + 1)(0)
// decodeNumber(zero) // => 0
// decodeNumber(one) // => 1
// decodeNumber(two) // => 2
// decodeNumber(three) // => 3
// ```

var zero = function zero(f) {
	return function (x) {
		return x;
	};
};
var one = function one(f) {
	return function (x) {
		return f(x);
	};
};
var two = function two(f) {
	return function (x) {
		return f(f(x));
	};
};
var three = function three(f) {
	return function (x) {
		return f(f(f(x)));
	};
};
var four = function four(f) {
	return function (x) {
		return f(f(f(f(x))));
	};
};
var five = function five(f) {
	return function (x) {
		return f(f(f(f(f(x)))));
	};
};
var six = function six(f) {
	return function (x) {
		return f(f(f(f(f(f(x))))));
	};
};
var seven = function seven(f) {
	return function (x) {
		return f(f(f(f(f(f(f(x)))))));
	};
};
var eight = function eight(f) {
	return function (x) {
		return f(f(f(f(f(f(f(f(x))))))));
	};
};
var nine = function nine(f) {
	return function (x) {
		return f(f(f(f(f(f(f(f(f(x)))))))));
	};
};
var ten = function ten(f) {
	return function (x) {
		return f(f(f(f(f(f(f(f(f(f(x))))))))));
	};
};

// `succ` takes a numeral and returns its successor
// ```javascript
// succ(three) // => four
// succ(four) // => five
// ```
var succ = function succ(n) {
	return function (f) {
		return function (x) {
			return n(f)(f(x));
		};
	};
};

// `pred` takes a numeral and returns its predecessor. There is a catch here, if the number supplied is zero then zero will be returned
// ```javascript
// pred(five) // => four
// pred(four) // => three
// pred(zero) // => zero
// ```
var pred = function pred(n) {
	return function (f) {
		return function (x) {
			return n(function (g) {
				return function (h) {
					return h(g(f));
				};
			})(function (_) {
				return x;
			})(_combinatorsJs.I);
		};
	};
};

// `add` takes two numerals and returns their sum
// ```javascript
// add(four)(three) // => seven
// ```
var add = function add(m) {
	return function (n) {
		return function (f) {
			return function (x) {
				return n(f)(m(f)(x));
			};
		};
	};
};

// `sub` takes two numerals and returns their difference. Again there is catch in that if the difference is negative then zero will be returned
// ```javascript
// sub(three)(one) // => two
// sub(three)(two) // => one
// sub(three)(three) // => zero
// sub(three)(four) // => zero
// ```
var sub = function sub(m) {
	return function (n) {
		return n(pred)(m);
	};
};

// `mult` takes two numerals and returns their product
// ```javascript
// mult(two)(five) // => ten
// ```
var mult = function mult(m) {
	return function (n) {
		return function (f) {
			return m(n(f));
		};
	};
};

// `exp` takes two numerals and returns the first to the power of the second
// ```javascript
// exp(ten)(zero) // => one
// exp(two)(two) // => four
// exp(three)(two) // => nine
// ```
var exp = function exp(m) {
	return function (n) {
		return n(m);
	};
};

// `isZero` takes a value and returns Church encoded `True` if it is a Church encoded `zero` and `False` otherwise
// ```javascript
// isZero(zero) // => True
// isZero(one) // => False
// ```
var isZero = function isZero(a) {
	return a(function (_) {
		return False;
	})(True);
};

// `lte` takes two numerals and returns True if the first is less than or equal to the first and False otherwise
// ```javascript
// lte(two)(three) // => True
// lte(three)(three) // => True
// lte(four)(three) // => False
// ```
var lte = function lte(a) {
	return function (b) {
		return isZero(sub(a)(b));
	};
};

// `gte` takes two numerals and returns True if the first is greater than or equal to the first and False otherwise
// ```javascript
// gte(two)(three) // => False
// gte(three)(three) // => True
// gte(four)(three) // => True
// ```
var gte = function gte(a) {
	return function (b) {
		return isZero(sub(b)(a));
	};
};

// `lt` takes two numerals and returns True if the first is less than the first and False otherwise
// ```javascript
// lt(two)(three) // => True
// lt(three)(three) // => False
// lt(four)(three) // => False
// ```
var lt = function lt(a) {
	return function (b) {
		return not(gte(a)(b));
	};
};

// `gt` takes two numerals and returns True if the first is greater than the first and False otherwise
// ```javascript
// gt(two)(three) // => False
// gt(three)(three) // => False
// gt(four)(three) // => True
// ```
var gt = function gt(a) {
	return function (b) {
		return not(lte(a)(b));
	};
};

// `eq` takes two numerals and returns True if the first is equal to the first and False otherwise
// ```javascript
// eq(three)(three) // => True
// eq(four)(three) // => False
// ```
var eq = function eq(a) {
	return function (b) {
		return and(lte(a)(b))(lte(b)(a));
	};
};

// `pair` takes two values which are effectively stored as a two-tuple that can then be accessed by `first` and `second` detailed below
// ```javascript
// pair('first value')('second value')
// // => pair('first value')('second value')
// ```
var pair = _combinatorsJs.V;
// when a pair is applied with `first` the first value in the pair is returned
// ```javascript
// pair('first value')('second value')(first)
// // => 'first value'
// ```
var first = (0, _combinatorsJs.T)(_combinatorsJs.K);
// when a pair is applied with `second` the first value in the pair is returned
// ```javascript
// pair('first value')('second value')(second)
// // => 'second value'
// ```
var second = (0, _combinatorsJs.T)((0, _combinatorsJs.K)(_combinatorsJs.I));

//
// *** NB Work is still in progress on lists, I'm not happy with the implementations right now***
//

// Documentation to be written

var nil = function nil(a) {
	return function (b) {
		return a();
	};
};
var node = function node(a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return d((0, _combinatorsJs.V)(a)(b));
			};
		};
	};
};

var repeat = function repeat(a) {
	return function (b) {
		return b(function (c) {
			return node(a)(c);
		})(nil);
	};
};

// HACK: cheating with assignment
var range = function range(a) {
	return function (b) {
		var i = succ(b);
		return sub(i)(a)(function (c) {
			return node(i = pred(i))(c);
		})(nil);
	};
};

var foldr = (0, _combinatorsJs.Y)(function (recur) {
	return function (f) {
		return function (a) {
			return function (l) {
				return l(function (_) {
					return a;
				})(function (cell) {
					return f(recur(f)(a)(cell((0, _combinatorsJs.K)(_combinatorsJs.I))))(cell(_combinatorsJs.K));
				});
			};
		};
	};
});
var foldl = (0, _combinatorsJs.Y)(function (recur) {
	return function (f) {
		return function (a) {
			return function (l) {
				return l(function (_) {
					return a;
				})(function (cell) {
					return recur(f)(f(a)(cell(_combinatorsJs.K)))(cell((0, _combinatorsJs.K)(_combinatorsJs.I)));
				});
			};
		};
	};
});
var map = function map(f) {
	return function (l) {
		return foldr(function (acc) {
			return function (val) {
				return node(f(val))(acc);
			};
		})(nil)(l);
	};
};

// HACK: cheating with assignment
var mapIndexed = function mapIndexed(f) {
	return function (l) {
		var i = zero;
		return foldr(function (acc) {
			return function (val) {
				return node(f(val)(pred(i = succ(i))))(acc);
			};
		})(nil)(l);
	};
};

exports.True = True;
exports.False = False;
exports.If = If;
exports.and = and;
exports.or = or;
exports.not = not;
exports.xor = xor;
exports.zero = zero;
exports.one = one;
exports.two = two;
exports.three = three;
exports.four = four;
exports.five = five;
exports.six = six;
exports.seven = seven;
exports.eight = eight;
exports.nine = nine;
exports.ten = ten;
exports.succ = succ;
exports.pred = pred;
exports.add = add;
exports.sub = sub;
exports.mult = mult;
exports.exp = exp;
exports.isZero = isZero;
exports.lte = lte;
exports.gte = gte;
exports.lt = lt;
exports.gt = gt;
exports.eq = eq;
exports.pair = pair;
exports.first = first;
exports.second = second;
exports.nil = nil;
exports.node = node;
exports.repeat = repeat;
exports.range = range;
exports.foldr = foldr;
exports.foldl = foldl;
exports.map = map;
exports.mapIndexed = mapIndexed;
