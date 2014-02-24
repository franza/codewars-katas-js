var brackets = {
  '[': ']',
  '{': '}',
  '(': ')' 
};

var lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
var upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function handleAtom(symbol, count, multiplier, resultObject) {
  var result = { };
  result[symbol] = count * multiplier;
  return result;
}

function handleOpenBracket(index, string) {
  var bracket = string[index];
  var openedBrackets = 1;
  var closingBracket = brackets[bracket];
  var result = '';

  for (var i = index + 1; openedBrackets; i++) {
    if (string[i] == bracket) {
      openedBrackets += 1;
      continue;
    }

    if (string[i] == closingBracket) {
      openedBrackets -= 1;
      continue;
    }
    
    result += string[i];
  };

  var multiplier = string[i];
  // console.log(result, multiplier, string, i);
  return [result, multiplier];
}

function getSymbol(index, string) {
  var result = string[index];
  for (var i = index + 1; lowerCaseLetters.indexOf(string[i]) != -1; i++) {
    result += string[i];
  }
  return result;
}

function sumFields(object, into) {
  // console.log(object, into);
  Object.keys(object).map(function (key) {
    into[key] = (into[key] | 0) + object[key];
  });
}

"K4[ON(SO3)2]2"

function parseMolecule(formula, multiplier) {
  multiplier = multiplier || 1;
  for (var index = 0, result = { }, symbol = formula[index]; index < formula.length; index++, symbol = formula[index]) {
    if (symbol in brackets) {
      var res = handleOpenBracket(index, formula), innerFormula = res[0], innerMultiplier = res[1];
      var innerParsed = parseMolecule(innerFormula, innerMultiplier);
      console.log(innerFormula, innerParsed);
      sumFields(innerParsed, result);
      index += formula.length + 1;
      continue;
    }

    if (upperCaseLetters.indexOf(symbol) != -1) {
      // console.log(symbol, ' - letter', index)
      symbol = getSymbol(index, formula);
      var possibleCount = formula[index + symbol.length] | 0, count = possibleCount || 1;
      var res = handleAtom(symbol, count, multiplier, result);
      sumFields(res, result);
      continue;
    }

    // console.log(symbol, ' - something else')
    continue;
  }
  console.log(formula, multiplier, result);
  return result;
}

module.exports = parseMolecule;