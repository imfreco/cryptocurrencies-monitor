const { createContainer, asClass, asFunction, asValue } = require('awilix');

//config
const config = require('../config');
const server = require('./');

//repositories
const { UserRepository } = require('../repositories');

//services
const { UserService, CoinService } = require('../services');

//controllers
const { UserController, CoinController } = require('../controllers');

//routes
const { UserRoutes, CoinRoutes } = require('../routes/index.routes');
const Routes = require('../routes');

//db
const db = require('../models');

const container = createContainer();

container
  .register({
    server: asClass(server).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config),
    db: asValue(db),
  })
  .register({
    UserRepository: asClass(UserRepository).singleton(),
  })
  .register({
    UserService: asClass(UserService).singleton(),
    CoinService: asClass(CoinService).singleton(),
  })
  .register({
    UserController: asClass(UserController.bind(UserController)).singleton(),
    CoinController: asClass(CoinController.bind(CoinController)).singleton(),
  })
  .register({
    UserRoutes: asFunction(UserRoutes).singleton(),
    CoinRoutes: asFunction(CoinRoutes).singleton(),
  });

module.exports = container;
