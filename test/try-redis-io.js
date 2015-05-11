var expect = require('chai').expect
  , should = require('chai').should
  , redis = require('../lib').Redis();

describe('try.redis.io', function() {
  describe('parts', function() {
    it('1 - GET & SET', function() {
      redis.set('server:name', 'fido');
      expect(redis.get('server:name')).to.equal('fido');
    });

    it('2 - INCR & DEL', function() {
      redis.set('connections', 10);
      expect(redis.incr('connections')).to.equal(11);
      expect(redis.incr('connections')).to.equal(12);
      redis.del('connections');
      expect(redis.incr('connections')).to.equal(1);
    });

    it('3 - Atomic INCR');

    it('4 - EXPIRE & TTL', function() {
      redis.set('resource:lock', 'Redis Demo');
      redis.expire('resource:lock', 120);
      redis.debug.timetravel(7);
      expect(redis.ttl('resource:lock')).to.equal(113);
      redis.debug.timetravel(113);
      expect(redis.ttl('resource:lock')).to.equal(-2);

      redis.set('resource:lock', 'Redis Demo 1');
      redis.expire('resource:lock', 120);
      redis.debug.timetravel(1);
      expect(redis.ttl('resource:lock')).to.equal(119);
      redis.set('resource:lock', 'Redis Demo 2');
      expect(redis.ttl('resource:lock')).to.equal(-1);
    });

    it('5 - RPUSH, LPUSH & LRANGE', function() {
      redis.rpush('friends', 'Alice');
      redis.rpush('friends', 'Bob');
      redis.lpush('friends', 'Sam');

      expect(redis.lrange('friends', 0, -1)).to.deep.equal(['Sam', 'Alice', 'Bob']);
      expect(redis.lrange('friends', 0, 1)).to.deep.equal(['Sam', 'Alice']);
      expect(redis.lrange('friends', 1, 2)).to.deep.equal(['Alice', 'Bob']);
    });

    it('6 - LLEN, LPOP & RPOP', function() {
      expect(redis.llen('friends')).to.equal(3);
      expect(redis.lpop('friends')).to.equal('Sam');
      expect(redis.rpop('friends')).to.equal('Bob');

      expect(redis.llen('friends')).to.equal(1);
      expect(redis.lrange('friends', 0, -1)).to.deep.equal(['Alice']);
    });

    it('7 & 8 - SADD, SREM, SISMEMBER & SUNION', function() {
      redis.sadd('superpowers', 'flight');
      redis.sadd('superpowers', 'x-ray vision');
      redis.sadd('superpowers', 'reflexes');

      redis.srem('superpowers', 'reflexes');

      // ---

      expect(redis.sismember('superpowers', 'flight')).to.equal(1);
      expect(redis.sismember('superpowers', 'reflexes')).to.equal(0);

      expect(redis.smembers('superpowers')).to.deep.equal(['flight', 'x-ray vision']);

      redis.sadd('birdpowers', 'pecking');
      redis.sadd('birdpowers', 'flight');

      expect(redis.sunion('superpowers', 'birdpowers')).to.have.length(3);
      expect(redis.sunion('superpowers', 'birdpowers')).to.contain('pecking');
      expect(redis.sunion('superpowers', 'birdpowers')).to.contain('flight');
      expect(redis.sunion('superpowers', 'birdpowers')).to.contain('x-ray vision');
    });

    it('9 - ZADD & ZRANGE - sorted sets', function() {
      redis.zadd('hackers', 1940, 'Alan Kay');
      redis.zadd('hackers', 1906, 'Grace Hopper');
      redis.zadd('hackers', 1953, 'Richard Stallman');
      redis.zadd('hackers', 1965, 'Yukihiro Matsumoto');
      redis.zadd('hackers', 1916, 'Claude Shannon');
      redis.zadd('hackers', 1969, 'Linus Torvalds');
      redis.zadd('hackers', 1957, 'Sophie Wilson');
      redis.zadd('hackers', 1912, 'Alan Turing');

      expect(redis.zrange('hackers', 2, 4)).to.deep.equal(
          ['Claude Shannon', 'Alan Kay', 'Richard Stallman']);
    });

    it('10 - HSET, HGETALL, HMSET & HGET - hashes', function() {
      redis.hset('user:1000', 'name', 'John Smith');
      redis.hset('user:1000', 'email', 'john.smith@example.com');
      redis.hset('user:1000', 'password', 's3cret');

      expect(redis.hgetall('user:1000')).to.deep.equal(
          { name:     'John Smith'
          , email:    'john.smith@example.com'
          , password: 's3cret' });

      redis.hmset('user:1001', 'name', 'Mary Jones', 'password', 'hidden',
          'email', 'mjones@example.com');

      expect(redis.hget('user:1001', 'name')).to.equal('Mary Jones');
    });

    it('11 - HINCBY & HDEL - incrementing numericals hashes', function() {
      redis.hset('user:1000', 'visits', 10);
      expect(redis.hincrby('user:1000', 'visits', 1)).to.equal(11);
      expect(redis.hincrby('user:1000', 'visits', 10)).to.equal(21);
      redis.hdel('user:1000', 'visits');
      expect(redis.hincrby('user:1000', 'visits', 1)).to.equal(1);
    });
  });
});
