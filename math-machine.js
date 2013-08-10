function value(value, rest) {
  return rest == null ? value : [value].concat(rest);
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
  
  return null;
}

exports.machine = machine;