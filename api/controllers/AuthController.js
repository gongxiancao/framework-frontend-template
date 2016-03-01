/*
 *
*/
'use strict';
var jwt = require('jwt-simple');

var ctrl = module.exports = {
  login: function (req, res) {
    res.status(200).json('ok');
  },
  test: function (req, res) {
    res.status(200).json('ok');
  }
};