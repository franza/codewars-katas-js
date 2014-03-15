var Test = require('kata-test-framework-js').Test;
var it = require('kata-test-framework-js').it;
var являетсяИнтересным = require('./code');

Test.describe('Basic inputs', function() {
  it('should work, dangit!', function() {
    Test.assertEquals(являетсяИнтересным(3, [1337, 256]),     0);
    Test.assertEquals(являетсяИнтересным(1336, [1337, 256]),  1);
    Test.assertEquals(являетсяИнтересным(1337, [1337, 256]),  2);
    Test.assertEquals(являетсяИнтересным(11208, [1337, 256]), 0);
    Test.assertEquals(являетсяИнтересным(11209, [1337, 256]), 1);
    Test.assertEquals(являетсяИнтересным(11211, [1337, 256]), 2);
  });
});