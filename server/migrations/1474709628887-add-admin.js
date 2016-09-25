'use strict';
var co = require('co'),
  config = require('../config/env/' + (process.env.NODE_ENV || 'development')),
  MongoClient = require('mongodb').MongoClient,
  uri = require('mongodb-uri').format(config.connections.mongo),
  bcrypt = require('bcryptjs'),
  Promise = require('bluebird'); // jshint ignore:line

function hashPassword (password, done) {
  return bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return done(err);
    }
    bcrypt.hash(password, salt, done);
  });
}

exports.up = function(next) {
  co(function *() {
    var db = yield MongoClient.connect(uri);

    yield db.collection('user').ensureIndex({username: 1}, {unique: true});

    var now = new Date();
    var user = {
      username: 'admin',
      password: 'gmCTfVdf',
      updatedAt: now,
      createdAt: now
    };
    user.password = yield Promise.promisify(hashPassword)(user.password);

    yield db.collection('user').insert(user);

    db.close();
    next();
  })
  .catch(function (err) {
    console.error(err);
    next(err);
  });
};

exports.down = function(next) {
  next(new Error('irreversible'));
};
