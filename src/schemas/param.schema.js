module.exports = {
  coinId: {
    isLength: {
      errorMessage: 'El parámetro coinId es requerido',
      options: { min: '2' },
    },
  },
  userId: {
    isInt: { errorMessage: 'El parámetro userId debe ser numérico' },
    toInt: true,
  },
};
