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

  function unique(value, index, self) {
      return self.indexOf(value) === index;
  }

  // TODO execute `deleteExpired` before `get`, `incr` & `ttl`
  var methods = {

    debug: {
      timetravel: function(seconds) {
        timeShift += seconds;
      }
    }

    , ping: function() {
      return 'PONG';
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
      if (typeof store[key] == 'undefined') store[key] = 0;
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
      if (typeof store[key] == 'undefined') return -2;
      if (typeof exp[key] == 'undefined') return -1;
      return Math.round(rawTtl(key));
    }

    , rpush: function(key, value) {
      if (!store[key]) store[key] = [];
      store[key].push(value);
    }
    , lpush: function(key, value) {
      if (!store[key]) store[key] = [];
      store[key].unshift(value);
    }
    , lrange: function(key, start, stop) {
      if (stop === -1) return store[key].slice(start);
      return store[key].slice(start, stop+1);
    }

    , llen: function(key) {
      return store[key].length;
    }
    , lpop: function(key) {
      return store[key].shift();
    }
    , rpop: function(key) {
      return store[key].pop();
    }

    , sadd: function(key, member) {
      if (!store[key]) store[key] = {};
      store[key][member] = true;
    }
    , srem: function(key, member) {
      delete store[key][member];
    }

    , sismember: function(key, member) {
      return store[key][member] ? 1 : 0;
    }
    ,smembers: function(key) {
      return Object.keys(store[key]);
    }
    , sunion: function(key1, key2) {
      return      Object.keys(store[key1])
          .concat(Object.keys(store[key2])).filter(unique);
    }

    , zadd: function(key, score, member) {
      if (!store[key]) store[key] = [];
      store[key].push([score, member]);
      store[key].sort(function(a, b) {
        if (a[0] == b[0]) return 0;
        return a[0] > b[0] ? 1 : -1;
      });
    }
    , zrange: function(key, start, stop) {
      // TODO? ~ if (stop === -1) return store[key].slice(start);
      var subset = store[key].slice(start, stop + 1);
      return subset.map(function(a) { return a[1]; });
    }

    , hset: function(key, field, value) {
      if (!store[key]) store[key] = {};
      store[key][field] = value;
    }
    , hgetall: function(key) {
      return store[key];
    }
    , hmset: function(key) {
      if (!store[key]) store[key] = {};
      for (var i = 1; i < arguments.length; i+=2) {
        var field = arguments[i], value = arguments[i + 1];
        store[key][field] = value;
      }
    }
    , hget: function(key, field) {
      return store[key][field];
    }
  };
  return methods;
};
