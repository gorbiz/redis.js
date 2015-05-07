var expect = require("chai").expect
  , redis = require("../lib").Redis;

describe("Redis", function() {
  describe("#set", function() {
    it("accepts 2 params", function() {
      redis.set("server:name", "fido", function(err) {
        expect(err).to.not.exist;
      });
    });

    it("stores a VALUE in a KEY");
  });
});
