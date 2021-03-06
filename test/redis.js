var expect = require('chai').expect
  , should = require('chai').should
  , redis = require('../lib').Redis();

describe('Redis', function() {

  describe('#ping', function() {
    it('pongs', function() {
      expect(redis.ping()).to.equal('PONG');
    });
  });

  describe('#set', function() {
    it('takes 2 params', function() {
      expect(redis.set('server:name', 'fido')).to.be.ok;
    });

    it('has more tests?');
  });

  describe('#get', function() {
    it('a value set is gettable', function() {
      redis.set('server:name', 'fido');
      expect(redis.get('server:name')).to.equal('fido');
    });

    it('multiple values set are gettable', function() {
      redis.set('server:name', 'fido');
      redis.set('server:admin', 'slaygon');
      expect(redis.get('server:name')).to.equal('fido');
      expect(redis.get('server:admin')).to.equal('slaygon');
    });

    it('undefined keys are undefined', function() {
      expect(redis.get('not-defined')).to.be.undefined;
    });
  });

  describe('#incr', function() {
    it('increments a number by 1');
  });

  describe('#ttl', function() {
    it('handels keys with no EXPIRE set');
    it('GET past EXPIRE not possible');
  });

  describe('errors', function() {
    it('SET friends Linus & RPUSH friends Pelle errors');
    // (error) WRONGTYPE Operation against a key holding the wrong kind of value
  });
});
