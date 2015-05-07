module.exports = {

  ping: function() {
    return "PONG";
  }

  ,store: {}
  , set: function(key, value) {
    this.store[key] = value;
    return true;
  }
  , get: function(key) {
    return this.store[key];
  }
};
