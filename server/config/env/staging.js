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
      database: 'frontendTemplateStaging',
      username: 'frontendTemplateStagingUser',
      password: 'AtmEyBaV',
      options: {
        replicaSet: 'mlop',
        readPreference: 'nearest',
        readConcernLevel: 'majority',
        w: 'majority'
      }
    }
  },

  auth: {
    secret: '342847C8-36B3-487D-AC6E-494037ED7A79',
    tokenExpiresIn: 7200
  },
  serverUrl: 'http://localhost:60000',
  port: 60000
};