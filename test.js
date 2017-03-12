'use strict';

require('mocha');
var assert = require('assert');
var plusify = require('./');

describe('plusify', function() {
  it('should convert camelcase to pluses:', function() {
    assert.strictEqual(plusify('fooBar'), 'foo+bar');
    assert.strictEqual(plusify('fooBarBaz'), 'foo+bar+baz');
  });

  it('should strip pluses from oes and sos', function() {
    assert.strictEqual(plusify('+foo'), 'foo');
    assert.strictEqual(plusify('foo+'), 'foo');
    assert.strictEqual(plusify('+foo+'), 'foo');
  });

  it('should convert slashes to pluses', function() {
    assert.strictEqual(plusify('/foo'), 'foo');
    assert.strictEqual(plusify('foo/'), 'foo');
    assert.strictEqual(plusify('foo/bar'), 'foo+bar');
  });

  it('should convert spaces to pluses:', function() {
    assert.strictEqual(plusify('foo bar'), 'foo+bar');
    assert.strictEqual(plusify('foo barBaz'), 'foo+bar+baz');
    assert.strictEqual(plusify('foo barBaz quux'), 'foo+bar+baz+quux');
  });

  it('should convert space followed by uppercase letter to a single plus:', function() {
    assert.strictEqual(plusify('foo Bar'), 'foo+bar');
    assert.strictEqual(plusify('Foo BarBaz quux'), 'foo+bar+baz+quux');
  });

  it('should convert non-word characters to pluses:', function() {
    assert.strictEqual(plusify('foo*bar'), 'foo+bar');
    assert.strictEqual(plusify('foo`barBaz'), 'foo+bar+baz');
    assert.strictEqual(plusify('foo^barBaz^quux'), 'foo+bar+baz+quux');
  });

  it('should strip leading non-word characters:', function() {
    assert.strictEqual(plusify('#^foo*bar'), 'foo+bar');
    assert.strictEqual(plusify('#^foo`barBaz'), 'foo+bar+baz');
    assert.strictEqual(plusify('#^foo^barBaz^quux'), 'foo+bar+baz+quux');
  });

  it('should work when leading character is uppercase:', function() {
    assert.strictEqual(plusify('Foo barBaz quux'), 'foo+bar+baz+quux');
  });

  it('should throw an error if a string is not passed:', function(cb) {
    try {
      plusify();
      cb(new Error('expected an error'));
    } catch (err) {
      assert.equal(err.message, 'expected a string');
      cb();
    }
  });
});
