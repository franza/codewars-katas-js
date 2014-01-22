var Test = require('kata-test-framework-js').Test;
var determinant = require('./code').determinant;

var m1 = [ [1, 3], [2,5]];
var m2 = [ [2,5,3], [1,-2,-1], [1, 3, 4]];

Test.assertEquals(determinant([[1]]), 1);
Test.assertEquals(determinant(m1),-1);
Test.assertEquals(determinant(m2),-20);
