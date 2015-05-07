var expect = require("chai").expect
  , should = require("chai").should
  , redis = require("../lib").Redis;

describe("Redis", function() {

  describe("#ping", function() {
    it("pongs", function() {
      expect(redis.ping()).to.equal("PONG");
    });
  });

  describe("#set", function() {
    it("takes 2 params", function() {
      expect(redis.set("server:name", "fido")).to.be.ok;
    });

    it("a value set is gettable", function() {
      redis.set("server:name", "fido");
      expect(redis.get("server:name")).to.equal("fido");
    });

    it("multiple values set are gettable", function() {
      redis.set("server:name", "fido");
      redis.set("server:admin", "slaygon");
      expect(redis.get("server:name")).to.equal("fido");
      expect(redis.get("server:admin")).to.equal("slaygon");
    });
  });
});
