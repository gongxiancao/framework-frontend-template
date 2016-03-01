

'use strict';

var passport = require('passport'),
  BearerStrategy = require('passport-http-bearer').Strategy,
  jwt = require('jwt-simple');

function findByToken(token, done) {
  var decoded;
  try {
    decoded = jwt.decode(token, framework.config.auth.secret);
  } catch (err) {
    return done();
  }

  if (!decoded.deviceId) {
    return done(UtilService.attachErrorCode(new Error('invalid token'), 10007));
  }
  if(new Date(decoded.expiresAt) <= new Date()) {
    return done(UtilService.attachErrorCode(new Error('token is expired'), 10008));
  }

  done(null, decoded.deviceId);
}

// Use the BearerStrategy within Passport
passport.use(new BearerStrategy(
  function (token, done) {
    findByToken(token, function (err, device) {
      if (err) {
        return done(err);
      }
      return done(null, device);
    });
  }
));
