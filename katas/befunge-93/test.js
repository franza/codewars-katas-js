var Test = require("kata-test-framework-js").Test;
var interpret = require('./code');

Test.assertEquals(interpret('>987v>.v\nv456<  :\n>321 ^ _@'), '123456789');