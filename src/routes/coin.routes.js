const { Router } = require('express');

const { AuthMiddleware } = require('../middlewares');

module.exports = function ({ CoinController }) {
  const router = Router();

  router.get('', [AuthMiddleware], CoinController.getAll);

  return router;
};
