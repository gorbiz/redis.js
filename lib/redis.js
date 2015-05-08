module.exports = function() {

  var store = {}
    , exp = {};

  var methods = {
    ping: function() {
      return "PONG";
    }

    , set: function(key, value) {
      store[key] = value;
      return true;
    }
    , get: function(key) {
      return store[key];
    }
    , incr: function(key) {
      if (typeof store[key] == "undefined") store[key] = 0;
      return ++store[key];
    }
    , del: function(key) {
      delete store[key];
    }

    , expire: function(key, seconds) {
      exp[key] = [Date.now(), seconds];
    }
  };
  return methods;
};
