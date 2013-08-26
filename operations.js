function opify(args, func) {
  return {
    args: args,
    func: func
  };
}

function nAry(numbers, op) {
  var value = numbers[0];
  for (var i = 1; i < numbers.length; i++)
    value = op(value, numbers[i]);
  return value;
}

// unary
function neg(num)  { return -num; }
function fact(num) { return num <= 1 ? 1 : num * arguments.callee(num - 1) }

// binary
function add(num1, num2) { return num1 + num2; }
function sub(num1, num2) { return num1 - num2; }
function mul(num1, num2) { return num1 * num2; }
function div(num1, num2) { return num1 / num2; }

// n-ary
function addn(numbers) { return nAry(numbers, add); }
function subn(numbers) { return nAry(numbers, sub); }
function muln(numbers) { return nAry(numbers, mul); }
function divn(numbers) { return nAry(numbers, div); }


exports.ops = {
  neg:  opify(1, neg),
  abs:  opify(1, Math.abs),
  fact: opify(1, fact),
  
  add:  opify(2, add),
  sub:  opify(2, sub),
  mul:  opify(2, mul),
  div:  opify(2, div),
  pow:  opify(2, Math.pow),
  sqrt: opify(2, Math.sqrt),
  
  addn: opify(-1, addn),
  subn: opify(-1, subn),
  muln: opify(-1, muln),
  divn: opify(-1, divn),
};
