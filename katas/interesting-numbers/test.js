var Test = require('kata-test-framework-js').Test;
var it = require('kata-test-framework-js').it;
var isInteresting = require('./code');

Test.describe('Basic inputs', function() {
  it('should work, dangit!', function() {
    Test.assertEquals(isInteresting(3, [1337, 256]),     0);
    Test.assertEquals(isInteresting(1336, [1337, 256]),  1);
    Test.assertEquals(isInteresting(1337, [1337, 256]),  2);
    Test.assertEquals(isInteresting(11208, [1337, 256]), 0);
    Test.assertEquals(isInteresting(11209, [1337, 256]), 1);
    Test.assertEquals(isInteresting(11211, [1337, 256]), 2);
  });
});