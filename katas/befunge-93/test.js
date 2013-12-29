var Test = require("kata-test-framework-js").Test;
var interpret = require('./code');

Test.assertEquals(interpret('>987v>.v\nv456<  :\n>321 ^ _@'), '123456789');

Test.assertEquals(interpret('>25*"!dlroW olleH":v\n                v:,_@\n                >  ^'), 'Hello World!\n');

Test.assertEquals(interpret('08>:1-:v v *_$.@ \n  ^    _$>\\:^'), '40320');

Test.assertEquals(interpret('01->1# +# :# 0# g# ,# :# 5# 8# *# 4# +# -# _@'), '01->1# +# :# 0# g# ,# :# 5# 8# *# 4# +# -# _@');

Test.assertEquals(interpret('2>:3g" "-!v\\  g30          <\n |!`"&":+1_:.:03p>03g+:"&"`|\n @               ^  p3\\" ":<\n2 2345678901234567890123456789012345678'),
  '23571113171923293137');
  
Test.expect(interpret('v@.<\n >1^\n>?<^\n >2^') < 3);