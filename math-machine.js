function value(value, rest) {
  return rest == null ? value : [value].concat(rest);
}

// Unary operations

function negation(arg) {
  return -arg;
}

function absolute(arg) {
  return Math.abs(arg);
}

// Binary operations

function power(arg1, arg2) {
  return Math.pow(arg1, arg2);
}

function squareRoot(arg1, arg2) {
  return Math.sqrt(arg1, arg2);
}

// N-ary operations

function addition(args) {
  var value = args[0];
  for (var i = 1; i < args.length; i++) {
    value += args[i];
  }
  return value;
}

function subtraction(args) {
  var value = args[0];
  for (var i = 1; i < args.length; i++) {
    value -= args[i];
  }
  return value;
}

function multiplication(args) {
  var value = args[0];
  for (var i = 1; i < args.length; i++) {
    value *= args[i];
  }
  return value;
}

function division(args) {
  var value = args[0];
  for (var i = 1; i < args.length; i++) {
    value /= args[i];
  }
  return value;
}

function machine(operation) {
  if (operation == "")
    return null;

  console.log("Parsing: " + operation)

  var first = operation.split("/", 1)[0];
  var rest  = operation.substring(first.length + 1);

  // is this a value?
  if (first.match(/^\d+$/)) {
    return value(parseInt(first), machine(rest));
  }

  var args = [].concat(machine(rest));

  // unary operators
  switch (first) {
    case "neg":  return value(negation(args[0]), args.slice(1));
    case "abs":  return value(absolute(args[0]), args.slice(1));
  }

  // binary operators
  switch (first) {
    case "pow":  return value(power(     args[0], args[1]), args.slice(2));
    case "sqrt": return value(squareRoot(args[0], args[1]), args.slice(2));
  }

  // n-ary operators
  switch (first) {
    case "add": return addition(args);
    case "sub": return subtraction(args);
    case "mul": return multiplication(args);
    case "div": return division(args);
  }
  
  return null;
}

exports.machine = machine;