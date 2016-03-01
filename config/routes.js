'use strict';
module.exports.routes = {
  'post /api/v1/auth/access-token': 'AuthController.accessToken',
  'get /api/v1/auth/test': 'AuthController.test',
  'get /api/v1/pois': 'PoiController.query',
  'get /api/v1/regions': 'RegionController.query',
  'post /api/v1/data': 'DataController.create'
};
