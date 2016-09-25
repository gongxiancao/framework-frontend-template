'use strict';
var bcrypt = require('bcryptjs');

module.exports = {
  hashPassword: function (password, done) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return done(err);
      }
      bcrypt.hash(password, salt, done);
    });
  },
  comparePassword: function (password, hashedPassword, done) {
    bcrypt.compare(password, hashedPassword, done);
  }
};