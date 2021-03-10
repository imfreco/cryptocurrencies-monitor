const { Router } = require('express');

module.exports = function ({ CoinController }) {
  const router = Router();

  router.get('', CoinController.getAll);

  return router;
};
