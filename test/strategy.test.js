/* global describe, it, expect */
/* jshint expr: true */

const { expect } = require('chai');
const chai = require('chai');
const passport = require('chai-passport-strategy');
const AuthenticoStrategy = require('../lib/strategy');
const { describe, it } = require('mocha');

chai.use(passport);

describe('Strategy', function () {
  describe('constructed', function () {
    let strategy = new AuthenticoStrategy(
      {
        clientID: 'some-client-id',
        clientSecret: 'some-client-secret',
      },
      function () {},
    );

    it('should be named authentico', function () {
      expect(strategy.name).to.equal('authentico');
    });
  });

  describe('letructed with undefined options', function () {
    it('should throw', function () {
      expect(function () {
        let strategy = new AuthenticoStrategy(undefined, function () {});
      }).to.throw(Error);
    });
  });

  describe('authorization request with documented parameters', function () {
    let strategy = new AuthenticoStrategy(
      {
        clientID: 'some-client-id',
        clientSecret: 'some-client-secret',
      },
      function () {},
    );

    let url;

    before(function (done) {
      chai.passport
        .use(strategy)
        .redirect(function (u) {
          url = u;
          done();
        })
        .req(function (req) {
          req.session = {};
        })
        .authenticate();
    });

    it('should be redirected', function () {
      expect(url).to.equal('http://localhost:5000/account/o/login?response_type=code&client_id=some-client-id');
    });
  });
});

// authorization request with documented parameters
describe('authorization request with documented parameters from OpenID Connect', function () {
  let strategy = new AuthenticoStrategy(
    {
      clientID: 'some-client-id',
      clientSecret: 'some-client-secret',
    },
    function () {},
  );

  let url;

  before(function (done) {
    chai.passport
      .use(strategy)
      .redirect(function (u) {
        url = u;
        done();
      })
      .req(function (req) {
        req.session = {};
      })
      .authenticate({ display: 'touch' });
  });

  it('should be redirected', function () {
    expect(url).to.equal('http://localhost:5000/account/o/login?response_type=code&client_id=some-client-id');
  });
});
