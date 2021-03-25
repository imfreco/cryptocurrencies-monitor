const { Router } = require('express');

const { ReadTopCoinDto } = require('../dtos/coin.dto');
const { CreateUserDto } = require('../dtos/user.dto');
const {
  AuthMiddleware,
  ValidationsMiddleware,
  OwnMiddleware,
} = require('../middlewares');

module.exports = function ({ UserController, CoinController, RedisClient }) {
  const _redisClient = RedisClient;
  const router = Router();

  router.post(
    '',
    [CreateUserDto, ValidationsMiddleware],
    UserController.create,
  );

  router.get(
    '/:userId/coins/top',
    [
      AuthMiddleware,
      ReadTopCoinDto,
      OwnMiddleware,
      ValidationsMiddleware,
      (req, res, next) => {
        _redisClient.get('topCoins', (err, data) => {
          if (err) throw err;

          if (data !== null) res.send(JSON.parse(data));
          else next();
        });
      },
    ],
    CoinController.getTopCoinsByUser,
  );

  return router;
};
