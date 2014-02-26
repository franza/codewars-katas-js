var numberRStr = '-?\\d+\\.?\\d*';
var hiRStr = '(' + numberRStr + ')' + '\\s*([*/])\\s*' + '(' + numberRStr + ')';
var loRStr = '(' + numberRStr + ')' + '\\s*([+-])\\s*' + '(' + numberRStr + ')';
var bracketRStr = '\\(([^()]+?)\\)';

function BinaryExpression(operand1, operation, operand2) {
  this.operand1 = +operand1; 
  this.operation = operation; 
  this.operand2 = +operand2;
}

var operations = {
  '+': function (a, b) { return a + b; },
  '-': function (a, b) { return a - b; },
  '*': function (a, b) { return a * b; },
  '/': function (a, b) { return a / b; }
}

BinaryExpression.prototype.evaluate = function () {
  return operations[this.operation](this.operand1, this.operand2);
};

BinaryExpression.parse = function (expression) {
  var match = expression.match(new RegExp(hiRStr));
  if (!match) {
    match = expression.match(new RegExp(loRStr));
  }
  if (!match) {
    return null;
  }
  return new BinaryExpression(match[1], match[2], match[3]);
};

function handleExpressionTemplate(expressionTemplate, processMatch, expression) {
  var regex = new RegExp(expressionTemplate);

  while (regex.test(expression)) {
    var match = expression.match(regex);
    var evaluationResult = processMatch(match);
    expression = expression.replace(evaluationResult.parsedExpression, evaluationResult.value);
  }

  return expression;
}

function processBinaryMatch(match) {
  var parsedExpression = match[0];
  var value = BinaryExpression.parse(parsedExpression).evaluate(parsedExpression);
  return { parsedExpression: parsedExpression, value: value };
}

function processBracketMatch(match) {
  var parsedExpression = match[0], inner = match[1];
  return { parsedExpression: parsedExpression, value: calc(inner) };
}

var handleBracketExpressions = handleExpressionTemplate.bind(null, bracketRStr, processBracketMatch);
var handleHighPriorityExpressions = handleExpressionTemplate.bind(null, hiRStr, processBinaryMatch);
var handleLowPriorityExpressions = handleExpressionTemplate.bind(null, loRStr, processBinaryMatch);

function calc(expression) {
  expression = handleBracketExpressions(expression);
  expression = handleHighPriorityExpressions(expression);
  expression = handleLowPriorityExpressions(expression);
  return +expression;
}

module.exports = calc;