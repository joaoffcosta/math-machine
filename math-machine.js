function value(value, rest) {
  return rest == null ? value : [value].concat(rest);
}

function nAry(numbers, op) {
  var value = numbers[0];
  for (var i = 1; i < numbers.length; i++)
    value = op(value, numbers[i]);
  return value;
}

op = { }

// unary
op.neg  = function(num) { return -num; }
op.abs  = function(num) { return Math.abs(num); }
op.fact = function(num) { return num <= 1 ? 1 : num * arguments.callee(num - 1) }

// binary
op.add  = function(num1, num2) { return num1 + num2; }
op.sub  = function(num1, num2) { return num1 - num2; }
op.mul  = function(num1, num2) { return num1 * num2; }
op.div  = function(num1, num2) { return num1 / num2; }
op.pow  = function(base, exp)  { return Math.pow(base, exp); }
op.sqrt = function(rad, deg)   { return Math.sqrt(rad, deg); }

// n-ary
op.addn = function(numbers) { return nAry(numbers, op.add); }
op.subn = function(numbers) { return nAry(numbers, op.sub); }
op.muln = function(numbers) { return nAry(numbers, op.mul); }
op.divn = function(numbers) { return nAry(numbers, op.div); }

// operation parser
function parse(operation) {
  if (operation == "")
    return null;

  console.log("Parsing: " + operation)

  var first = operation.split("/", 1)[0];
  var rest  = operation.substring(first.length + 1);

  // is this a value?
  if (first.match(/^\d+$/)) {
    return value(parseInt(first), parse(rest));
  }

  var args = [].concat(parse(rest));

  // unary operators
  switch (first) {
    case "neg":  return value(op.neg( args[0]), args.slice(1));
    case "abs":  return value(op.abs( args[0]), args.slice(1));
    case "fact": return value(op.fact(args[0]), args.slice(1));
  }

  // binary operators
  switch (first) {
    case "add":  return value(op.add( args[0], args[1]), args.slice(2));
    case "sub":  return value(op.sub( args[0], args[1]), args.slice(2));
    case "mul":  return value(op.mul( args[0], args[1]), args.slice(2));
    case "div":  return value(op.div( args[0], args[1]), args.slice(2));
    case "pow":  return value(op.pow( args[0], args[1]), args.slice(2));
    case "sqrt": return value(op.sqrt(args[0], args[1]), args.slice(2));
  }

  // n-ary operators
  switch (first) {
    case "addn": return op.addn(args);
    case "subn": return op.subn(args);
    case "muln": return op.muln(args);
    case "divn": return op.divn(args);
  }
  
  return null;
}

exports.parse = parse;
