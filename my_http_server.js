var express = require('express');

var app = express();

// simple logger
app.use(function (req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
});
app.listen(3000);

console.log('Listening on port 3000');