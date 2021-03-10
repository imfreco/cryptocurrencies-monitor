const express = require('express');
require('express-async-errors');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const { ErrorMiddleware, NotFoundMiddleware } = require('../middlewares');

module.exports = function ({ UserRoutes, CoinRoutes }) {
  const router = express.Router();
  const apiRoutes = express.Router();

  apiRoutes.use(express.json()).use(cors()).use(helmet()).use(compression());

  apiRoutes.use('/users', UserRoutes);
  apiRoutes.use('/coins', CoinRoutes);

  router.use('/v1/api', apiRoutes);

  router.use(NotFoundMiddleware);
  router.use(ErrorMiddleware);

  return router;
};
