'use strict';

var should = require('should');
var World = require('../support/world').World;
var uuid = require('node-uuid');
var path = require('path');

module.exports = function () {
  this.World = World;

  this.When(/^I open my device$/, function (done) {
    var self = this;
    self.device = {};
    done();
  });

  this.When(/^I setup mockup$/, function (done) {
    var self = this;
    framework.senecaClient = {
      act: function (msg, done) {
        done(null, _.extend({_id: uuid.v4()}, msg.device));
      }
    };
    done();
  });

  this.When(/^I request access token with credential of app "([^"]*)"$/, function (name, done) {
    var self = this;
    var app;
    async.series([
      function (done) {
        App.findOne({name: name}, function (err, _app) {
          should.ifError(err);
          should.exists(_app);
          app = _app;
          done();
        });
      },
      function (done) {
        var device = {
          appKey: app.id,
          appSecret: app.secret,
          deviceId: uuid.v4(),
          os: 'iOS'
        };
        device = self.device = _.extend(device, self.device);

        self.post('auth/access-token', {json: device}, function (err, res) {
          should.ifError(err);
          if(res.statusCode === 200 && res.body) {
            self.accessToken = res.body.accessToken;
          }
          done();
        });
      }], done);
  });

  this.Then(/^I should get access token$/, function (done) {
    var res = this.result;
    if(res.statusCode !== 200) {
      console.log('data: ', res.body);
    }
    res.statusCode.should.equal(200);
    should.exists(res.body.accessToken);
    done();
  });

  this.When(/^I upload data file "([^"]*)"$/, function (fileName, done) {
    var self = this;
    this.postFile('data', {}, {}, {data: path.join(self.dataFolder(), 'files', fileName)}, done);
  });
};

