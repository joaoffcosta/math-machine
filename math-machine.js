function value(value, rest) {
  return rest == null ? value : [value].concat(rest);
}

function applyNaryOperation(numbers, operation) {
  var value = numbers[0];
  for (var i = 1; i < numbers.length; i++) {
    value = operation(value, numbers[i]);
  }
  return value;
}

op = { }

// unary
op.neg = function(num) { return -num; }
op.abs = function(num) { return Math.abs(num); }

// binary
op.pow  = function(base, exp)  { return Math.pow(base, exp); }
op.sqrt = function(rad, deg)   { return Math.sqrt(rad, deg); }

// n-ary
op.add = function(numbers) { return applyNaryOperation(numbers, function(n1,n2){return n1+n2;}); }
op.sub = function(numbers) { return applyNaryOperation(numbers, function(n1,n2){return n1-n2;}); }
op.mul = function(numbers) { return applyNaryOperation(numbers, function(n1,n2){return n1*n2;}); }
op.div = function(numbers) { return applyNaryOperation(numbers, function(n1,n2){return n1/n2;}); }

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
    case "neg":  return value(op.neg(args[0]), args.slice(1));
    case "abs":  return value(op.abs(args[0]), args.slice(1));
  }

  // binary operators
  switch (first) {
    case "pow":  return value(op.pow( args[0], args[1]), args.slice(2));
    case "sqrt": return value(op.sqrt(args[0], args[1]), args.slice(2));
  }

  // n-ary operators
  switch (first) {
    case "add": return op.add(args);
    case "sub": return op.sub(args);
    case "mul": return op.mul(args);
    case "div": return op.div(args);
  }
  
  return null;
}

exports.machine = machine;