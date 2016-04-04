require('babel-register');
var app = require('../app.js');
var logger = require('winston');

var port = process.env.PORT || 3000;

app.listen(port);
logger.info('[SERVER] Listening on port ' + port);
