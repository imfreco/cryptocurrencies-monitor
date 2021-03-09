const { Router } = require('express');

const { CreateUserDto } = require('../dtos/user.dto');
const { ValidationsMiddleware } = require('../middlewares');

module.exports = function ({ UserController }) {
  const router = Router();

  router.post(
    '',
    [CreateUserDto, ValidationsMiddleware],
    UserController.create,
  );

  return router;
};
