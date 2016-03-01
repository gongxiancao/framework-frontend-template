'use strict';

var svc = module.exports = {
  mongoErrors: {
    duplicateKey: 11000
  },

  isDuplicateKeyError: function (err) {
    return err.code === svc.mongoErrors.duplicateKey;
  },

  generateRandomString: function (chars, length) {
    if (length < 1) {
        length = 1;
    }
    var charLength = chars.length, randnum, chr;
    var output = '';
    while (--length >= 0) {
      randnum = Math.floor(Math.random() * charLength);
      chr = chars.charAt(randnum);
      output += chr;
    }

    return output;
  },
  keyCodeSet: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_',
  generateAppKey: function () {
    return svc.generateRandomString(svc.keyCodeSet, 40);
  },
  generateAppSecret: function () {
    return svc.generateRandomString(svc.keyCodeSet, 40);
  },
  attachErrorCode: function (err, code) {
    if(!_.isObject(err)) {
      err = new Error(err);
    }
    err.code = code;
    return err;
  }
};