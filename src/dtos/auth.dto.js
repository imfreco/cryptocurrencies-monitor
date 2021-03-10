const { checkSchema } = require('express-validator');
const { CredentialSchema } = require('../schemas');

const SignInDto = checkSchema({ ...CredentialSchema }, ['body']);

module.exports = {
  SignInDto,
};
