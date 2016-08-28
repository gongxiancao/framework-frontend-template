/*
 *
*/
'use strict';
var jwt = require('jwt-simple');

var ctrl = module.exports = {
  find: function (req, res) {
    User.find()
      .then(function (users) {
        res.json(users);
      })
      .catch(function (err) {
        res.status(400).json({errcode: 1, errmsg: 'db error'});
      });
  }
};