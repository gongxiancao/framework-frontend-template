/**
 * auth
 *
 * @module      :: Policy
 * @description :: Simple policy to extract token
 *
 */
'use strict';
var passport = require('passport');

module.exports = function(req, res, next) {
  passport.authenticate('bearer', {session: false}, function (err, user) {
    if(err) {
      return res.error(err, 401);
    }
    if(!user) {
      return res.error(new Errors.RequireTokenError(), 401);
    }
    req.userId = user;
    return next();
  })(req, res);
};
