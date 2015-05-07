var expect = require("chai").expect
  , should = require("chai").should
  , redis = require("../lib").Redis;

describe("Redis", function() {
  describe("#set", function() {

    it("accepts 2 params", function() {
      expect(redis.set("server:name", "fido")).to.be.ok;
    });

    it("stores a VALUE in a KEY", function() {
      redis.set("server:name", "fido");
      expect(redis.get("server:name")).to.equal("fido");
    });

    it("stores multiple KEY - VALUE pairs", function() {
      redis.set("server:name", "fido");
      redis.set("server:admin", "slaygon");
      expect(redis.get("server:name")).to.equal("fido");
      expect(redis.get("server:admin")).to.equal("slaygon");
    });
  });
});
