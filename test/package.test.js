const { expect } = require('chai');
const { describe, it } = require('mocha');
const strategy = require('..');

describe('passport-authentico-oauth', function () {
  it('should export Strategy constructor', function () {
    expect(strategy.Strategy).to.be.a('function');
  });

  it('should export Strategy constructor as module', function () {
    expect(strategy).to.be.a('function');
    expect(strategy).to.equal(strategy.Strategy);
  });
});
