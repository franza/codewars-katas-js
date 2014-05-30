var Test = require('kata-test-framework-js').Test;
var monad = require('./code');

var Maybe = monad.Maybe;
var Just = monad.Just;
var Nothing = monad.Nothing;

var just5 = Maybe.unit(5);

Test.expect(just5 instanceof Just === true, 'Unit should return Just');
Test.expect(just5.just == 5, 'Unit should wrap an object in monad');

function parseInt2(x) {
  var int = parseInt(x);
  if (isNaN(x)) {
    return new Nothing();
  }
  return new Just(int);
}

var boundParseInt2 = Maybe.bind(parseInt2);
var just5Str = new Just('5');

Test.expect(boundParseInt2(just5Str) instanceof Just === true, 'Function result should be a monad');
Test.expect(boundParseInt2(new Nothing()) instanceof Nothing === true, 'Bound function that takes Nothing returns Nothing');
try {
  boundParseInt2(3);
  Test.expect(false, 'Bound function should raise an error if arg is not a monad'); 
} catch (e) {
  Test.expect(true, 'Bound function should raise an error if arg is not a monad'); 
}

function parseInt3(x) {
  if (x == 3) {
    throw new Error();
  }
  return parseInt(x);
}

var liftParseInt = Maybe.lift(parseInt3);

Test.expect(liftParseInt(4) instanceof Maybe === true, 'Lifted function result should be a monad');
Test.expect(liftParseInt(3) instanceof Nothing === true, 'If original function throws error, lifted should return Nothing');

function add(a, b) {
  return a + b;
}

var a1 = Maybe.lift(add.bind(null, '1'));
var a2 = Maybe.lift(add.bind(null, '2'));
var a3 = Maybe.lift(add.bind(null, '3'));

Test.expect(Maybe.do(Maybe.unit(''), a1, a2, a3).just === '321', '@do should pass initial value to each of functions');
Test.expect(Maybe.do(new Nothing(), a1, a2, a3) instanceof Nothing, '@do of Nothing is Nothing');