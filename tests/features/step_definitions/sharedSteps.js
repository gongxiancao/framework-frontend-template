'use strict';

var should = require('should');

module.exports = function () {
  this.World = require('../support/world').World;

  this.Given(/^I have the environment "([^"]*)"$/, function (environment, done) {
    this.restoreDatabase(environment, done);
  });

  this.Then(/^I should see success response$/, function (done) {
    var res = this.result;
    if(res.statusCode !== 200) {
      console.log('data: ', res.body);
    }
    res.statusCode.should.equal(200);
    done();
  });

  this.Then(/^I should see response with status = (\d*)$/, function (status, done) {
    var res = this.result;
    status = parseInt(status);
    if(res.statusCode !== status) {
      console.log('data: ', res.body);
    }
    res.statusCode.should.equal(status);
    done();
  });
};

