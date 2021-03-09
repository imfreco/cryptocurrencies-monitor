module.exports = {
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
};
