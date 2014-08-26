/**
 * Constructor DependencyInjector
 * @param {Object} - object with dependencies
 */
var DI = function (dependency) {
  this.dependency = dependency;
};

// Should return new function with resolved dependencies
DI.prototype.inject = function (func) {
  var funcString = func.toString();
  var matches = funcString.match(/^function\s+?.*?\((.*?)\)/);
  var argsNames = matches[1].split(',').map(function (arg) { return arg.trim(); });
  var dependency = this.dependency;
  
  return function () {
    var args = argsNames.reduce(function (args, argName) { 
      argName && args.push(dependency[argName]);
      return args; 
    }, []);
    return func.apply(this, args);
  };
};

module.exports = DI;