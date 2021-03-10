const { Router } = require('express');

const { CreateCoinToUserDto } = require('../dtos/coin.dto');
const { AuthMiddleware, ValidationsMiddleware } = require('../middlewares');

module.exports = function ({ CoinController }) {
  const router = Router();

  router.get('', [AuthMiddleware], CoinController.getAll);

  router.post(
    '/:coinId/user/:userId',
    [CreateCoinToUserDto, ValidationsMiddleware],
    CoinController.assignToUser,
  );

  return router;
};
