'use strict';
module.exports.policies = {
  '*': ['auth'],
  AuthController: {
    accessToken: []
  }
};
