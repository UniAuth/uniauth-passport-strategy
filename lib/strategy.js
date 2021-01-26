// Load modules.
const OAuth2Strategy = require('passport-oauth2');
const util = require('util');

/**
 * `Strategy` constructor.
 *
 * The Google authentication strategy authenticates requests by delegating to
 * Google using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `cb`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientID`      your Google application's client id
 *   - `clientSecret`  your Google application's client secret
 *   - `callbackURL`   URL to which Google will redirect the user after granting authorization
 *
 * Examples:
 *
 *     passport.use(new GoogleStrategy({
 *         clientID: '123-456-789',
 *         clientSecret: 'shhh-its-a-secret'
 *         callbackURL: 'https://www.example.net/auth/google/callback'
 *       },
 *       function(accessToken, refreshToken, profile, cb) {
 *         User.findOrCreate(..., function (err, user) {
 *           cb(err, user);
 *         });
 *       }
 *     ));
 *
 * @constructor
 * @param {object} options
 * @param {function} verify
 * @access public
 */
function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || 'http://localhost:5000/account/o/login';
  options.tokenURL = options.tokenURL || 'http://localhost:5000/account/o/access';

  OAuth2Strategy.call(this, options, verify);
  this.name = 'authentico';
  this._userProfileURL = options.userProfileURL || 'http://localhost:5000/account/o/access';
}

// Inherit from `OAuth2Strategy`.
util.inherits(Strategy, OAuth2Strategy);

/**
 * Retrieve user profile from Server.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `provider`         always set to `uniauth/authentico`
 *   - `id`
 *   - `username`
 *   - `displayName`
 *
 * @param {string} accessToken
 * @param {function} done
 * @access protected
 */
Strategy.prototype.userProfile = function (accessToken, done) {
  /**
   * get profile details from main server using accessToken
   */
  const profile = {
    name: 'yash kumar verma',
    registrationNumber: '19BCE2669',
  };
  done(null, profile);
};

/**
 * Return extra Google-specific parameters to be included in the authorization
 * request.
 *
 * @param {object} options
 * @return {object}
 * @access protected
 */
Strategy.prototype.authorizationParams = function () {
  const params = {};
  return params;
};

/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
