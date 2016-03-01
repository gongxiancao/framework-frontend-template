'use strict';
var bodyParser = require('body-parser'),
  multipart = require('connect-multiparty');

module.exports.http = {
  middlewares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    multipart()
  ]
};
