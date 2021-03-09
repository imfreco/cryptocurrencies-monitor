const { checkSchema } = require('express-validator');
const { CoinTypes } = require('../common');

const CreateUserDto = checkSchema(
  {
    name: {
      isLength: {
        errorMessage:
          'El nombre debe tener al menos 3 caracteres y máximo 45 caracteres',
        options: { min: 3, max: 30 },
      },
    },
    lastname: {
      isLength: {
        errorMessage:
          'El apellido debe tener al menos 3 caracteres y máximo 30 caracteres',
        options: { min: 3, max: 30 },
      },
    },
    username: {
      errorMessage:
        'El nombre de usuario debe tener al menos 3 caracteres y máximo 15 caracteres',
      options: { min: 3, max: 15 },
    },
    password: {
      isAlphanumeric: { errorMessage: 'La contraseña debe ser alfanumérica' },
      isLength: {
        errorMessage:
          'La contraseña debe tener al menos 8 caracteres y máximo 12 caracteres',
        options: { min: 8, max: 12 },
      },
    },
    coin: {
      notEmpty: { errorMessage: 'La moneda es requerida' },
      isIn: {
        options: [CoinTypes],
        errorMessage: 'La moneda es inválida',
      },
    },
  },
  ['body'],
);

module.exports = {
  CreateUserDto,
};
