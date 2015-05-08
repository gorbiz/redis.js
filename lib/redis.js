module.exports = function() {

  var store = {}
    , exp = {}
    , timeShift = 0;

  function now() {
    return Date.now() + timeShift * 1000;
  }

  function deleteExpired(key) {
    var ttl = rawTtl(key);
    if (ttl === false) return;
    if (ttl <= 0) delete store[key];
  }

  function rawTtl(key) {
    if (!exp[key]) return false;
    return exp[key].seconds - (now() - exp[key].reg) / 1000;
  }

  // TODO execute `deleteExpired` before `get`, `incr` & `ttl`
  var methods = {
    ping: function() {
      return "PONG";
    }

    , set: function(key, value) {
      delete exp[key]; // reset TTL
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
      exp[key] = { reg: now(), seconds: seconds };
    }
    , ttl: function(key) {
      deleteExpired(key);
      if (typeof store[key] == "undefined") return -2;
      if (typeof exp[key] == "undefined") return -1;
      return rawTtl(key);
    }

    , debugTimetravel: function(seconds) {
      timeShift += seconds;
    }
  };
  return methods;
};
