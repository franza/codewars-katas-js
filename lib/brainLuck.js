function brainLuck(code, input){
  var sourceCode = new BrainfuckSource(code, input);
  while (sourceCode.hasUndoneInstructions()) { 
    sourceCode.invokeInstruction();
  }
  return sourceCode.output;
}

function Memory() {
  var inner = [], currentCell = 0;
  Object.defineProperty(this, 'state', { get: function () { return inner; } });
  this.next = function () { currentCell += 1; };
  this.prev = function () { currentCell -= 1; };
  this.get = function () { return inner[currentCell] || 0; };
  this.set = function (x) { inner[currentCell] = x - (x >> 8 << 8); };
}

function BrainfuckSource(code, input) {
  var instructions = code.split('');
  var inputIndex = 0;
  var currentInstruction = 0;
  var memory = new Memory();
  var output = '';
  var self = this;
  
  Object.defineProperty(this, 'instructions', { get: function () { return instructions; } });
  Object.defineProperty(this, 'input', { get: function () { return input; } });
  Object.defineProperty(this, 'output', { get: function () { return output; } });
  
  this.hasUndoneInstructions = function () {
    return currentInstruction < this.instructions.length;
  };
  
  function nextInstruction() {
    self.hasUndoneInstructions() && (currentInstruction += 1);
  }

  this.getCurrentInstruction = function () {
    return this.instructions[currentInstruction];
  };

  function findMatchingSymbol(originalSymbol, symbolToFound, fromIndex, where) {
    var stack = [fromIndex], i = fromIndex;
    while (stack.length) {
      i += 1;
      (where[i] == symbolToFound) && stack.pop();
      (where[i] == originalSymbol) && stack.push(i);
    }
    return !stack.length && i;
  }

  function findMatchingCloseBracket(openBracketIndex) {
    return findMatchingSymbol('[', ']', openBracketIndex, instructions);
  }
  
  function findMatchingOpenBracket(closeBracketIndex) {
    var reversed = instructions.slice().reverse();
    var indexForReversed = findMatchingSymbol(']', '[', instructions.length - closeBracketIndex - 1, reversed);
    return instructions.length - indexForReversed - 1;
  }

  this.invokeInstruction = function () {
    var instruction = this.getCurrentInstruction();
    switch (instruction) {
      case '>': 
        memory.next(); 
        break;
      case '<': 
        memory.prev(); 
        break;
      case '+': 
        memory.set(memory.get() + 1); 
        break;
      case '-': 
        memory.set(memory.get() - 1); 
        break;
      case '.': 
        output += String.fromCharCode(memory.get()); 
        break;
      case ',': 
        memory.set(input.charCodeAt(inputIndex++)); 
        break;
      case '[': 
        if (!memory.get())
          currentInstruction = findMatchingCloseBracket(currentInstruction); 
        break;
      case ']':
        if (memory.get())
          currentInstruction = findMatchingOpenBracket(currentInstruction);
        break;
    }
    nextInstruction();
  };
}

module.exports = brainLuck;