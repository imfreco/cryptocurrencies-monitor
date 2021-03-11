const { Router } = require('express');

const { CreateCoinToUserDto } = require('../dtos/coin.dto');
const {
  AuthMiddleware,
  ValidationsMiddleware,
  OwnMiddleware,
} = require('../middlewares');

module.exports = function ({ CoinController }) {
  const router = Router();

  router.get('', [AuthMiddleware], CoinController.getAll);

  router.post(
    '/:coinId/user/:userId',
    [AuthMiddleware, CreateCoinToUserDto, OwnMiddleware, ValidationsMiddleware],
    CoinController.assignToUser,
  );

  return router;
};
