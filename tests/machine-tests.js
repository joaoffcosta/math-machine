var machine = require('../machine.js')
var numTests = 0;
var numFails = 0;

function assert(formula, expected) {
  var result = machine.parse(formula);

  var expectedStr = expected == null ? "" : expected.toString();
  var resultStr   = result   == null ? "" : result.toString();
  if (resultStr == expectedStr) {
    console.log("[\u001b[32mOK\u001b[0m]     f(" + formula + ") = " + resultStr);  
  } else {
    console.log("[\u001b[31mERROR\u001b[0m]  f(" + formula + ") = " + resultStr + " (expected " + expectedStr + ")");  
    console.log("");
    numFails++;
  }
  numTests++;
}

function resume() {
  console.log();
  console.log("---------------------------------------------------");
  if (numFails <= 0) {
    console.log("\u001b[32mAll " + numTests + " tests executed successfully.\u001b[0m");
  } else {
    console.log("\u001b[31mERROR: " + numFails + " (out of " + numTests + ") failed.\u001b[0m");
  }
}

assert("", null);
assert("something", null);

assert("1", 1);
assert("1/2", [1,2]);
assert("1/2/3", [1,2,3]);

assert("neg/1", -1);
assert("neg/neg/2", 2);
assert("neg/neg/neg/3", -3);
assert("abs/5", 5);
assert("abs/neg/7", 7);

assert("fact/neg/1", 1);
assert("fact/1", 1);
assert("fact/2", 2);
assert("fact/10", 3628800);

assert("pow/3/2", 9);
assert("pow/neg/3/2", 9);
assert("pow/pow/2/2/pow/2/2", 256);
assert("sqrt/9/2", 3);
assert("sqrt/pow/3/2/2", 3);
assert("pow/sqrt/9/2/2", 9);

assert("add/1/2", 3);
assert("add/1/2/3/4", [3,3,4]);
assert("sub/1/2", -1);
assert("sub/1/2/3/4", [-1,3,4]);
assert("mul/2/3", 6);
assert("mul/2/3/4/5", [6,4,5]);
assert("div/9/3", 3);
assert("div/8/2/2/2", [4,2,2]);

assert("addn/1/2/3", 6);
assert("addn/1/2/3/4", 10);
assert("subn/1/2/3", -4);
assert("subn/1/2/3/4", -8);
assert("muln/2/3/4", 24);
assert("muln/2/3/4/5", 120);
assert("divn/4/2/2", 1);
assert("divn/8/2/2/2", 1);

assert("divn/8/2/add/2/2", 1);
assert("addn/8/2/mul/3/3", 19);

assert("muln/addn/neg/1/1/end/10", 0);
assert("divn/8/2/end/1", [4,1]);

resume();
