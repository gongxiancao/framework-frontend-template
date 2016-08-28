/**
 * log
 *
 * @module      :: Policy
 * @description :: Simple policy to extract token
 *
 */
'use strict';

module.exports = function(req, res, next) {
  logger.info(req.method + ' ' + req.url);
  next();
};
