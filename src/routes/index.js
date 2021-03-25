const compression = require('compression');
const cors = require('cors');
const express = require('express');
require('express-async-errors');
const helmet = require('helmet');

const { ErrorMiddleware, NotFoundMiddleware } = require('../middlewares');

module.exports = function ({ UserRoutes, CoinRoutes, AuthRoutes }) {
  const router = express.Router();
  const apiRoutes = express.Router();

  apiRoutes.use(express.json()).use(cors()).use(helmet()).use(compression());

  apiRoutes.use('/users', UserRoutes);
  apiRoutes.use('/coins', CoinRoutes);
  apiRoutes.use('/auth', AuthRoutes);

  router.use('/v1/api', apiRoutes);

  router.use(NotFoundMiddleware);
  router.use(ErrorMiddleware);

  return router;
};
