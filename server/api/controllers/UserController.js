/*
 *
*/
'use strict';

module.exports = {
  get: function (req, res) {
    User.findOne({_id: req.userId})
      .then(function (user) {
        if(!user) {
          return Promise.reject(new Errors.UserNotExistError());
        }
        delete user.password;
        res.json(user.toJSON());
      })
      .catch(function (err) {
        logger.err(err);
        res.error(new Errors.InernalError());
      });
  }
};