'use strict';

var mongodb = require('mongodb'),
  path = require('path'),
  fs = require('fs-extra'),
  environment = 'test',
  envConfig = require('../config/env/' + environment),
  child_process = require('child_process'),
  app;

var tempFolder = path.resolve(path.join(__dirname, 'temp')),
  dataFolder = path.resolve(path.join(__dirname, 'data'));

module.exports = function () {
  this.clearDatabase = function (done) {

    var db = new mongodb.Db(this.databaseName(), new mongodb.Server(this.databaseHost(), 27017, {}), {safe: true});
    db.open(function (err) {
      if(err) {
        done(err);
        return;
      }
      console.log('droping database...');
      db.dropDatabase(function (err) {
        if(err) {
          console.error(err);
        }
        db.close(done);
      });
    });
  };

  this.cleanup = function (done) {
    console.log('lowering app');
    app.lower(done);
  };

  this.initialize = function (done) {
    this.clearDatabase(function (err) {
      if(err) {
        console.error(err);
      }
      console.log('database dropped');

      process.env.NODE_ENV = environment;
      console.log('lifting app...');
      app = require(path.join(process.cwd(), 'app'));
      app.on('lifted', function() {
        if(err) {
          console.error(err);
        }
        console.log('app lifted');
        done(err);
      });
    });
  },

  this.apiUrl = function (path) {
    if (path.match(/^http/)) {
      return path;
    }
    else {
      return 'http://localhost:' + (envConfig.port || 7788) + '/api/v1/' + path;
    }
  };

  this.databaseName = function () {
    return envConfig.connections.mongo.database;
  };

  this.databaseHost = function () {
    return envConfig.connections.mongo.host;
  };

  this.dataFolder = function () {
    return dataFolder;
  };

  this.tempFolder = function () {
    return tempFolder;
  };

  this.restoreDatabase = function (dumpName, done) {
    var dumpDir = path.join(this.dataFolder(), 'dbdumps', dumpName);
    var dbDir = path.join(dumpDir, this.databaseName());
    var self = this;

    fs.exists(dbDir, function (exists) {
      if(!exists) {
        return done(new Error('db dump ' + dumpName + ' is not created for db ' + self.databaseName() + ' which is specified in env config'));
      }

      var mongorestore = child_process.spawn('mongorestore', ['--host', self.databaseHost(), dumpDir]);
      mongorestore.on('close', function (code, signal) {
        console.log('child process terminated due to receipt of signal '+signal);
        done();
      });
      mongorestore.on('error', function (/*data*/) {
        //console.log('mongorestore:error:' + data);
      });
      mongorestore.on('exit', function (/*data*/) {
        //console.log('mongorestore:exit:' + data);
      });
      mongorestore.on('message', function (/*data*/) {
        //console.log('mongorestore:message:' + data);
      });
      mongorestore.stdout.on('data', function (/*data*/) {
        //console.log('mongorestore:stdout:' + data);
      });
      mongorestore.stderr.on('data', function (/*data*/) {
        //console.log('mongorestore:stderr:' + data);
      });
    });
  };
};
