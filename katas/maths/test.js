var Test = require('kata-test-framework-js').Test;
var calc = require('./code')

var tests = [
  ['1+1', 2],
  ['1 - 1', 0],
  ['1* 1', 1],
  ['1 /1', 1],
  ['-123', -123],
  ['123', 123],
  ['2 /2+3 * 4.75- -6', 21.25],
  ['12* 123', 1476],
  ['2 / (2 + 3) * 4.33 - -6', 7.732],
  ['((2.33 / (2.9+3.5)*4) - -6)', 7.45625]
];

tests.forEach(function (m) {
  Test.assertEquals(calc(m[0]), m[1]);
});