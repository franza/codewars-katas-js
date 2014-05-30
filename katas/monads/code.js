function Maybe () {
  Object.freeze(this);
}

function Just (x) {
  this.toString = function () { return "Just " + x.toString(); };
  this.just = x;
  Object.freeze(this);
}
Just.prototype = new Maybe();
Just.prototype.constructor = Just;

function Nothing () {
  this.toString = function () { return "Nothing"; };
  Object.freeze(this);
}
Nothing.prototype = new Maybe();
Nothing.prototype.constructor = Nothing;

Maybe.unit = function (x) {
  return new Just(x);
};

Maybe.bind = function (f) {
  return function (maybe) {
    if (maybe instanceof Maybe) {
      return maybe instanceof Nothing ? new Nothing() : f(maybe.just);
    }
    throw new Error('Argument is not a monad');
  };
};

Maybe.lift = function (f) {
  return function (value) {
    try {
      return new Just(f(value));
    } catch (e) {
      return new Nothing();
    }
  };
};

Maybe.do = function(m) {
  var fns = Array.prototype.slice.call(arguments, 1);
  return fns.reduce(function(monad, fn) {
    fn = Maybe.bind(fn);
    return fn(monad);
  }, m);
};

exports.Maybe = Maybe;
exports.Just = Just;
exports.Nothing = Nothing;