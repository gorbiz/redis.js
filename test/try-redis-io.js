var expect = require("chai").expect
  , should = require("chai").should
  , redis = require("../lib").Redis();

describe("try.redis.io", function() {
  describe("parts", function() {
    it("#1 - GET & SET", function() {
      redis.set("server:name", "fido");
      expect(redis.get("server:name")).to.equal("fido");
    });

    it("#2 - INCR & DEL", function() {
      redis.set("connections", 10);
      expect(redis.incr("connections")).to.equal(11);
      expect(redis.incr("connections")).to.equal(12);
      redis.del("connections");
      expect(redis.incr("connections")).to.equal(1);
    });

    it("#3 - Atomic INCR");

    it("#4 - EXPIRE & TTL", function() {
      redis.set("resource:lock", "Redis Demo");
      redis.expire("resource:lock", 120);
      redis.debugTimetravel(7);
      expect(redis.ttl("resource:lock")).to.equal(113);
      redis.debugTimetravel(113);
      expect(redis.ttl("resource:lock")).to.equal(-2);

      redis.set("resource:lock", "Redis Demo 1");
      redis.expire("resource:lock", 120);
      redis.debugTimetravel(1);
      expect(redis.ttl("resource:lock")).to.equal(119);
      redis.set("resource:lock", "Redis Demo 2");
      expect(redis.ttl("resource:lock")).to.equal(-1);
    });

    it("#5 - RPUSH, LPUSH & LRANGE", function() {
      redis.rpush("friends", "Alice");
      redis.rpush("friends", "Bob");
      redis.lpush("friends", "Sam");

      expect(redis.lrange("friends", 0, -1)).to.deep.equal(["Sam", "Alice", "Bob"]);
      expect(redis.lrange("friends", 0, 1)).to.deep.equal(["Sam", "Alice"]);
      expect(redis.lrange("friends", 1, 2)).to.deep.equal(["Alice", "Bob"]);
    });
  });
});
