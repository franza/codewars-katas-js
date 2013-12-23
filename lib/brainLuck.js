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
  };

  this.getCurrentInstruction = function () {
    return this.instructions[currentInstruction];
  };

  function findMatchingCloseBracket(openBracketIndex) {
    var stack = [openBracketIndex], i = openBracketIndex + 1;
    while (stack.length) {
      (instructions[i] == ']') && stack.pop();
      (instructions[i] == '[') && stack.push(i);
      i += 1;
    }
    return !stack.length && i;
  }
  
  function findMatchingOpenBracket(closeBracketIndex) {
    var reversed = instructions.slice(0, closeBracketIndex).reverse();
    var index = reversed.indexOf('[');
    return (index != -1) && reversed.length - index - 1;
  }

  this.invokeInstruction = function () {
    if (memory.get() === 0)
      var i = 0;
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
    console.log(currentInstruction, this.instructions, memory.state, this.output);
  };
}

module.exports = brainLuck;