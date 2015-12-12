'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.mapIndexed = exports.map = exports.foldl = exports.foldr = exports.range = exports.repeat = exports.node = exports.nil = exports.second = exports.first = exports.pair = exports.sub = exports.pred = exports.succ = exports.add = exports.isZero = exports.three = exports.two = exports.one = exports.zero = exports.xor = exports.not = exports.or = exports.and = exports.If = exports.False = exports.True = undefined;

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
// `If` take a predicate and two values, returning the first value if the predicate is True and the second if the predicate is False
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

// Documentation to be written

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

var isZero = function isZero(a) {
	return a(function (_) {
		return False;
	})(True);
};

var add = function add(m) {
	return function (n) {
		return function (f) {
			return function (x) {
				return n(f)(m(f)(x));
			};
		};
	};
};
var succ = function succ(n) {
	return function (f) {
		return function (x) {
			return n(f)(f(x));
		};
	};
};
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
var sub = function sub(m) {
	return function (n) {
		return n(pred)(m);
	};
};

// Documentation to be written

var pair = _combinatorsJs.V;
var first = function first(a) {
	return a(_combinatorsJs.K);
};
var second = function second(a) {
	return a((0, _combinatorsJs.K)(_combinatorsJs.I));
};

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
exports.isZero = isZero;
exports.add = add;
exports.succ = succ;
exports.pred = pred;
exports.sub = sub;
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
