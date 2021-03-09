const { CoinTypes } = require('../common');

module.exports = {
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
  coin: {
    notEmpty: { errorMessage: 'La moneda es requerida' },
    isIn: {
      options: [CoinTypes],
      errorMessage: 'La moneda es inválida',
    },
  },
};
