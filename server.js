var express = require('express');
var machine = require('./math-machine.js')

var app = express();

// simple logger
app.use(function (req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
});

app.use(express.static(__dirname + '/public'));

// handle API
app.get("/*", function (req, res, next) {
  // remove first and last '/'
  var formula = req.url.replace(/^\//, "").replace(/\/$/, "")
  var result  = machine.parse(formula); 

  if (result) {
    res.send(result.toString());
  } else {
    next();
  }
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on port " + port);
});
