'use strict';
module.exports = {
  connections: {
    rabbitmq: {
      transport: 'seneca-amqp-transport',
      options: {
        type: 'amqp',
        pin: 'role:frontendtemplate'
      }
    },
    mongo: {
      host: '127.0.0.1',
      database: 'FrontendTemplateDev'
    }
  },
  auth: {
    secret: '1781A1F3-6320-4F88-B547-F4205DAE4FFA',
    tokenExpiresIn: 7200
  },
  port: 60000
};