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
      database: 'frontendTemplateDev'
    }
  },
  auth: {
    secret: '8028381F-0ABE-440C-86B4-BB78464078D6',
    tokenExpiresIn: 7200
  },
  serverUrl: 'http://localhost:60000',
  port: 60000
};