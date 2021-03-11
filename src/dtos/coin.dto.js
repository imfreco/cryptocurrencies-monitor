const { checkSchema } = require('express-validator');

const { ParamSchema } = require('../schemas');

const CreateCoinToUserDto = checkSchema(
  { coinId: { ...ParamSchema.coinId }, userId: { ...ParamSchema.userId } },
  ['params'],
);

const ReadTopCoinDto = checkSchema(
  {
    userId: { ...ParamSchema.userId },
    limit: {
      isInt: {
        errorMessage: 'limit debe ser entero entre 1 y 25',
        options: { min: 1, max: 25 },
      },
      toInt: true,
    },
    price: {
      isIn: {
        options: [['asc', 'desc']],
        errorMessage: 'price debe ser asc o desc',
      },
      optional: true,
    },
  },
  ['params', 'query'],
);

module.exports = {
  CreateCoinToUserDto,
  ReadTopCoinDto,
};
