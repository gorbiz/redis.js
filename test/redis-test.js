var expect = require("chai").expect
  , should = require("chai").should
  , redis = require("../lib").Redis;

describe("Redis", function() {
  describe("#set", function() {
    it("accepts 2 params", function() {
      redis.set("server:name", "fido", function(err) {
        expect(err).to.not.exist;
      });
    });

    it("stores a VALUE in a KEY", function() {
      redis.set("server:name", "fido", function(err) {
        expect(err).to.not.exist;
        redis.get("server:fido", function(res, err) {
          expect(res).equal("fido");
        });
      });
    });
    it("stores multiple KEY - VALUE pairs");
  });
});
