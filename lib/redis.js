module.exports = {
  store: {}
  , set: function(key, value) {
    this.store[key] = value;
    return true;
  }
  , get: function(key) {
    return this.store[key];
  }
};
