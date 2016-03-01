
module.exports = {
  attributes: {
    username: {
      type: String,
      validate: {
        validator: function(v) {
          return /^[a-zA-Z0-9_]{6, 30}$/.test(v);
        },
        message: '{VALUE} is not a valid username!'
      }
    }
  }
};