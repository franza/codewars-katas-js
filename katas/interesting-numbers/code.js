function isInteresting(number, awesomePhrases) {

  var interesting = function (number) {
    return number.is(almostInteresting).orIs(oneOf, awesomePhrases).really();
  }

  if (number.has(properLength).andIs(interesting).really()) {
    return 2;
  }

  var isInteresting = [number + 1, number + 2].some(function (number) {
    return number.has(properLength).andIs(interesting).really();
  });

  if (isInteresting) {
    return 1;
  }

  return 0;
}

function almostInteresting(number) {
  return number.has(trailingZeros).orHas(sameDigits).orIs(ascendingSecuence)
    .orIs(descendingSequence).orIs(palindrome).really();
}

function properLength(number) {
  return number.toString().length > 2;
}

function trailingZeros(number) {
  var digits = number.toString();
  return digits.slice(1).split('').every(function (char) { return char == 0; });
}

function sameDigits(number) {
  var digits = number.toString();
  return digits.split('').every(function (char) { return char == digits[0]; });
}

var ascSequence = '1234567890';

function ascendingSecuence(number) {
  var digits = number.toString();
  return ascSequence.indexOf(digits) != -1;
}

var descSequence = '9876543210';

function descendingSequence(number) {
  var digits = number.toString();
  return descSequence.indexOf(digits) != -1;
}

function palindrome(number) {
  var digits = number.toString();
  return digits == digits.split('').reverse().join('');
}

function oneOf(number, array) {
  return array.indexOf(number) != -1;
}

var numberProto = Number.prototype;

numberProto.is = numberProto.are = numberProto.has = numberProto.have = function (predicate, args) {
  var args = [ this.valueOf() ].concat(Array.prototype.slice.call(arguments, 1));
  return new DslPredicateWrapper(this.valueOf(), predicate.apply(null, args));
};

function DslPredicateWrapper(subject, initialValue) {
  this.subject = subject;
  this.boolResult = initialValue;
}

var dslProto = DslPredicateWrapper.prototype;

dslProto.andHave = dslProto.andHas = dslProto.andAre = dslProto.andIs = function (predicate, args) {
  var args = [ this.subject ].concat(Array.prototype.slice.call(arguments, 1));
  this.boolResult = this.boolResult && predicate.apply(null, args);
  return this;
};

dslProto.orHave = dslProto.orHas = dslProto.orAre = dslProto.orIs = function (predicate, args) {
  var args = [ this.subject ].concat(Array.prototype.slice.call(arguments, 1));
  this.boolResult = this.boolResult || predicate.apply(null, args);
  return this;
};

dslProto.really = function () {
  return this.boolResult;
};

module.exports = isInteresting;