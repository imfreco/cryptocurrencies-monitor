const { createContainer, asClass, asFunction, asValue } = require('awilix');

//config
const config = require('../config');
const server = require('./');

//repositories
const { UserRepository, CoinRepository } = require('../repositories');

//services
const { UserService, CoinService, AuthService } = require('../services');

//controllers
const {
  UserController,
  CoinController,
  AuthController,
} = require('../controllers');

//routes
const {
  UserRoutes,
  CoinRoutes,
  AuthRoutes,
} = require('../routes/index.routes');
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
    CoinRepository: asClass(CoinRepository).singleton(),
  })
  .register({
    UserService: asClass(UserService).singleton(),
    CoinService: asClass(CoinService).singleton(),
    AuthService: asClass(AuthService).singleton(),
  })
  .register({
    UserController: asClass(UserController.bind(UserController)).singleton(),
    CoinController: asClass(CoinController.bind(CoinController)).singleton(),
    AuthController: asClass(AuthController.bind(AuthController)).singleton(),
  })
  .register({
    UserRoutes: asFunction(UserRoutes).singleton(),
    CoinRoutes: asFunction(CoinRoutes).singleton(),
    AuthRoutes: asFunction(AuthRoutes).singleton(),
  });

module.exports = container;
