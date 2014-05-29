var Test = require('kata-test-framework-js').Test;
var monad = require('./code');

var Maybe = monad.Maybe;
var Just = monad.Just;
var Nothing = monad.Nothing;

var just5 = Maybe.unit(5);

Test.expect(just5 instanceof Just === true, 'Unit should return Just');
Test.expect(just5.just == 5, 'Unit should wrap an object in monad');