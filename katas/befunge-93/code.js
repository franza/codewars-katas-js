function interpret(code) {
  var program = new BefungeProgram(code);
  while (program.isRunning)
    program.runNextInstruction();
  return program.output;
}

function BefungeProgram(code) {
  var instructions = code.split('\n').map(function (line) { return line.split(''); });
  instructions.get = function () {
    var args = arguments[0] instanceof Array ? arguments[0] : arguments;
    return this[args[1]][args[0]];
  };
  instructions.set = function () {
    var args = arguments[0] instanceof Array ? arguments[0] : arguments;
    this[args[1]][args[0]] = args[args.length - 1];
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
    return current != '@' || !current;
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
    if (instruction == '"')
      return asciiMode = !asciiMode, undefined;
    if (asciiMode)
      return stack.push(instruction.charCodeAt(0));
    if (instruction == '@')
      return;
    if (instruction >= '0' && '9' >= instruction)
      return stack.push(instruction);
    if (instruction == '+')
      return stack.push(+stack.pop() + +stack.pop());
    if (instruction == '-')
      return stack.push(-stack.pop() + +stack.pop());
    if (instruction == '*')
      return stack.push(+stack.pop() * +stack.pop());
    if (instruction == '/')
      return stack.push(!(a = +stack.pop()) ? a : Math.ceil(+stack.pop() / a));
    if (instruction == '%')
      return stack.push(!(a = +stack.pop()) ? a : Math.ceil(+stack.pop() % a));
    if (instruction == '!')
      return stack.push(+(stack.pop() == 0));
    if (instruction == '`')
      return stack.push(stack.pop() >= stack.pop() ? 0 : 1);
    if (~'<>^v'.indexOf(instruction))
      return direction = instruction, undefined;
    if (instruction == '?')
      return processInstruction('<>v^'[~~(Math.random() * 4)]);
    if (instruction == '_')
      return direction = +stack.pop() ? '<' : '>', undefined;
    if (instruction == '|')
      return direction = +stack.pop() ? '^' : 'v', undefined;
    if (instruction == ':')
      return (a = stack.pop()) === undefined ? stack.push(0) : (stack.push(a), stack.push(a));
    if (instruction == '.')
      return output += stack.pop();
    if (instruction == ',')
      return output += String.fromCharCode(stack.pop());
    if (instruction == '#')
      return nextMove();
    if (instruction == '\\')
      return a = stack.pop(), b = stack.pop(), stack.push(a || 0), stack.push(b);
    if (instruction == '$')
      return stack.pop();
    if (instruction == 'p')
      return b = stack.pop(), a = stack.pop(), instructions.set(a, b, String.fromCharCode(stack.pop()).toString());
    if (instruction == 'g')
      return b = stack.pop(), a = stack.pop(), stack.push(instructions.get(a, b).charCodeAt(0));
    if (instruction == ' ') 
      return;
    
    throw 'Unsupported instruction: ' + instruction;
  }
  
  this.runNextInstruction = function () {
    var current = instructions.get(codePointer);
    processInstruction(current);
    nextMove();
  };
}

BefungeProgram.prototype.constructor = BefungeProgram;

module.exports = interpret;