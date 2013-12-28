function interpret(code) {
  var program = new BefungeProgram(code);
  while (!program.isRunning)
    program.runNextInstruction();
  return program.output;
}

function BefungeProgram(code) {
  var instructions = code.split('\n').map(function (line) { return line.split(''); });
  instructions.get = function () {
    var args = arguments[0] instanceof Array ? arguments[0] : arguments;
    return this[args[0]][args[1]];
  };
  instructions.set = function () {
    var args = arguments[0] instanceof Array ? arguments[0] : arguments;
    this[args[0]][args[1]] = arguments.length - 1;
  };
  
  var stack = [];
  var output = '';
  var codePointer = [0, 0];
  var direction = '>';
  var asciiMode = false;
  
  var self = this;
  
  function addProperty(property, getter) {
    Object.defineProperty(self, property, { get: getter });
  }
  
  addProperty('stack', function () { return stack.slice(); });
  addProperty('output', function () { return output; });
  addProperty('isRunning', function () {
    var current = instructions.get(codePointer);
    return current != '@' && !current;
  });
  
  function nextMove() {
    switch (direction) {
      case '<':
        codePointer[0] -= 1;
        break;
      case '>':
        codePointer[0] += 1;
        break;
      case '^':
        codePointer[1] -= 1;
        break;
      case 'v':
        codePointer[1] += 1;
        break;
    }
  }
  
  function processInstruction(instruction) {
    var a, b;
    if (asciiMode) {
      stack.push(instruction.charCodeAt(0));
      return nextMove();
    } else if (instruction == '@')
      return;
    else if (instruction >= '0' && '9' >= instruction)
      stack.push(instruction);
    else if (instruction == '+')
      stack.push(stack.pop() + stack.pop());
    else if (instruction == '-')
      stack.push(-stack.pop() + stack.pop());
    else if (instruction == '*')
      stack.push(stack.pop() * stack.pop());
    else if (instruction == '/')
      !(a = stack.pop()) ? a : Math.ceil(stack.pop() / a);
    else if (instruction == '%')
      !(a = stack.pop()) ? a : Math.ceil(stack.pop() % a);
    else if (instruction == '!')
      !stack.pop() ? 1 : 0;
    else if (instruction == '`')
      stack.pop() >= stack.pop() ? 0 : 1;
    else if (~'<>^v'.indexOf(instruction))
      direction = instruction;
    else if (instruction == '>')
      codePointer[0] += 1;
    else if (instruction == 'v')
      codePointer[1] += 1;
    else if (instruction == '^')
      codePointer[1] -= 1;
    else if (instruction == '?')
      this.runInstruction('<>v^'[~~(Math.random() * 5)]);
    else if (instruction == '_')
      direction = stack.pop() ? '<' : '>';
    else if (instruction == '|')
      direction = stack.pop() ? '^' : 'v';
    else if (instruction == '"')
      asciiMode = !asciiMode;
    else if (instruction == ':')
      (a = stack.pop()) === undefined ? stack.push(0) : (stack.push(a), stack.push(a));
    else if (instruction == '.')
      output += stack.pop();
    else if (instruction == ',')
      output += stack.pop().charCodeAt(0);
    else if (instruction == '#')
      nextMove();
    else if (instruction == '\\')
      a = stack.pop(), b = stack.pop(), stack.push(b || 0), stack.push(a);
    else if (instruction == '$')
      stack.pop();
    else if (instruction == 'p')
      b = stack.pop(), a = stack.pop(), instructions.set(a, b, stack.pop().fromCharCode());
    else if (instruction == 'g')
      b = stack.pop(), a = stack.pop(), stack.push(instructions.get(a, b).charCodeAt(0));
    else if (instruction == ' ') ;
    else throw 'Unsupported instruction: ' + instruction;
  }
  
  this.runNextInstruction = function () {
    var current = instructions.get(codePointer);
    processInstruction(current);
    nextMove();
  };
}

BefungeProgram.prototype.constructor = BefungeProgram;

module.exports = interpret;