const { sign, verify } = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');

const expirationTimes = {
  // in seconds
  idToken: 60 * 10,
  refreshToken: 60 * 15,
};

const signPayload = (payload, options) => {
  return sign(payload, JWT_SECRET, options);
};

const verifyToken = (token, callback) => {
  verify(token, JWT_SECRET, callback);
};

module.exports = { expirationTimes, signPayload, verifyToken };
