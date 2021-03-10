const { checkSchema } = require('express-validator');

const { ParamSchema } = require('../schemas');

const CreateCoinToUserDto = checkSchema(
  { coinId: { ...ParamSchema.coinId }, userId: { ...ParamSchema.userId } },
  ['params'],
);

module.exports = {
  CreateCoinToUserDto,
};
