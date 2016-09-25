'use strict';
module.exports.routes = {
  'post /api/v1/auth/access-token': 'AuthController.accessToken',
  'get /api/v1/auth/test': 'AuthController.test',
  'get /api/v1/user/:id': 'UserController.get'
};
