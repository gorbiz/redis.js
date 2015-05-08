var expect = require("chai").expect
  , should = require("chai").should
  , redis = require("../lib").Redis;

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
  });
});
