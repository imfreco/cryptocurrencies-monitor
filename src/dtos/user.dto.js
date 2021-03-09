const { checkSchema } = require('express-validator');
const { CredentialSchema, UserSchema } = require('../schemas');

const CreateUserDto = checkSchema({ ...UserSchema, ...CredentialSchema }, [
  'body',
]);

module.exports = {
  CreateUserDto,
};
