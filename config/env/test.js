'use strict';
module.exports = {
  connections: {
    rabbitmq: {
      options: {
      }
    },
    mongo: {
      host: '127.0.0.1',
      database: 'FrontendTemplateTest'
    }
  },
  auth: {
    secret: '1781A1F3-6320-4F88-B547-F4205DAE4FFA',
    tokenExpiresIn: 7200
  },
  port: 60000
};