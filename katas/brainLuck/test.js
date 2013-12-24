var Test = require("kata-test-framework-js/index").Test;
var brainLuck = require("../lib/brainLuck");

// Echo until byte(255) encountred
Test.assertEquals(brainLuck(',+[-.,+]','Codewars' + String.fromCharCode(255)), 'Codewars');

// Echo until byte(0) encountred
Test.assertEquals(brainLuck(',[.[-],]','Codewars'), 'Codewars');

// Two numbers multiplier
Test.assertEquals(brainLuck(',>,<[>[->+>+<<]>>[-<<+>>]<<<-]>>.', String.fromCharCode(8,9)), String.fromCharCode(72));