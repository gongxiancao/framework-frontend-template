'use strict';
module.exports = {
  connections: {
    mongo: {
      hosts: [
        {
          host: '127.0.0.1',
          port: 27017
        }
      ],
      database: 'frontendTemplate',
      username: 'frontendTemplateUser',
      password: 'bhagQGS7',
      options: {
        replicaSet: 'mlop',
        readPreference: 'nearest',
        readConcernLevel: 'majority',
        w: 'majority'
      }
    }
  },
  auth: {
    secret: 'DC3897A1-109D-4124-9B10-AA0512A82A27',
    tokenExpiresIn: 7200
  },
  serverUrl: 'http://localhost:60000',
  port: 60000
};