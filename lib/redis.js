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
  , incr: function(key) {
    if (typeof this.store[key] == "undefined") this.store[key] = 0;
    return ++this.store[key];
  }
  , del: function(key) {
    delete this.store[key];
  }
};
