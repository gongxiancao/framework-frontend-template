'use strict';
process.chdir(__dirname);
var framework = require('framework')(); // jshint ignore:line

module.exports = framework
.use('framework-env')
.use('framework-config')
.use('framework-model')
.use('framework-service')
.use('framework-controller')
.use('framework-express')
.use('framework-express-policy')
.use('framework-express-route')
.lift()
.listen()
.on('error', function (err) {
  logger.error(err.stack);
  return process.exit(1);
})
.on('listened', function () {
  /*jshint multistr: true */
  logger.info('\n\
  __                                             _    \n\
 / _|                                           | |   \n\
| |_ _ __ __ _ _ __ ___   _____      _____  _ __| | __\n\
|  _| \'__/ _` | \'_ ` _ \\ / _ \\ \\ /\\ / / _ \\| \'__| |/ /\n\
| | | | | (_| | | | | | |  __/\\ V  V / (_) | |  |   < \n\
|_| |_|  \\__,_|_| |_| |_|\\___| \\_/\\_/ \\___/|_|  |_|\\_\\\n\
                                                      \n\
                                                      \n\
======================================================\n\
Framework-frontend-template started at port ' + framework.config.port + ', env=' + framework.environment);
});
