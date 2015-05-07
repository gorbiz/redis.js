module.exports = {
  set: function(key, value, next) {
    next();
  }
  , get: function(key, next) {
    next("fido");
  }
};
