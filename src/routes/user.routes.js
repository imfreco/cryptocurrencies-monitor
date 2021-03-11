const { Router } = require('express');

const { ReadTopCoinDto } = require('../dtos/coin.dto');
const { CreateUserDto } = require('../dtos/user.dto');
const {
  AuthMiddleware,
  ValidationsMiddleware,
  OwnMiddleware,
} = require('../middlewares');

module.exports = function ({ UserController, CoinController }) {
  const router = Router();

  router.post(
    '',
    [CreateUserDto, ValidationsMiddleware],
    UserController.create,
  );

  router.get(
    '/:userId/coins/top',
    [AuthMiddleware, ReadTopCoinDto, OwnMiddleware, ValidationsMiddleware],
    CoinController.getTopCoinsByUser,
  );

  return router;
};
