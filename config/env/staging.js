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
      database: 'FrontendTemplateStaging'
    }
  },
  auth: {
    secret: 'EF07955D-134E-4953-A418-D55486D418D4',
    tokenExpiresIn: 7200
  },
  port: 60000
};