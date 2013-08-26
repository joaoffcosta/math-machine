var ops = require('./operations.js').ops;

var operands = [];
var values   = [];

function callOp(op) {
  if (op.args == -1) {
    var args = values.reverse();
    values   = [];
    return op.func(args);

  } else if (op.args == 1) {
    return op.func(values.pop());

  } else if (op.args == 2) {
    return op.func(values.pop(), values.pop());
  }
}

function parse(operation) {
  if (operation == "")
    return null;

  operands = operation.split("/");
  values   = [];
  
  var operand;
  while (operand = operands.pop()) {
    console.log("[" + values + "] << " + operand);

    if (operand.match(/^\d+$/) != undefined) {
      values.push(parseInt(operand));

    } else if (ops[operand] != undefined) {
      var value = callOp(ops[operand]);
      values.push(value);

    } else {
      console.log("ERROR: Unrecognized operand: " + operand);
    }
  }

  console.log("[" + values + "]");
  return values.reverse();
};

exports.parse = parse;
