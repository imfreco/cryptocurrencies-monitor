const { Router } = require('express');

const { SignInDto } = require('../dtos/auth.dto');
const { ValidationsMiddleware } = require('../middlewares');

module.exports = function ({ AuthController }) {
  const router = Router();

  router.post(
    '/signin',
    [SignInDto, ValidationsMiddleware],
    AuthController.signIn,
  );

  return router;
};
