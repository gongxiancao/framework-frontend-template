'use strict';

var should = require('should');
var World = require('../support/world').World;
var uuid = require('node-uuid');

module.exports = function () {

  this.World = World;

  this.When(/^I create app with name "([^"]*)"$/, function (name, done) {
    var self = this;
    var app = {
      name: name,
      secret: uuid.v4()
    };
    App.create(app, done);
  });
};

